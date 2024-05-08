const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
const app = express()
const port = 8080
require('dotenv').config()
const Book = require('./model/book')

app.use(cors())

mongoose.connect(process.env.MONGODB_KEY, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connected to MongoDB....'))
    .catch(err => console.log(err))

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world')
})

//create a book
app.post('/books', async (req, res) => {
    try {
        let book = new Book({ title: req.body.title, author: req.body.author})
        book = await book.save()
        res.send(book)
        console.log('All books called');
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//get all books
app.get('/books',async (req,res) => {
    const books = await Book.find()
    res.json(books)
})

//get a single book
app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if(!book) return res.status(404).send('Book not found')
        res.send(book)
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
})

//update a book
app.put('/books/:id', async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title, author: req.body.author
    }, {new : true})
    if(!book) return res.status(404).send('Book not found')
    res.send(book)
})

app.delete('/books/:id', async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id)
    if(!book) return res.status(404).send('Book not found')
    res.status(204).send('Book deleted')
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})