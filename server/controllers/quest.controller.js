import Quest from '../models/quest.model.js'
import Character from '../models/character.model.js';
async function createQuest(req, res) {
    try{
        console.log("Create new Quest");
        const {Quest_name, Quest_images, Quest_description, Quest_time_minutes, Quest_time_hours, Quest_biome, Quest_level} = req.body;
        const newQuest = await Quest.create({
        Quest_name, Quest_description, Quest_images,Quest_time_hours, Quest_time_minutes, Quest_biome, Quest_level
        });
        
        return res.status(201).json(newQuest);
    }
    
    catch(error){
        console.log(error);
        return res.status(400).json(error);
    }
}

async function getOneQuest(req, res) {
    try{
        console.log("Get one Quests");
    const oneQuest = await Quest.findById(req.params.id, req.body);
    res.json(oneQuest);
    }
    catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}

async function getAllQuests(req, res) {
    try{
        console.log("Get all Quests");
    const allQuests = await Quest.find(req.body);
    res.json(allQuests);
    }
    catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}

async function getUserQuests(req, res) {
    try{
        console.log("Get all user Quests");

    const allQuests = await Quest.find({user_id: req.params.id})
    res.json(allQuests);
    }
    catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}


async function updateOneQuest(req, res) {
    const options = {
        new: true,
        runValidators: true
    };
    try {
        console.log("Update Quest");
        const updatedQuest = await Quest.findByIdAndUpdate(req.params.id, req.body, options);
        res.json(updatedQuest);
    }
    catch(error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function deleteOneQuest(req, res) {
    try{
        const deletedQuest = await Quest.findByIdAndDelete(req.params.id);
        res.json(deletedQuest);
        console.log("Delete Quest")
    }
    catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}

export{
    createQuest,
    getOneQuest,
    getAllQuests,
    updateOneQuest,
    deleteOneQuest,
    getUserQuests
};