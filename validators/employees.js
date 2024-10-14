const express = require("express");
const EmpDTO = require("../models/employeeDTO");

const router = express.Router();

router.post('/emp/employees', (req, res, next) => {
    try{
        EmpDTO.parse(req.body);

        //Do not allow users to overwrite created_at date
        if(req.body.created_at)
            req.body.created_at = Date.now();
        if(req.body.updated_at)
            req.body.updated_at = Date.now();
    } catch(err) {
        res.status(400).send({
            message: 'Invalid input. Employee creation failed',
            errors: err.issues.map(x => x.message)
        });
        return;
    }
    next();
});

router.put('/emp/employees/:id', (req, res, next) => {
   try{
       EmpDTO.partial().parse(req.body);

       if(req.body.created_at || req.body.updated_at)
       {
           res.status(401).send({
               message: 'Created at and updated at dates are not allowed to be modified'
           });
           return;
       }

   } catch(err) {
       res.status(400).send({
           message: 'Invalid input. See errors',
           errors: err.issues.map(x => x.message)
       });
       return;
   }
    next();
});

module.exports = router;