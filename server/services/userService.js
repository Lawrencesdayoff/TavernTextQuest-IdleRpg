import Character from '../models/character.model.js';
import Quest from '../models/quest.model.js'
import User from '../models/user.model.js'
export const updateCharacterActiveQuestLog = async () => {
  console.log("Updating character progress");
  //find users logged in and their characters
  const usersLoggedIn = await User.find({Logged_in: true})
  for( const user of  usersLoggedIn){
      user.active_quests.Character_id
  }
  try {
    // Find all characters currently on a quest
    const charactersOnQuest = await Character.find({ On_Quest: true });
    console.log(charactersOnQuest.map((item) => item.PC_firstname))
    for (const character of charactersOnQuest) {
      // Assuming the character model has a field that tracks when the quest started
      const questStartTime = new Date(character.Quest_Start_Time);
      const currentTime = new Date();
      const timeElapsed = Math.floor((currentTime - questStartTime) / 1000); // Time elapsed in seconds

      // Ensure `Last_Event_Check` is initialized for the first run
      const lastEventCheck = character.Last_event_checked || questStartTime;
      const secondsSinceLastCheck = Math.floor((currentTime - lastEventCheck) / 1000);

      const currentHours = Math.floor(timeElapsed / 3600);
      const currentMinutes = Math.floor((timeElapsed % 3600) / 60);
      const currentSeconds = timeElapsed % 60;
      const currrentQuest = await Quest.findById(character.Current_Quest)
      // Check if quest is finished
      if ((currrentQuest.Quest_time_hours <= currentHours) && (currrentQuest.Quest_time_minutes <= currentMinutes)) {
        await Character.findByIdAndUpdate(character._id, { Completed_quest: true })
        console.log("Quest completed")
      }
      else if ((currrentQuest.Quest_time_hours >= currentHours) && (currrentQuest.Quest_time_minutes >= currentMinutes)) {
        // Check if at least 10 seconds have passed since the last event check
        if (secondsSinceLastCheck >= 10) {


          // Extract current hours, minutes, and seconds


          console.log("Checking for events at 10-second intervals");
          // Find an event from the character's Quest_event_queue that matches the current time
          const eventAtTime = character.Quest_event_queue.find(
            (event) =>                          
              event.Quest_specific_hour === currentHours &&
              event.Quest_specific_minute === currentMinutes &&
              event.Quest_specific_second === currentSeconds
          );
          // Update the last check time
          await Character.findByIdAndUpdate(character._id, { Last_event_checked: currentTime });

          if (eventAtTime) {
            console.log("Found quest-specific event:", eventAtTime);
            // Run the stat checks for the event
            runEventStatChecks(character, eventAtTime);
          }
          else {
            console.log("Pulling random-event")
            const randomEvent = fetchRandomEvent(character)
            console.log(randomEvent)
            runEventStatChecks(character, randomEvent)
          }
        }
      }
    }
  }
  catch (error) {
    console.log("Error updating batch character progress", error);
  }
};

const updateActiveQuestLog = async (characterid, currentEvent, eventOutcome) => {
  try {
    await Character.findByIdAndUpdate(characterid,
      {
        $push:
        {
          Active_Quest_Log: {
            event_id: currentEvent._id,
            Description: currentEvent.Event_description,
            Consequence: eventOutcome ? currentEvent.Event_description_success : currentEvent.Event_description_failure,
            Gold: currentEvent.Event_success_gold_gain,
            Loot: eventOutcome ? currentEvent.Event_loot_success : currentEvent.Event_XP_loot_failure,
            XP: eventOutcome ? currentEvent.Event_XP_gain_success : currentEvent.Event_XP_gain_failure
          }
        }
      }, { new: true }
    ).then(() => {
    })
  }
  catch (error) {
    console.log("Error updating character active quest log", error)
  }
}
const runEventStatChecks = (character, event) => {
  if (
    character.PC_strength >= event.Event_str_check &&
    character.PC_constitution >= event.Event_con_check &&
    character.PC_agility >= event.Event_agi_check &&
    character.PC_perception >= event.Event_per_check &&
    character.PC_intellect >= event.Event_int_check &&
    character.PC_wisdom >= event.Event_wis_check &&
    character.PC_magick >= event.Event_mag_check
  )
    return (
      updateActiveQuestLog(character._id, event, true)
    )
  else
    return (
      updateActiveQuestLog(character._id, event, false)
    )

}
const fetchRandomEvent = (character) => {
  try {
    // Filter out events from the Quest_Event_Queue that do not have the 'Quest_specific' field
    console.log(character.Quest_event_queue)
    const nonQuestSpecificEvents = character.Quest_event_queue
    // Randomly select one event from the filtered list
    if (nonQuestSpecificEvents.length > 0) {
      const randomIndex = Math.floor(Math.random() * nonQuestSpecificEvents.length);
      const randomEvent = nonQuestSpecificEvents[randomIndex];

      console.log("Random event found:", randomEvent);
      return randomEvent; // You can run stat checks or handle this event as needed
    } else {
      console.log("No non-quest-specific events available in the character's queue");
    }
  } catch (error) {
    console.log("Error fetching random event:", error);
  }
};