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
        origin: ["http://localhost:3000", "https://travel-pulse-server.onrender.com"],
        credentials: true,
    })
)

// const storage = multer.memoryStorage(); // In-memory storage, you can configure it based on your needs
// const upload = multer({ storage: storage });

app.use('/accounts', accountsRoutes)
// app.use('/books', bookRoutes)
app.use('/user', userRoutes)

app.post('/review', async (req, res) => {
  const { title, review, location, date} = req.body
  const id = uuid.v4()
  try {
    if (!title) throw Error('Title is required')
    if (!review) throw Error('Review is required')
    if (!location) throw Error('location is required')
    if (!date) throw Error('Date is required')

  const sql = `INSERT INTO review (id, title, review, location, date) VALUES ("${id}", "${title}", "${review}", "${location}", "${date}";)`
  await db.execute(sql)

  let response = {
    statusCode: 200,
    message: 'review added successfully',
  }

  res.status(200).json(response)
} catch (error) {
  const response = {
    message: error.message,
    statusCode: 400
  }
  res.status(400).json(response)
}
})



const server = http.createServer(app) 

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
