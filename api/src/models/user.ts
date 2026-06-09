import { Schema, model } from "mongoose";
import type { IUser } from "../types/user.js";

const modelSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
},{ timestamps: true })

const UserModel = model<IUser>("Users", modelSchema);

export default UserModel