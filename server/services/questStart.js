import Character from '../models/character.model.js';
import Quest from '../models/quest.model.js';
import Event from '../models/event.model.js';

function getCurrentTime() {
    const now = new Date();
    const isoString = now.toISOString(); // Generates 2024-05-19T09:02:32.496Z
    const timeZoneOffset = -now.getTimezoneOffset(); // Get the timezone offset in minutes

    // Format timezone offset as ±HH:mm
    const sign = timeZoneOffset >= 0 ? "+" : "-";
    const hours = String(Math.floor(Math.abs(timeZoneOffset) / 60)).padStart(2, "0");
    const minutes = String(Math.abs(timeZoneOffset) % 60).padStart(2, "0");

    return `${isoString.slice(0, -1)}${sign}${hours}:${minutes}`;
}

export const createQuestEventQueue = async (characterid, questid) => {
    try {
        const quest = await Quest.findById(questid);
        console.log(quest)
        const character = await Character.findById(characterid);
        const questBiomes = quest.Quest_biome.map(item => item);
        const listOfRandomEvents = await Event.find({ Event_terrain: { $in: questBiomes } });
        const listOfQuestSpecificEvents = await Event.find({ Quest_specific: questid })
        const totalQuestTime = (quest.Quest_time_hours * 60 * 60) + (quest.Quest_time_minutes * 60);
        if (!listOfRandomEvents || listOfRandomEvents.length === 0) {
            console.error("No events found!");
            return [];
        }
        // Shuffle the events to create a randomized queue
        const shuffledEventQueue = listOfRandomEvents.sort(() => Math.random() - 0.5);

        // Define the average duration of an event (in seconds)
        const averageEventDuration = 100; // You can adjust this value based on your game's needs

        // Calculate the maximum number of events that fit within the quest time
        const maxEvents = Math.floor(totalQuestTime / averageEventDuration);
        console.log("maxEvents", maxEvents)
        // Limit the shuffledEventQueue to the calculated number of events
        const limitedEventQueue = shuffledEventQueue.slice(0, maxEvents);


        const finalQueue = limitedEventQueue.concat(listOfQuestSpecificEvents)
        // Return or process the limited event queue as needed


        await Character.findByIdAndUpdate(character._id, { Quest_event_queue: finalQueue })
    } catch (error) {
        console.error('Error creating quest event queue:', error);
    }
}

export const setQuestStart = async (characterid, questid) => {

    const questStartTime = getCurrentTime()
    await Character.findByIdAndUpdate(characterid,
        {
            On_Quest: true,
            Current_Quest: questid,
            Quest_Start_Time: questStartTime
        }
    )


}


export const initializeCharacterStatus = async (characterid) => {
    const character = await Character.findById(characterid);
    if (character) {
        const updatedHealth = character.PC_constitution * 2;
        await Character.findByIdAndUpdate(characterid, { $set: { PC_health: updatedHealth , PC_incapacitated: false } });
    } else {
        console.log("Character not found");
    }
};