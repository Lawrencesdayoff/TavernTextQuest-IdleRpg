import {model, Schema} from 'mongoose';
const QuestSchema = new Schema(
    {
        Quest_name:{
            type:String,
            required: [true, "Quest name is required"]
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
        }
    }
)