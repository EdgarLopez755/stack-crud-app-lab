const dotenv = require('dotenv')
dotenv.config()

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const morgan = require('morgan')



process.env.MONGODB_URI='mongodb+srv://edgarlopez755:zHGPeUzilXAYqOYc@student-cluster.z2jsf.mongodb.net/student-cluster?retryWrites=true&w=majority&appName=Student-cluster'
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB ')
})
mongoose.connect(process.env.MONGODB_URI)   





const Shoe = require('./models/shoes.js')

app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))
app.use(morgan('dev'))




app.get('/', (req, res) => {
    res.render('index.ejs')
})




app.get('/shoes', async(req, res) => {
    const allShoes = await Shoe.find()
    console.log(allShoes)
    res.render('shoes/index.ejs', {shoes: allShoes})
})





app.get('/shoes/new', (req, res) => {
    res.render('shoes/new.ejs')   
})




app.get('/shoes/:shoeId', async(req, res) => {
    const foundShoe = await Shoe.findById(req.params.shoeId)
    res.render('shoes/show.ejs', { shoe: foundShoe})
})





app.get('/shoes/:shoeId/edit', async(req, res) => {
    const foundShoe = await Shoe.findById(req.params.shoeId)
    res.render('Shoes/edit.ejs', { shoe: foundShoe})
})





app.put('/shoes/:shoeId', async(req, res) => {
    if(req.body.isReadyToBuy === 'on'){
        req.body.isReadyToBuy = true 
    } else {
        req.body.isReadyToBuy = false
    }
    await Shoe.findByIdAndUpdate(req.params.shoeId, req.body)
    res.redirect(`/shoes/${req.params.shoeId}`)
})




app.delete('/shoes/:shoeId', async(req, res) => {
    await Shoe.findByIdAndDelete(req.params.shoeId)
    res.redirect('/shoes')
})



app.post('/shoes', async(req, res) => {
    if(req.body.isReadyToBuy === 'on'){
        req.body.isReadyToBuy = true
    } else {
        req.body.isReadyToBuy = false
    }

    await Shoe.create(req.body)
    res.redirect('/shoes')
})




app.listen(3000, () => {
    console.log("Listening on port 3000");
  });

