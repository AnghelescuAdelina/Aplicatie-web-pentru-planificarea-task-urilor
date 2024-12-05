const express=require('express');

const app=express();

const taskRoutes=require('./api/routes/tasks');
const userRoutes=require('./api/routes/users');

app.use('/tasks',taskRoutes);
app.use('/users',userRoutes);

module.exports=app;