import mongoose, { Document, mongo, Schema } from "mongoose";

export interface IUser extends Document{
    username: string;
    password: string;
    name: string;
    age: number;
    description?: string;
    interests: string[];
    online: boolean;
    refreshToken?: string; 
}

const UserSchema: Schema = new Schema({
    username:  { type: String, required: true, unique: true },
    password:  { type: String, required: true },
    name:      { type: String, required: true },
    age:       { type: Number, required: true },
    description: { type: String },
    interests: { type: [String], default: [] },
    online:    { type: Boolean, default: false },
    refreshToken: { type: String }, 
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);