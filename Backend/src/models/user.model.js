const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"Try another username"]
    },
    username:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email already exists"]
    },
    password:{
        type:String,
        required:[true,"Username is required"],
        select:false
        

    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel