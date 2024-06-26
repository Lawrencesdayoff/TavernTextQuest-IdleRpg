import Character from '../models/character.model.js'
async function createPC(req, res) {
    try{
       
        console.log("Create new PC");
        const {user_id, PC_image, PC_firstname, PC_lastname, PC_race, PC_pronouns, PC_bio, 
            PC_strength, PC_constitution, PC_agility, PC_perception, PC_intellect, PC_magick, PC_wisdom, On_Quest
        } = req.body;
        
        console.log({"user:" : user_id,
                    "name:": PC_firstname + PC_lastname,
                    "race:": PC_race,
                "pronouns:": PC_pronouns,
            "bio:" : PC_bio,
            "strength:" : PC_strength,
            "constitution:" : PC_constitution,
            "agility:": PC_agility,
            "perception:" : PC_perception,
            "intellect": PC_intellect,
            "magick:" : PC_magick,
            "wisdom:" : PC_wisdom
        });
        
        const newPC = await Character.create({
            user_id, PC_image, PC_firstname, PC_lastname, PC_race, PC_pronouns, PC_bio,
            PC_strength, PC_constitution, PC_agility, PC_perception, PC_intellect, PC_magick, PC_wisdom,
            On_Quest
        });
        
        return res.status(201).json(newPC);
    }
    
    catch(error){
        console.log(error);
        return res.status(400).json(error);
    }
}

async function getOnePC(req, res) {
    try{
        console.log("Get one PCs");
    const onePC = await Character.findById(req.params.id, req.body);
    res.json(onePC);
    }
    catch{
        console.log(error);
        res.status(400).json(error);
    }
}

async function getAllPCs(req, res) {
    try{
        console.log("Get all PCs");
    const allPCs = await Character.find(req.body);
    res.json(allPCs);
    }
    catch{
        console.log(error);
        res.status(400).json(error);
    }
}

async function getUserPCs(req, res) {
    try{
        console.log("Get all user PCs");

    const allPCs = await Character.find({user_id: req.params.id})
    res.json(allPCs);
    }
    catch{
        console.log(error);
        res.status(400).json(error);
    }
}
async function getAllPCsOnQuest(req,res){
    try{
        console.log("Getting all PCs currently on quests");
        const QuestPCs = await Character.find({user_id:req.params.id, On_Quest: true});
        res.json(QuestPCs);
    }
    catch{
        console.log(error);
        res.status(400).json(error);
    }
}
async function getAllPCsNotOnQuest(req, res){
    try{
        console.log("Getting all PCs not on quests");
        const AvailablePCs = await Character.find({user_id:req.params.id, On_Quest: false})
        res.json(AvailablePCs);
    }
    catch{
        console.log(error)
        res.status(400).json(error);
    }
}
async function updateOnePC(req, res) {
    const options = {
        new: true,
        runValidators: true
    };
    try {
        console.log("Update PC");
        const updatedPC = await Character.findByIdAndUpdate(req.params.id, req.body, options);
        res.json(updatedPC);
    }
    catch(error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function deleteOnePC(req, res) {
    try{
        const deletedPC = await Character.findByIdAndDelete(req.params.id);
        res.json(deletedPC);
        console.log("Delete PC")
    }
    catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}

export{
    createPC,
    getOnePC,
    getAllPCs,
    updateOnePC,
    deleteOnePC,
    getUserPCs,
    getAllPCsNotOnQuest,
    getAllPCsOnQuest
};