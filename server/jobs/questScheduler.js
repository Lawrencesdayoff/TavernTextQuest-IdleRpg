import { schedule } from 'node-cron';
import { updateCharacterProgress } from '../services/userService.js';

schedule('*/30 * * * * *', async () => {
  console.log('Running scheduled task to update character quests...');
  await updateCharacterProgress();
});