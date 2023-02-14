//bring in mongoose so we can create a schema that represents the data for a User
const mongoose = require("mongoose");
//require bcrytp to help with password encryption
const bcrypt = require("bcrypt")

//Create our schema using mongoose that contains the fields and their data types for our Users
//More info: https://mongoosejs.com/docs/schematypes.html
const agentSchema = new mongoose.Schema({
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
    Title: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        match: [/.+\@.+\..+/, "Invalid E-mail Address"],
    },
    state: {
        type: String,
        minlength: 2, 
        maxlength: 2
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10
    },
    profileImage: 
        {
            data: Buffer,
            contentType: String
        }
})

//Generate the model our code will interact with from the above schema
//Models allow us to interact with the data inside our MongoDB collections
//More info: https://mongoosejs.com/docs/models.html
const Agent = mongoose.model('Agent', agentSchema);

//export our model
module.exports = Agent;