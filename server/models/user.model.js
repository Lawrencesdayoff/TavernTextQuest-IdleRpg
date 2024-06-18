import {model, Schema} from 'mongoose';
const UserSchema = new Schema(
    {
        user_firstname: {
            type: String,
            required: [true, "First name of user is required!"],
            minLength: [1, "First name of user must be greater than 1 character"],
            maxLength: [40, "First name of user must be less than 40 characters"]
        },
        user_lastname: {
            type: String,
            required: [true, "Last name of user is required!"],
            minLength: [1, "Last name of user must be greater than 1 character"],
            maxLength: [40, "Last name of user must be less than 40 characters"]
        },
        user_username: {
            type: String,
            min:[1, "User name must be longer than one character"],
            max:[140, "User name must be under 140 characters"],
            required: [true, "age required"]
        },
        user_email: {
            type: String,
            index: { unique: true},
            required: [true, "address is required"],
            minLength: [4, "Minimum length of address must be greater than 2 characters"],
            maxLength: [255, "Maximum length of address has to be less than 255"]
        },
        user_password: {
            type: String,
            min:[1, "User crypt pass must be longer than one character"],
            max:[500, "User crypt pass must be under 140 characters"],
            required: [true, "Password required"]
        },
        current_active_quests: {
            type: Array
        },
        current_gold: {
            type: Number
        }

    },
    { timestamps: true}
);

const User = model("User", UserSchema); 
export default User;