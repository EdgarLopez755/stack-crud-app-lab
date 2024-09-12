
const express = require('express')
const app = express()
const mongoose = require('mongoose')


app.get('/test', (req, res) => {
  res.send("testing server")
})

app.get('/', async (req, res) => {
  res.render('index.ejs')
})


const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food





app.listen(3000, () => {
  console.log("Listening on port 3000");
});



