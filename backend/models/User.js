import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    username: {
        type: 'string', 
        required: true, 
        unique: true},
    password: {
        type: 'string', 
        required: true},
    savedRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipes",
    }]
}, {
    timestamps: true
});

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePasswords = async function (userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
}

UserSchema.methods.createJWT = function () {
    return jwt.sign({id: this._id, username: this.username},process.env.JWT_SECRET, {expiresIn: '1d'});
}

const Usermodel = mongoose.model('users', UserSchema);

export default Usermodel;