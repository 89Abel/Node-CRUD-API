const express = require('express')
const app = express()

// route to access your server on a web browser
app.get('/', async (request, response) =>{
    response.send('Hello NODE API')
})
app.listen(3000, ()=>{
    console.log(`Node API app is running on port 3000`)
})