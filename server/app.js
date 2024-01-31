// const multer = require('multer');
const express = require('express')
const path = require('path')
const http = require ('http')
const morgan = require('morgan')
require('dotenv').config()      // importing the dot env file
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2/promise')
const accountsRoutes = require('./routes/accountRoutes.js')
// const bookRoutes = require('./routes/booksRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
// const uuid = require('uuid')

const db = require('./config/db.js')
const PORT = 3000

const app = express()

// const server = http.createServer((req, res) => {
//     console.log('Request made')
// })
app.use(express.urlencoded({ extended: false}))
//static
app.use(express.static(path.join(__dirname, '..', 'client')));

// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, '..', 'client', 'images')));


// Middlewares
app.use(morgan('dev'))

app.use(bodyParser.json())      // used to identify the body of a request

app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
)

// const storage = multer.memoryStorage(); // In-memory storage, you can configure it based on your needs
// const upload = multer({ storage: storage });

app.use('/accounts', accountsRoutes)
// app.use('/books', bookRoutes)
app.use('/user', userRoutes)

const server = http.createServer(app) 

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
