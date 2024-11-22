import { Router } from 'express';
const router = Router();

import * as QuestController from '../controllers/quest.controller.js'

router.route("/getallQuests")
    .get(QuestController.getAllQuests);

router.route("/getallavailablequests")

router.route("/getoneQuest/:id")
    .get(QuestController.getOneQuest)

router.route("/newQuest/")
    .post(QuestController.createQuest);

router.route("/updateQuest/:id")
    .put(QuestController.updateOneQuest);

router.route("/updateQuestfield/:id")
    .patch(QuestController.updateOneQuest);

router.route("/deleteQuest/:id")
    .delete(QuestController.deleteOneQuest);

router.route("/getuserQuests/:id")
    .get(QuestController.getUserQuests)

export default router;