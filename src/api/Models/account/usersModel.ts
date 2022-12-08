import mongoose  from "mongoose";
import { Schema, Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import User from './interface';


const userSchema = new Schema<User>({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide valid email!']
    },
    photo: String,
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin', 'client'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minLength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password!'],
    },
    passwordChangedAt: Date,
    active: {
        type: Boolean,
        default: true
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.virtual('price-old', function(){
})

userSchema.pre('save', async function(){
})

userSchema.method('comparePass', async function comparePass(doc) {
    console.log(doc)
    // doc.p
    // return await bcrypt.compare(this.password, this.passwordConfirm)
});

const User = mongoose.model<User & mongoose.Document>('User', userSchema);
export default User;