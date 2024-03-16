const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Data = require('./models/DataModel')

// Middleware help our app understand json
app.use(express.json())
// if want to use form
app.use(express.urlencoded({extended: false}))

// route to access your server on a web browser
app.get('/', (request, response) =>{
    response.send('Hello NODE API')
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
mongoose.connect('mongodb+srv://abelgetahun18:wfxjaYFhMtYhdamg@books-store-mern.x2mljgl.mongodb.net/Node-CRUD-Api?retryWrites=true&w=majority&appName=Books-Store-MERN')
.then(()=>{
    console.log('connected to MongoDB !')
    app.listen(3000, ()=>{
        console.log(`Node API app is running on port 3000`)
    })
}).catch((error) =>{
    console.log(error)
})

