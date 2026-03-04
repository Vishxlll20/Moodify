const express = require("express")
const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklisting.model")

async function register(req,res){
    const {username,email,password} = req.body

    const userExists = await userModel.findOne({
        $or:[
            {email},
            {username}
    ]
    })

    if(userExists){
        res.status(409).json({
            message : "User already Exists"
        })
    }

    const hash = await bcrypt.hash(password,10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{
        expiresIn :"1d",
    })

    res.cookie("token",token)

    res.status(201).json({
        message:"User register Successfully",
        user
    })
}

async function login(req,res){
    const {username,email,password} = req.body;
    
    const user = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    }).select("+password")

    if(!user){
        res.status(409).json({
            message : "User does not exist"
        })
    }

    const isPassValid = await bcrypt.compare(password,user.password)

    if(!isPassValid){
        res.status(409).json({
            message : "Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{
        expiresIn :"1d",
    })

    res.cookie("token",token)

    res.status(209).json({
        message : "User logged IN",
        user
    })
}

async function getMe(req,res){
    const user = await userModel.findById(req.user.id)
    res.status(201).json({
        message: "User Fetched Successfully",
        user
    })
}

async function logout(req,res){
    const token = req.cookies.token
    res.clearCookie("token");

    await blacklistModel.create({token})
    res.status(209).json({
        message:"Logged Out Successfully",
    })


}
module.exports = {
    register,
    login,
    getMe,
    logout
}