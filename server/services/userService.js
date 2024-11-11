import Character from '../models/character.model.js';

export const updateCharacterActiveQuestLog = async (characterid) => {
  await Character.findByIdAndUpdate(
    characterid,
    {
      $push: {
        Active_Quest_Log: {
          event_id: eventId,
          Description: eventDescription,
          Consequence: eventConsequence,
          Rewards: {
            Gold: eventGold,
            Loot: eventLoot,
            XP: eventXp,
          },
        },
      },
    },
    { new: true }
  );
};

export const updateCharacterProgress = async () => {
  try {
    const charactersOnQuest = await Character.find({ onQuest: true });
    for (const character of charactersOnQuest) {
      console.log("Service working:", character);
      //I can use UpdatebyMany here potentially
    }
  } catch (error) {
    console.error('Error updating characters:', error);
  }
};
