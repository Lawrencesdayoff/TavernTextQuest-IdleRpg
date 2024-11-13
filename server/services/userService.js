import Character from '../models/character.model.js';

export const updateCharacterActiveQuestLog = async () => {
  console.log("Updating character progress");
  try {
    // Find all characters currently on a quest
    const charactersOnQuest = await Character.find({ On_Quest: true });
    
    for (const character of charactersOnQuest) {
      // Assuming the character model has a field that tracks when the quest started
      const questStartTime = new Date(character.Quest_start_time);
      const currentTime = new Date();
      const timeElapsed = (currentTime - questStartTime) / 1000; // Time elapsed in seconds
      
      const currentQueue = character.Quest_event_queue || [];

      for (const event of currentQueue) {
        // Calculate the event trigger time in seconds
        const eventTriggerTimeInSeconds = 
          (event.Quest_specific_hour * 3600) + 
          (event.Quest_specific_minute * 60) + 
          event.Quest_specific_second;

        // Check if the elapsed time matches the event's trigger time
        if (timeElapsed >= eventTriggerTimeInSeconds) {
          // Run the stat checks for the event
          console.log("Running event stat checks for character", character.PC_firstname);
          runEventStatChecks(character, event);
        }
      }
    }
  } catch (error) {
    console.log("Error updating batch character progress", error);
  }
};

const updateActiveQuestLog = async (characterid, currentEvent, eventOutcome) => {
  try{
  await Character.findByIdAndUpdate(characterid, 
  {Active_Quest_Log: {
    event_id: currentEvent._id,
    Description: currentEvent.Event_description,
    Consequence:  eventOutcome? currentEvent.Event_description_success : currentEvent.Event_description_failure ,
    Gold: currentEvent.Event_success_gold_gain,
    Loot: eventOutcome? currentEvent.Event_loot_success : currentEvent.Event_XP_loot_failure ,
    XP: eventOutcome? currentEvent.Event_XP_gain_success : currentEvent.Event_XP_gain_failure 
  }}, {new: true}
  ).then(() => {
  })
  }
  catch(error){
      console.log("Error updating character active quest log", error)
  }
}
const runEventStatChecks = (character, event) => {
  if(
  character.PC_strength >= event.Event_str_check &&
  character.PC_constitution >= event.Event_con_check &&
  character.PC_agility >= event.Event_agi_check &&
  character.PC_perception >= event.Event_per_check &&
  character.PC_intellect >= event.Event_int_check &&
  character.PC_wisdom >= event.Event_wis_check &&
  character.PC_magick >= event.Event_mag_check
  )
      return(
          updateActiveQuestLog(character._id, event, true)
      )
  else
      return(
          updateActiveQuestLog(character._id, event, false)
      )

}
