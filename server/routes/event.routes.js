import { Router } from 'express';
const router = Router();

import * as EventController from '../controllers/event.controller.js'

router.route("/getallEvents")
        .get(EventController.getAllEvents);

router.route("/getoneEvent/:id")
    .get(EventController.getOneEvent)

router.route("/newEvent")
    .post(EventController.createEvent);

router.route("/updateEvent/:id")
    .put(EventController.updateOneEvent);

router.route("/updateEventfield/:id")
    .patch(EventController.updateOneEvent);

router.route("/deleteEvent/:id")
    .delete(EventController.deleteOneEvent);

router.route("/getuserEvents/:id")
    .get(EventController.getUserEvents)

router.route("/getrandomEvent/:eventbiome")
    .get(EventController.getRandomEvent);

router.route("/getallQuestSpecificEvents/:id")
    .get(EventController.getAllQuestSpecificEvents);
export default router;