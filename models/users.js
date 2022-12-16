import mongoose, {model} from "mongoose";
import bcrypt from "bcrypt";

const {Schema} = mongoose;

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});
//
UsersSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// UsersSchema.methods.isValidPassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// }

export const Users = model('Users', UsersSchema, 'users');