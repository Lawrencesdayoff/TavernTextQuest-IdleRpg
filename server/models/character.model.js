import {model, Schema} from 'mongoose';
const CharacterSchema = new Schema(
    {
        user_id:{
            type: String, 
            required: [true, "First name of user is required!"],
            minLength: [1, "First name of user must be greater than 1 character"],
            maxLength: [40, "First name of user must be less than 40 characters"]
        },
        PC_image: {
            type: String,
            required: [true, "inage path is required!"]
        },
        PC_firstname: {
            type: String,
            required: [true, "First name of user is required!"],
            minLength: [1, "First name of user must be greater than 1 character"],
            maxLength: [40, "First name of user must be less than 40 characters"]
        },
        PC_lastname: {
            type: String,
            required: [true, "Last name of user is required!"],
            minLength: [1, "Last name of user must be greater than 1 character"],
            maxLength: [40, "Last name of user must be less than 40 characters"]
        },
        PC_race: {
            type: String,
            min:[1, "Race must be longer than one character"],
            max:[140, "Race must be under 140 characters"],
            required: [true, "Race required"]
        },
        PC_pronouns: {
            type: String,
            required: [true, "address is required"],
            minLength: [4, "Minimum length of address must be greater than 2 characters"],
            maxLength: [255, "Maximum length of address has to be less than 255"]
        },
        PC_bio: {
            type: String,
            required: [true, "address is required"],
            minLength: [4, "Minimum length of address must be greater than 2 characters"],
            maxLength: [255, "Maximum length of address has to be less than 255"]
        },
        PC_strength: {
            type: Number,
            required: [true, "Must have at least one point in every skill"]
        },
        PC_constitution: {
            type: Number,
            required: [true, "Must have at least one point in every skill"]
        },
        PC_agility: {
            type: Number,
            required: [true, "Must have at least one point in every skill"]
        },
        PC_perception: {
            type: Number,
            required: [true, "Must have at least one point in every skill"]
        },
        PC_intellect: {
            type: Number,
            required: [true, "Must have at least one point in every skill"]
        },
        PC_magick: {
            type: Number,
            required: [true, "Must have at least one point in every skill"]
        },
        PC_wisdom: {
            type: Number,
            required: [true, "Must have at least one point in every skill"]
        },
        On_Quest: {
            type: Boolean,
            default: false
        },
        Current_Quest: {
            type: String
        },
        Quest_Start_Time: {
            type: Date
        },
        Active_Quest_Log: {
            type: Array
        }

    },
    { timestamps: true}
);

const Character = model("Character", CharacterSchema); 
export default Character;