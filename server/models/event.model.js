import {model, Schema} from 'mongoose';
const EventSchema = new Schema(
    {
        Event_name:{
            type: String,
            required: [true, "Event name is required"]  
        },
        Event_description:{
            type: String,
            required: [true, "Event must have an initial description"]
        },
        Event_description_success:{
            type: String,
            required: [true, "Event must have win description"]
        },
        Event_description_failure:{
            type: String,
            required: [true, "Event must have loss description"]
        },
        Quest_specific:{
            type: String
        },
        Event_terrain:{
            type: Array
        },
        Event_success_gold_gain:{
            type: Number
        },
        Event_failure_health_loss:{
            type: Number
        },
        Event_str_check:{
            type: Number
        },
        Event_con_check:{
            type: Number
        },
        Event_agi_check:{
            type: Number
        },
        Event_per_check:{
            type: Number
        },
        Event_int_check:{
            type: Number
        },
        Event_wis_check:{
            type: Number
        },
        Event_mag_check:{
            type: Number
        }
        },
        {
            timestamps: true
        }


)

const Event = model("Event", EventSchema);
export default Event;