const express = require("express")
const bcrypt = require('bcrypt');
const EmpModel = require("../models/employee");
const {model} = require("mongoose");

const SALT_ROUNDS = 10;

const routes = express.Router();

routes.get("/emp/employees", async (req, res) => {
    try{
        let employees = await EmpModel.find({}).exec();
        employees = employees.map(x => {
            return {
                employee_id: x._id,
                first_name: x.first_name,
                last_name: x.last_name,
                email: x.email,
                position: x.position,
                salary: x.salary,
                date_of_joining: x.date_of_joining,
                department: x.department
            };
        });
        return res.json(employees);
    }
    catch(err){
        res.status(400).send({message: err.message})
    }
});

routes.post("/emp/employees", async (req, res) => {

    try{
        const empData = await EmpModel.create(req.body);
        await EmpModel.validate(empData, (err, emp) => {
            if (err) {
                res.status(400).send({
                    message: err.message,
                });
            }
        });

        await empData.save();
        res.status(201).send({
            message: "Employee created successfully.",
            employee_id: empData._id
        });
    }
    catch (err){
        console.log(err);
        res.status(500).send({message: err.message});
    }

});


module.exports = routes;