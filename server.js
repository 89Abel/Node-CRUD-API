require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Data = require('./models/DataModel')
const cors = require('cors');

// Middleware help our app understand json
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL
const FRONTEND = process.env.FRONTEND
// if want to use form
app.use(express.urlencoded({extended: false}))

// route to access your server on a web browser
app.get('/', (request, response) =>{
    response.send('Server is Running!');
})

app.get('/blog', (request, response) =>{
    response.send('Hello this is blog my name is Abel G.')
})
// Fetch or get data from the database
app.get('/users', async (request, response) =>{
    try {
        const user = await Data.find({})
        response.status(200).json(user)
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
    }
})

// Fetch or get one data from the database using id
app.get('/users/:id', async (request, response) =>{
    try {
        const { id } = request.params;
        const user = await Data.findById(id)
        response.status(200).json(user)
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
    }
})

// Update data from database using id
app.put('/users/:id', async (request, response) =>{
    try {
        const { id } = request.params;
        const user = await Data.findByIdAndUpdate(id, request.body)
        if(!user){
            response.status(400).json({message: `Can't find any data by this id ${id}`})
        }
        const updatedUser = await Data.findById(id)
        response.status(200).json(updatedUser)
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
        
    }
})
// Delete data from database using id
app.delete('/users/:id', async (request, response) =>{
    try {
        const {id} = request.params;
        const user = await Data.findByIdAndDelete(id, request.body);
        if(!user){
            response.status(400).json({message: `Can't find any data by this id ${id}`});
        }
        response.status(200).json({user: user, message: 'User Deleted Successfully!'});
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
    }
})

// Send data to the database
app.post('/product', async (request, response) =>{
    try {
        const data = await Data.create(request.body)
        response.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
    }
})
// MongoDB connection
mongoose.connect(MONGO_URL)
.then(()=>{
    console.log('connected to MongoDB !')
    app.listen(PORT, ()=>{
        console.log(`Node API app is running on port ${PORT}`)
    })
}).catch((error) =>{
    console.log(error)
})

