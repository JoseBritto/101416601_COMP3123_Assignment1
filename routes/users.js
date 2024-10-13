const express = require("express")
const bcrypt = require('bcrypt');
const UserModel = require("../models/user");
const UserDTO = require("../models/userDTO");

const SALT_ROUNDS = 10;

const routes = express.Router();

routes.post("/user/signup", async (req, res) => {

    try{
        const userData = await UserModel.create(req.body);
        userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
        await userData.save();
        res.status(201).send({
            message: "User created successfully.",
            user_id: userData._id
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});


routes.post("/user/login", async (req, res) => {
    try{
        let user;
        if(req.body.email){
            user = await UserModel.findOne({ email: req.body.email }).exec();
        } else if (req.body.username){
            user = await UserModel.findOne({ username: req.body.username }).exec();
        }
        if(!user){
            return res.status(401).send({message: "Invalid username or password"});
        }
        const correctPass = await bcrypt.compare(req.body.password, user.password);
        if(correctPass){
            res.status(200).send({message: "Login successful."});
        }
        else{
            res.status(401).send({message: "Invalid username or password"});
        }
    }
    catch (err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});


module.exports = routes;