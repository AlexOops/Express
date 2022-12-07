import mongoose, {model} from "mongoose";

const {Schema} = mongoose;

const MessagesSchema = new Schema({
    chatId: {
        type: String,
        required: true
    },
    author: {
        type: String,
        enum: ['user', 'bot'],
        required: true
    },
    text: {
        type: String,
        required: true
    },

    bufferCommands: false,
    autoCreate: false // disable `autoCreate` since `bufferCommands` is false
});

export const Messages = model('Messages', MessagesSchema, 'messages');