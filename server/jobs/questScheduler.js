import { schedule } from 'node-cron';
import { updateCharacterActiveQuestLog } from '../services/userService.js';

schedule('*/10 * * * * *', async () => {
  console.log('Running scheduled task to update character quests...');
  await updateCharacterActiveQuestLog();
});