const express = require("express");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklisting.model");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    res.status(404).json({
      message: "Token not found",
    });
  }

  const isBlacklisted = await blacklistModel.findOne({token})
  if(isBlacklisted){
    res.status(409).json({
        message:"Invalid Token"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(409).json({
      message: "Token Invalid",
    });
  }
}

module.exports = {authUser}
