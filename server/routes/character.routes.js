import { Router } from 'express';
const router = Router();

import * as CharacterController from '../controllers/character.controller.js'

router.route("/getallCharacters")
        .get(CharacterController.getAllPCs);

router.route("/getoneCharacter/:id")
    .get(CharacterController.getOnePC)

router.route("/newCharacter/")
    .post(CharacterController.createPC);

router.route("/updateCharacter/:id")
    .put(CharacterController.updateOnePC);

router.route("/updateCharacterfield/:id")
    .patch(CharacterController.updateOnePC);

router.route("/deleteCharacter/:id")
    .delete(CharacterController.deleteOnePC);

router.route("/getusercharacters/:id")
    .get(CharacterController.getUserPCs)

router.route("/getcharactersonquests/:id")
    .get(CharacterController.getAllPCsOnQuest)

router.route("/getcharactersoffquests/:id")
    .get(CharacterController.getAllPCsNotOnQuest)
    
export default router;