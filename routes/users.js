const express = require("express")
const bcrypt = require('bcrypt');
const UserModel = require("../models/user")

const SALT_ROUNDS = 10;

const routes = express.Router();

routes.post("/user/signup", async (req, res) => {

    try{
        const userData = await UserModel.create(req.body);
        await UserModel.validate(userData, (err, user) => {
            if (err) {
                res.status(400).send({
                    message: err.message,
                });
            }
        });
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
        const user = await UserModel.findOne({ email: req.body.email }).exec();
        if(!user){
            return res.status(401).send({message: "Invalid username or password"});
        }
        if(!req.body.password){
            return res.status(400).send({message: "Password is required"});
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