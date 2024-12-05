import Character from '../models/character.model.js';
import Quest from '../models/quest.model.js'
import User from '../models/user.model.js'


export const handleOfflineProgress = async (userId) => {
   console.log("Processing offline progress for user:", userId);
   try {
      const user = await User.findById(userId)
      if (user.current_active_quests == 0) {
         console.log("User not found or has no active quests.");
         return;
      }

      const currentTime = new Date();
      const timeAway = Math.floor((currentTime - user.last_logout) / 1000); // Time elapsed in seconds


      for (const activeQuest of user.current_active_quests) {

         const character = await Character.findById(activeQuest.Character_id);
         const questStartTime = new Date(character.Quest_Start_Time);

         const questTimeElapsed = Math.floor((currentTime - questStartTime) / 1000); // Total time elapsed since quest started
         const lastEventCheck = new Date(character.Last_event_checked || questStartTime);
         const secondsSinceLastCheck = Math.floor((currentTime - lastEventCheck) / 1000);

         const quest = await Quest.findById(character.Current_Quest);
         const totalQuestTime = (quest.Quest_time_hours * 3600) + (quest.Quest_time_minutes * 60);
         const questTimeLeft = totalQuestTime - questTimeElapsed

         console.log(`Character: ${character.PC_firstname}, Time Elapsed: ${questTimeElapsed}s, Time Logged Out: ${timeAway}s, Quest Time Left:  ${questTimeLeft} `);



         if (questTimeElapsed >= totalQuestTime) {
            // Quest is fully completed
            //Make a loop here iterating one time for every ten second index passed from last_logout
            //each iteration pulls a random event where Quest_specific == falsy
            // if the loop count is multiplied by 10 is equal to the Quest_specific hour + minute + second 
            // pull the event where those fields are equal to ((loop count * 10)/1000)  
            const iterations = Math.floor(secondsSinceLastCheck / 10);
            for (let i = 1; i <= iterations; i++) {
               // Time elapsed in the current iteration (in seconds)
               const timeElapsed = i * 10;
               // Check if this time matches any Quest-specific event
               const questSpecificEvent = character.Quest_event_queue.find((event) =>
                  event.Quest_specific_hour * 3600 +
                  event.Quest_specific_minute * 60 +
                  event.Quest_specific_second === timeElapsed
               );
               if (questSpecificEvent) {
                  console.log(`Processing quest-specific event at time ${timeElapsed} seconds.`);
                  runEventStatChecks(character, questSpecificEvent);
                  checkCharacterStatus(character)
               } else {
                  // If no quest-specific event, pull a random non-specific event
                  const randomEvent = fetchRandomEvent(character);
                  console.log("Processing random event during offline time.");
                  runEventStatChecks(character, randomEvent);
                  checkCharacterStatus(character)

               }
            }
            // Mark quest as completed
            await Character.findByIdAndUpdate(character._id, { Completed_quest: true });
            console.log("Quest completed during offline time processing.");
            return; // Skip further processing for this quest
         }
         else if (questTimeElapsed < totalQuestTime) {
            const iterations = Math.floor(secondsSinceLastCheck / 10);
            for (let i = 1; i <= iterations; i++) {
               // Time elapsed in the current iteration (in seconds)
               const timeElapsed = i * 10;
               // Check if this time matches any Quest-specific event
               const questSpecificEvent = character.Quest_event_queue.find((event) =>
                  event.Quest_specific_hour * 3600 +
                  event.Quest_specific_minute * 60 +
                  event.Quest_specific_second === timeElapsed
               );
               if (questSpecificEvent) {
                  console.log(`Processing quest-specific event at time ${timeElapsed} seconds.`);
                  runEventStatChecks(character, questSpecificEvent);
                  checkCharacterStatus(character)

               } else {
                  // If no quest-specific event, pull a random non-specific event
                  const randomEvent = fetchRandomEvent(character);
                  console.log("Processing random event during offline time.");
                  runEventStatChecks(character, randomEvent);
                  checkCharacterStatus(character)
               }
            }
         }

         await character.save();
      }

      // Update user's last login time
      user.last_login = currentTime;
      await user.save();
      console.log("Offline progress processed successfully.");
   } catch (error) {
      console.log("Error processing offline progress:", error);
   }
};

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

//constCheckCharacterStatus = aysnc (character) => {
//    if (character.Active_Quest_Log.
//    use  a reduce method to add the sum of character Active_Quest_Log.Damage
//    check if this value is greater than PC*constitution *2
//      if so set PC_incapacitated to true

//
//}

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
                  Damage: eventOutcome ? 0 : currentEvent.Event_failure_health_loss,
                  Gold: currentEvent.Event_success_gold_gain,
                  Loot: eventOutcome ? currentEvent.Event_loot_success : currentEvent.Event_XP_loot_failure,
                  XP: eventOutcome ? currentEvent.Event_XP_gain_success : currentEvent.Event_XP_gain_failure
               }
            }
         }, { new: true }
      )
      updateCharacterXP(characterid, eventOutcome ? currentEvent.Event_XP_gain_success : currentEvent.Event_XP_gain_failure)
      handleCharacterHealth(characterid, eventOutcome ? 0 : currentEvent.Event_failure_health_loss ?? 0)
      handleCharacterGold(characterid, eventOutcome ? 0 : currentEvent.Event_success_gold_gain?? 0)
   }
   catch (error) {
      console.log("Error updating character active quest log", error)
   }
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
// Calculate time away from last login using last_login field and currentTime function
//check User ActiveQuests
//for loop
//Call character from activequest via character_ID and call quest from activequest via quest_id
// Get quest hours and quest minutes
// convert quest hours and quest minutes into iso
// subtract time away from questhours/questminutes conversion
// run quests checks
//

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


const updateCharacterXP = async (character, additionalXP) => {
   const updatedCharacter = await Character.findByIdAndUpdate(
      character._id,
      { $inc: { PC_experience: additionalXP }, isExperienceUpdate: true },
      { new: true },
   );
   return updatedCharacter
}


const handleCharacterHealth = async (characterId, eventDamage) => {
   await Character.findByIdAndUpdate(characterId, { $inc: { PC_health: - eventDamage } });
}

const handleCharacterGold = async (characterId, eventGold) => {
   await Character.findByIdAndUpdate(characterId, { $inc: { PC_gold: + eventGold } })
}

const checkCharacterStatus = async (character) => {
   if (character.PC_health <= 0) {
      await Character.findByIdAndUpdate(character._id, { PC_incapacitated: true })
   }

}