import {model, Schema} from 'mongoose';

const baseExp = 100;
const levelExponent = 1.5;
const experienceToLevelUp = level => Math.floor(baseExp * Math.pow(level, levelExponent));

const CharacterSchema = new Schema(
    {
        user_id:{
            type: String, 
        },
        PC_image: {
            type: String,
            required: [true, "image path is required!"]
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
        PC_health: {
            type: Number,
        },
        PC_gold: {
            type: Number,
        },
        PC_incapacitated: {
            type: Boolean,
            default: false
        },
        On_Quest: {
            type: Boolean,
            default: false
        },
        Completed_quest: {
            type: Boolean
        },
        Current_Quest: {
            type: String
        },
        Quest_Start_Time: {
            type: Date
        },
        Last_event_checked: {
            type: Date
        },
        Quest_event_queue: {
            type: Array
        },
        Active_Quest_Log: {
            type: Array,
            timestamps: true
        },
        PC_level: {
            type: Number,
            default: 1
        },
        PC_experience: {
            type: Number,
            default: 0
        },
        PC_levelup_points: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true}
);

CharacterSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();

    // Only proceed if isExperienceUpdate flag is present
    if (!update.isExperienceUpdate) {
        return next();
    }

    // Remove custom flag to avoid issues with MongoDB
    delete update.isExperienceUpdate;

    // Check if experience increment is defined and retrieve the document
    if (update.$inc && update.$inc.PC_experience !== undefined) {
        const docToUpdate = await this.model.findOne(this.getQuery());

        // Calculate new experience and level values
        let { PC_experience, PC_level, PC_levelup_points } = docToUpdate;
        PC_experience += update.$inc.PC_experience; // Add increment to current experience

        // Level-up logic
        let nextLevelExp = experienceToLevelUp(PC_level);
        while (PC_experience >= nextLevelExp) {
            PC_experience -= nextLevelExp;
            PC_level += 1;
            PC_levelup_points += 1;
            nextLevelExp = experienceToLevelUp(PC_level);
        }

        // Apply $set to update PC_experience and PC_level without conflict
        update.$set = { PC_experience, PC_level, PC_levelup_points };
        delete update.$inc.PC_experience; // Ensure $inc is removed to prevent conflict
    }

    next();
});


const Character = model("Character", CharacterSchema); 
export default Character;