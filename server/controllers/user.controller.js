import User from '../models/user.model.js';
import bcrypt from "bcryptjs"
import { handleOfflineProgress } from '../services/offlineProgression.js'
var salt = bcrypt.genSaltSync(10)



async function registerUser(req, res) {
    try {

        console.log("Create new User");
        const { user_firstname, user_lastname, user_email, user_username, user_password } = req.body;

        console.log({
            "name:": user_firstname + user_lastname,
            "email:": user_email,
            "username:": user_username,
            "password:": user_password
        });
        var hashedPassword = bcrypt.hashSync(user_password, salt)

        const newUser = await User.create({
            user_firstname,
            user_lastname,
            user_email,
            user_username,
            user_password: hashedPassword
        });

        return res.status(201).json(newUser);
    }

    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

async function getOneUser(req, res) {
    try {
        console.log("Get one Users");
        const oneUser = await User.findById(req.params.id, req.body);
        res.json(oneUser);
    }
    catch {
        console.log(error);
        res.status(400).json(error);
    }
}
// async function checkUserInDatabase(req, res) {
//     try{
//         console.log("Checking if User in database by email");
//     const {user_email} = req.body;
//     console.log({"email:": user_email});
//     const checkUser = await User.find({user_email}, req.body);
//     res.json(checkUser);
//     console.log("User is in Database already");
//     }
//     catch{
//         console.log("User does not exist in database")
//         console.log(error);
//         res.status(400).json(error);
//     }
// }

async function checkLogin(req, res) {
    const email = req.body.user_email;
    const password = req.body.user_password
    try {
        console.log("Checking User login information");
        console.log({ "user email": email })
        const queriedUser = await User.findOne({ user_email: email });
        if (!queriedUser) {
            console.log('Not found');
            return
        }
        else {
            console.log('Found!');
            if (bcrypt.compareSync(password, queriedUser.user_password)) {
                await User.updateOne({ user_email: email }, { $set: { Logged_in: true } })
                handleOfflineProgress(queriedUser._id)
                res.json(queriedUser);
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }

}

async function logIn(req, res) {
    try {
        console.log("logging in user")
        const offlineProgress = handleOfflineProgress(req.param.id)
        res.json(offlineProgress)
    }
    catch (error) {
        console.log(error)
    }
}

async function getAllUsers(req, res) {
    try {
        console.log("Get all Users");
        const allUsers = await User.find(req.body);
        res.json(allUsers);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function updateOneUser(req, res) {
    const options = {
        new: true,
        runValidators: true
    };
    try {
        console.log("Update User");
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, options);
        res.json(updatedUser);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function deleteOneUser(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json(deletedUser);
        console.log("Delete User")
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function addActiveQuest(req, res) {

    const options = {
        new: true,
        runValidators: true
    };

    try {
        const { Quest_id, Character_id, Start_time } = req.body
        console.log("Added Quest to User");
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                $push:
                {
                    current_active_quests: {
                        Quest_id: Quest_id,
                        Character_id: Character_id,
                        Start_time: Start_time
                    }
                }
            }, options);
        res.json(updatedUser);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function deleteActiveQuest(req, res) {
    try {
        const { Quest_id, Character_id } = req.body
        const deletedActiveQuest = await User.findByIdAndUpdate(req.params.id,
            {
                $pull:
                {
                    current_active_quests: {
                        Quest_id: Quest_id,
                        Character_id: Character_id,
                    }
                }
            })
        res.json(deleteActiveQuest)
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

async function logUserOut(req, res) {
    try {
        console.log("Added Quest:");
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
        res.json(updatedUser);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export {
    registerUser,
    getOneUser,
    getAllUsers,
    updateOneUser,
    deleteOneUser,
    checkLogin,
    logIn,
    addActiveQuest,
    deleteActiveQuest,
    logUserOut
};