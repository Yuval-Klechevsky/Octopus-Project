const express = require('express');
const mongoose = require('mongoose');
const app= express();
const prometheus = require('prom-client');
prometheus.collectDefaultMetrics();



const url = ('mongodb://mongo:27017/fruitsDB');

const counter = new prometheus.Counter({
    name: 'node_request_operations_total',
    help: 'The total number of processed requests'
});
  

// Connect to mongoDB with mongoose

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true})

.then(() => console.log('"Connected to Mongo DB Successfully!!"'))
.catch(error => console.log("Error to connect mongoDB: ", error));

// maps to a MongoDB collection and defines the shape of the documents within that collection.

const fruitSchema = new mongoose.Schema({
    _id:{
        type: Number,
        required:true
    },
    name: {
        type: String,
        required:true
    }, 
    qty: {
        type: Number,
        required:true  
    },

    rating: {
        type: Number,
        required:true 
    }

});

// Documents can be retrieved using a mongoos model.

const fruit = mongoose.model("fruit", fruitSchema,'fruits_tb');

app.get('/',(req,res)=>{
fruit.findOne({ name: 'apples' })
    .then(result => {
      const qty = result.qty;
      res.status(200).json(qty);
    });
    counter.inc();
});

app.get('/metrics', (req, res) => {
    res.set('Content-Type', prometheus.register.contentType);
    res.end(prometheus.register.metrics());
})

app.listen(8081,()=>{
    console.log("Server is running at port 8081")
})



