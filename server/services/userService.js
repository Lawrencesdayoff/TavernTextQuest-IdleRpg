import Character from '../models/character.model.js';
import Quest from '../models/quest.model.js'
import User from '../models/user.model.js'



export const updateCharacterActiveQuestLog = async () => {
  console.log("Updating character progress");
  //find users logged in and their characters
  try {
    const usersLoggedIn = await User.find({ Logged_in: true })
    if (usersLoggedIn.length > 0) {
      for (const user of usersLoggedIn) {
        console.log(user.user_firstname)
        // Find all users Current active quests
        const userActiveQuests = user.current_active_quests

        // Find all characters currently on a quest
        for (const activequest of userActiveQuests) {
          // Assuming the character model has a field that tracks when the quest started
          const character = await Character.findById(activequest.Character_id)
          const questStartTime = new Date(character.Quest_Start_Time);
          const currentTime = new Date();
          const timeElapsed = Math.abs(Math.floor((questStartTime - currentTime) / 1000)); // Time elapsed in seconds

          // Ensure `Last_Event_Check` is initialized for the first run
          const lastEventCheck = character.Last_event_checked || questStartTime;
          const secondsSinceLastCheck = Math.floor((currentTime - lastEventCheck) / 1000);

          const currentHours = Math.abs(Math.floor(timeElapsed / 3600));
          const currentMinutes = Math.abs(Math.floor((timeElapsed % 3600) / 60));
          const currentSeconds = Math.abs(timeElapsed % 60);
          const currrentQuest = await Quest.findById(character.Current_Quest)
          console.log(timeElapsed)
          console.log(currentHours)
          console.log(currentMinutes)
          console.log(currentSeconds)
          // Check if quest is finished
          if(character.PC_incapacitated === true){
            return
          }
          if ((currrentQuest.Quest_time_hours <= currentHours) && (currrentQuest.Quest_time_minutes <= currentMinutes)) {
            await Character.findByIdAndUpdate(character._id, { Completed_quest: true })
            console.log("Quest completed")
          }
          else {
            if (secondsSinceLastCheck < 0) {
              console.log("Negative time detected. Resetting Last_event_checked.");
              await Character.findByIdAndUpdate(character._id, { Last_event_checked: currentTime });
            } else if (secondsSinceLastCheck >= 10) {
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
                checkCharacterStatus(character)
              }
              else {
                console.log("Pulling random-event")
                const randomEvent = fetchRandomEvent(character)
                runEventStatChecks(character, randomEvent)
                checkCharacterStatus(character)
              }
            }
          }
        }
      }
    }
    else if (usersLoggedIn.length == 0) { console.log("No users currently logged in") }
  }
  catch (error) {
    console.log("Error updating batch character progress", error);
  }
};

//Records event outcomes
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
            Damage: eventOutcome ? 0 : currentEvent.Event_failure_health_loss ?? 0,
            Gold: currentEvent.Event_success_gold_gain ?? 0,
            Loot: eventOutcome ? currentEvent.Event_loot_success : currentEvent.Event_XP_loot_failure,
            XP: eventOutcome ? currentEvent.Event_XP_gain_success ?? 0 : currentEvent.Event_XP_gain_failure ?? 0
          }
        }
      }, { new: true }
    )
    updateCharacterXP(characterid, eventOutcome ? currentEvent.Event_XP_gain_success : currentEvent.Event_XP_gain_failure)
    handleCharacterHealth(characterid, eventOutcome ? 0 : currentEvent.Event_failure_health_loss ?? 0 )
    handleCharacterGold(characterid, eventOutcome ? 0 : currentEvent.Event_success_gold_gain ?? 0)
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

const updateCharacterXP = async (character, additionalXP) => {
  const updatedCharacter = await Character.findByIdAndUpdate(
    character._id,
    { $inc: { PC_experience: additionalXP }, isExperienceUpdate: true },
    { new: true },
  );
  return updatedCharacter
}

const calculateTotalDamage = async (characterId) => {
  try {
    // Use aggregation to calculate the total damage
    const result = await Character.aggregate([
      { $match: { _id: characterId } }, // Match the specific character
      { $unwind: "$Active_Quest_Log" }, // Deconstruct the Active_Quest_Log array
      {
        $group: {
          _id: "$_id",
          totalDamage: { $sum: "$Active_Quest_Log.Damage" } // Sum up the Damage values
        }
      }
    ]);

    // If there's no damage log, default to 0
    const totalDamage = result.length > 0 ? result[0].totalDamage : 0;

    console.log(`Total Damage for character ${characterId}:`, totalDamage);
    return totalDamage;
  } catch (error) {
    console.error("Error calculating total damage:", error);
    return 0; // Return 0 in case of an error 
  }
};

const handleCharacterHealth = async (characterId, eventDamage) => {
  await Character.findByIdAndUpdate(characterId, {$inc: {PC_health: - eventDamage}});
}
const handleCharacterGold = async (characterId, eventGold) => {
  await Character.findByIdAndUpdate(characterId, {$inc: {PC_gold: + eventGold}})
}
const checkCharacterStatus = async (character) => {
  if (character.PC_health <= 0){
    await Character.findByIdAndUpdate(character._id, {PC_incapacitated: true})
  }
  
}