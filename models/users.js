import mongoose, {model} from "mongoose";

const {Schema} = mongoose;

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    bufferCommands: false,
    autoCreate: false // disable `autoCreate` since `bufferCommands` is false
});

export const Users = model('Users', UsersSchema, 'users');