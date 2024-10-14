const express = require("express")
const bcrypt = require('bcrypt');
const EmpModel = require("../models/employee");
const {model} = require("mongoose");

const SALT_ROUNDS = 10;

const routes = express.Router();

routes.get("/emp/employees", async (req, res) => {
    try{
        let employees = await EmpModel.find({}).exec();
        employees = employees.map(mapToEmployeeDTO);
        return res.json(employees);
    }
    catch(err){
        res.status(500).send({message: err.message})
    }
});

routes.post("/emp/employees", async (req, res) => {

    try{
        const empData = await EmpModel.create(req.body);
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


routes.get('/emp/employees/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const employee = await EmpModel.findById(id).exec();
        if(!employee){
            return res.status(404).send({message: "Employee not found"});
        }
        const empDTO = mapToEmployeeDTO(employee);
        return res.json(empDTO);
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});

routes.put('/emp/employees/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const employee = await EmpModel.findById(id).exec();
        if(!employee){
            return res.status(404).send({message: 'Employee not found'});
        }
        let body = req.body;

        body.updated_at = Date.now();

        const returned = await EmpModel.findByIdAndUpdate(id, body, {new: true});
        if(!returned) {
            return res.status(500).send({message: err.message});
        }
        return res.status(200).send({message: "Employee details updated successfully."});
    }
    catch (err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});

routes.delete('/emp/employees/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const employee = await EmpModel.findById(id).exec();
        if(!employee){
            return res.status(404).send({message: 'Employee not found'});
        }
        await EmpModel.findByIdAndDelete(id).exec();
        return res.status(200).send({message: "Employee deleted successfully."});
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({message: err.message});
    }
})

const mapToEmployeeDTO = (dbEmployee) => {
    return {
        employee_id: dbEmployee._id,
        first_name: dbEmployee.first_name,
        last_name: dbEmployee.last_name,
        email: dbEmployee.email,
        position: dbEmployee.position,
        salary: dbEmployee.salary,
        date_of_joining: dbEmployee.date_of_joining,
        department: dbEmployee.department
    };
}

module.exports = routes;