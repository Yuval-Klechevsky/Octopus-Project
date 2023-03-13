const express = require('express');
const mongoose = require('mongoose');

const app= express();

const url = ('mongodb://mongo:27017/fruitsDB');



// Connect to mongoDB with mongoose

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true})

.then(() => console.log('"Connected to Mongo DB Successfully!!"'))
.catch(error => console.log("Error to connect mongoDB: ", error));


app.listen(8081,()=>{
    console.log("Server is running at port 8081")
})



