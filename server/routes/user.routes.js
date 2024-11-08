import { Router } from 'express';

import * as UserController from '../controllers/user.controller.js'

const router = Router();

router.route("/getallUsers")
        .get(UserController.getAllUsers);

router.route("/login/")
    .post(UserController.checkLogin)

router.route("/getoneUser/:id")
    .get(UserController.getOneUser)

router.route("/newUser/")
    .post(UserController.registerUser);

router.route("/updateUser/:id")
    .put(UserController.updateOneUser);

router.route("/updateUserfield/:id")
    .patch(UserController.updateOneUser);

router.route("/deleteUser/:id")
    .delete(UserController.deleteOneUser);

router.route("/logout/:id")
    .patch(UserController.logUserOut);

export default router;