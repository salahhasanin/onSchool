const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    fullName: {type: String,required: 'Full name can\'t be empty'}, //for all

    email: {type: String, required: 'Email can\'t be empty', unique: true}, //for all

    password: {type: String, required: 'Password can\'t be empty',

    minlength : [4,'Password must be atleast 4 character long']},

    age:{type: Number,min:6,max:70},             //for all

    level:{type: String},                        // for user and teacher

    gender:String,                               //for all

    image: String,                               //for all   

    roles: String,                               //for all

    category:{type:String,enum: ['arabic', 'english', 'math','science']}, //for teacher

    nextvView:[{videoId:{type:String,required:true}}], // for user

    video:[{numOfVideo:{type:Number,default: 0},videosID:{type:String,require:true}}], //for teacher

    access:[String],                              //for user
    
    saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

userSchema.methods.verifyPassword=function(password){
    //first parameter password in login form //second parameter encyrpted password 
   return bcrypt.compareSync(password,this.password);
}

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}
mongoose.model('User', userSchema);