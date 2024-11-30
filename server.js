const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const empRoutes = require('./routes/employees');
const userValidators = require('./validators/users');
const empValidators = require('./validators/employees');
const cors = require('cors');

/*
    Required env variables: DB_CONNECTION_STRING
    Non-essential: PORT
 */
dotenv.config();

let SERVER_PORT = process.env.PORT;
if(!SERVER_PORT)
    SERVER_PORT = 3001;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

mongoose.connect(DB_CONNECTION_STRING).then(() => {
    console.log("Connected to mongodb")
}).catch((error) => {
    console.log("Error: ", error)
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/v1", userValidators);
app.use("/api/v1", empValidators);

app.use("/api/v1", userRoutes);
app.use("/api/v1", empRoutes);

app.use('/', (req, res) => {
    res.json({
        author: 'Jose Britto Saaji',
        for: 'COMP 3123',
        demo_username: 'johndoe',
        demo_password: 'pass123',
        baseUrl: '/api/v1',
        endpoints: {
            user_endpoints: [
                {
                    url: '/user/login',
                    method: 'POST'
                },
                {
                    url: '/user/signup',
                    method: 'POST'
                }
            ],
            employee_endpoints: [
                {
                    url: '/emp/employees',
                    method: 'GET',
                },
                {
                    url: '/emp/employees/:id',
                    method: 'GET'
                },
                {
                    url: '/emp/employees',
                    method: 'POST'
                },
                {
                    url: '/emp/employees',
                    method: 'PUT'
                },
                {
                    url: '/emp/employees/:id',
                    method: 'DELETE'
                }
            ]
        }
    })
})

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
});