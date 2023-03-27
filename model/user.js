const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema =new mongoose.Schema({
    name: {
        type: String,
        minlenght: 3,
        maxlength: 20,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        validate(value){
            if(value<18)
            {
                throw new Error(`Age can't be less than 18`);
            }
        },
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(`Email is not valid`);
            }
        },
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
});

userSchema.statics.findByCredentials = async function(email,password){
    const user = await User.findOne({email});
    if(!user) throw new Error('Invalid email/password');

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('Invalid email/password');
    return user;
}

userSchema.pre('save',async function(next){
    const user = this;
    console.log('just before saving!');

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    
    next();
})

const User = mongoose.model('User',userSchema);

module.exports = User;
