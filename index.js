const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Task_manager_db').then(()=>console.log('Database is connected!')).catch((err)=>console.error(err));


const express = require('express');
const app= express();
const port=process.env.PORT||4040;


const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

app.use(express.json()) //creating a middlewire to pass through req.body
//after routing
app.use(userRoutes);
app.use(taskRoutes);

app.listen(port,()=>console.log(`sever is running at port ${port}`));



//after routing we dont need it
// const User = require('./model/user');
// const Task = require('./model/task');
//const colors = require('colors');


async function db(){

    try{
        // const task =new Task({
        //     description:'task',
        // });
        // const user = new User({
        //     name: 'Jhon',
        //     age: 50,
        //     email: 'john@email.com',
        //     password: 'abcd'
        // });
        // await task.save();
        // console.log(task);
    }
    catch(e){
        console.log(e.message);
    }
}

db();


//work with api

//all routes are distributed


/**
 * /task POST
 * /task GET
 * /task/:id GET
 * /task/:id PATCH
 * /task/:id DELETE
 * /user POST
 * /user GET
 * /user/:id GET
 * /user/:id PATCH
 * /user/:id DELETE
 * 
 * 
 */

