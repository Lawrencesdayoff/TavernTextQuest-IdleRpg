import Event  from '../models/event.model.js'
async function createEvent(req, res) {
    try{
       
        console.log("Create new Event");
        const {         Event_name, Event_description, Event_description_failure, Event_description_success, Quest_specific, Event_terrain,
            Event_failure_health_loss, Event_success_gold_gain,Event_agi_check,
            Event_con_check, Event_int_check, Event_mag_check, Event_per_check, Event_str_check,
            Event_wis_check
        } = req.body;
        
        
        const newEvent = await Event.create({
            Event_name, Event_description, Event_description_failure, Event_description_success, Quest_specific, Event_terrain,
            Event_failure_health_loss, Event_success_gold_gain,Event_agi_check,
            Event_con_check, Event_int_check, Event_mag_check, Event_per_check, Event_str_check,
            Event_wis_check
        });
        
        return res.status(201).json(newEvent);
    }
    
    catch(error){
        console.log(error);
        return res.status(400).json(error);
    }
}

async function getOneEvent(req, res) {
    try{
        console.log("Get one Events");
    const oneEvent = await Event.findById(req.params.id, req.body);
    res.json(oneEvent);
    }
    catch{
        console.log(error);
        res.status(400).json(error);
    }
}

async function getAllEvents(req, res) {
    try{
        console.log("Get all Events");
    const allEvents = await Event.find(req.body);
    res.json(allEvents);
    }
    catch{
        console.log(error);
        res.status(400).json(error);
    }
}

async function getUserEvents(req, res) {
    try{
        console.log("Get all user Events");

    const allEvents = await Event.find({user_id: req.params.id})
    res.json(allEvents);
    }
    catch{
        console.log(error);
        res.status(400).json(error);
    }
}

async function getRandomEvent(req, res) {
    try{
        console.log("Getting random event");
        const randomevent = await Event.find({Event_terrain: req.body})
        res.json(listofevents)
    }
    catch{
        console.log(error);
        res.status(400).json(error);
    }
}

async function updateOneEvent(req, res) {
    const options = {
        new: true,
        runValidators: true
    };
    try {
        console.log("Update Event");
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, options);
        res.json(updatedEvent);
    }
    catch(error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function deleteOneEvent(req, res) {
    try{
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        res.json(deletedEvent);
        console.log("Delete Event")
    }
    catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}

export{
    createEvent,
    getOneEvent,
    getAllEvents,
    updateOneEvent,
    deleteOneEvent,
    getUserEvents
};