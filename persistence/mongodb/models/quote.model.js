//bring in mongoose so we can create a schema that represents the data for a User
const mongoose = require("mongoose");
//require bcrytp to help with password encryption
const bcrypt = require("bcrypt")

//Create our schema using mongoose that contains the fields and their data types for our Users
//More info: https://mongoosejs.com/docs/schematypes.html
const quoteSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, "Invalid E-mail Address"],
    },
    Address: {
        type: String,
        required: true,
        minlength: 5
    },
    City: {
        type: String,
        required: true,
        minlength: 2
    },
    State: {
        type: String,
        required: true,
        minlength: 2
    },
    Zipcode: {
        type: String,
        required: true,
        minlength: 3
    },
    Age: {
        type: Number,
        min: 18, 
        max: 65
    },
    LOB: {
        type: String,
        required: true,
        minlength: 3
    },
    Premium: {
        type: Number,
        requried: true
    }
})

// quoteSchema.pre('save', function (next) {
//     let user = this;

//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();

//     // generate a salt
//     bcrypt.genSalt(10, function (err, salt) {
//         if (err) return next(err);

//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, function (err, hash) {
//             if (err) return next(err);
//             // override the cleartext password with the hashed one
//             user.password = hash;
//             next();
//         });
//     });
// });

//Generate the model our code will interact with from the above schema
//Models allow us to interact with the data inside our MongoDB collections
//More info: https://mongoosejs.com/docs/models.html
const Quote = mongoose.model('Quote', quoteSchema);

//export our model
module.exports = Quote;