const dotenv = require('dotenv')
dotenv.config()

const express = require("express");
const app = express();
const mongoose = require('mongoose')



process.env.MONGODB_URI='mongodb+srv://edgarlopez755:zHGPeUzilXAYqOYc@student-cluster.z2jsf.mongodb.net/student-cluster?retryWrites=true&w=majority&appName=Student-cluster'
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB ')
    })
    

mongoose.connect(process.env.MONGODB_URI)   
// const Food = mongoose.model('Food', foodSchema)
// module.exports = Food
const Food = require('./models/food.js')

app.get('/', async(req, res) => {
    res.render('index.ejs')
});

app.get('/foods', async(req, res) => {
    const allFoods = await Food.find()
    console.log(allFoods)
    res.render('foods/index.ejs', {foods: allFoods})
})

app.get('/foods/new', (req, res) => {
    res.render('foods/new.ejs')
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
  });

