import {model, Schema} from 'mongoose';
const EventSchema = new Schema(
    {
        Event_name:{
            type: String,
            required: [true, "Event name is required"]  
        },
        Event_description:{},
        Event_success:{},
        Event_failure:{},
        Event_str_check:{
            type: Number
        },
        Event_con_check:{},
        Event_agi_check:{},
        Event_per_check:{},
        Event_int_check:{},
        Event_wis_check:{},
        Event_mag_check:{}
        },
        {
            timestamps: true
        }


)

const Event = model("Event", EventSchema);
export default Event;