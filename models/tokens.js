import mongoose, {model} from "mongoose";

const {Schema} = mongoose;

const TokensSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    expiresIn: {
        type: Boolean,
        default: true
    },

    bufferCommands: false,
    autoCreate: false // disable `autoCreate` since `bufferCommands` is false
}, {
    timestamps: true,
});

export const Tokens = model('Tokens', TokensSchema, 'tokens');