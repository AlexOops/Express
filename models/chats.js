import mongoose, {model} from "mongoose";

const {Schema} = mongoose;

const ChatsSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    bufferCommands: false,
    autoCreate: false // disable `autoCreate` since `bufferCommands` is false
});

export const Chats = model('Chats', ChatsSchema, 'chats');