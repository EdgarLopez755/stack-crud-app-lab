const dotenv = require('dotenv')
dotenv.config()

const express = require("express");
const app = express();
const mongoose = require('mongoose')


const foodSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});
 
    
process.env.MONGODB_URI='mongodb+srv://edgarlopez755:zHGPeUzilXAYqOYc@student-cluster.z2jsf.mongodb.net/student-cluster?retryWrites=true&w=majority&appName=Student-cluster'
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB ')
    })

mongoose.connect(process.env.MONGODB_URI)
    
const Food = mongoose.model('Food', foodSchema)

module.exports = Food;

app.get('/test', (req,res) => {
    res.send('Testing')
});

app.get('/', async(req, res) => {
    res.render('index.ejs')
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
  });

