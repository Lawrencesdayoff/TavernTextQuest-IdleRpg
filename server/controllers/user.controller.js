import User from '../models/user.model.js';
import bcrypt from "bcryptjs"
var salt = bcrypt.genSaltSync(10)
async function registerUser(req, res) {
    try{
       
        console.log("Create new User");
        const {user_firstname, user_lastname, user_email, user_username, user_password} = req.body;
        
        console.log({"name:": user_firstname + user_lastname,
                    "email:": user_email,
                    "username:": user_username,
                    "password:": user_password});
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
    
    catch(error){
        console.log(error);
        return res.status(400).json(error);
    }
}

async function getOneUser(req, res) {
    try{
        console.log("Get one Users");
    const oneUser = await User.findById(req.params.id, req.body);
    res.json(oneUser);
    }
    catch{
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
    try{
    console.log("Checking User login information");
    console.log({"user email": email})
    const queriedEmail = await User.findOne({user_email:email});
    console.log(queriedEmail)
    if(!queriedEmail){ 
        console.log('Not found');
        }
      else{ 
        console.log('Found!');
          if (bcrypt.compareSync(password, queriedEmail.user_password))
          res.json(queriedEmail);}
    }
    catch{
        console.log(error);
        res.status(400).json(error);
    }

}


async function getAllUsers(req, res) {
    try{
        console.log("Get all Users");
    const allUsers = await User.find(req.body);
    res.json(allUsers);
    }
    catch{
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
    catch(error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function deleteOneUser(req, res) {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json(deletedUser);
        console.log("Delete User")
    }
    catch(error){
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
        console.log("Added Quest:");
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, options);
        res.json(updatedUser);
    }
    catch(error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export{
    registerUser,
    getOneUser,
    getAllUsers,
    updateOneUser,
    deleteOneUser,
    checkLogin,
    addActiveQuest
};