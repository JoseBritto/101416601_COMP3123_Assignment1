const express = require("express");
const UserDTO = require("../models/userDTO");

const router = express.Router();

router.post('/user/signup', (req, res, next) => {

    try{
        UserDTO.parse(req.body);

        //Do not allow users to overwrite created_at date
        req.body.created_at = Date.now();
        req.body.updated_at = Date.now();
    } catch(err) {
        res.status(400).send({
            message: 'Invalid input. User creation failed',
            errors: err.issues.map(x => x.message)
        });
        return;
    }
    next();
});

router.post('/user/login', (req, res, next) => {
    try{
        // Make username and email optional here so only password is required
        UserDTO.partial({
            username: true,
            email: true
        }).parse(req.body);
    } catch (err){
        res.status(400).send({
            message: 'Invalid input. User login failed',
            errors: err.issues.map(x => x.message)
        });
        return;
    }
    next();
});

module.exports = router;