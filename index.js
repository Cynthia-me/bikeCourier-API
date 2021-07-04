const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('./Schemas/connection.js');

const app = express();
dotenv.config();

const userRoutes = require("./Routes/user-auth.js");
const parcelRoutes = require("./Routes/parcels.JS")

const port = process.env.PORT || 3500;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v3/users',userRoutes);
app.use('/api/v3/parcels',parcelRoutes);

app.get('/',(req,res)=>{
    res.send("BIKE COURIER- REDO OF SAFE COURIER");
})


app.listen(port,(req,res)=>{
    console.log(`Server is running: http://localhost:${port}`);
})