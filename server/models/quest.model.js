import {model, Schema} from 'mongoose';
const QuestSchema = new Schema(
    {
        Quest_name:{
            type:String,
            required: [true, "Quest name is required"]
        },
        Quest_description:{
            type:String,
            required: [true, "Quest must have a description"]
        },
        Quest_time_hours:{
            type:Number,
        },
        Quest_time_minutes:{
            type: Number
        },
        Quest_images:{
            type: Array
        },
        Quest_biome:{
            type: Array
        },
        Quest_level: {
            type: Number,
            required: [true, "Quest must have recommended level"]
        },
    },
    {timestamps: true}
)
const Quest = model("Quest", QuestSchema);
export default Quest;