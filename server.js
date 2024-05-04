const express = require('express')
const app = express()
const port = 8080

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world')
})

const books = [
    {
        id: 1,
        title: 'Harry Potter',
        author: 'JK Whatever'
    },
    {
        id: 2,
        title: 'The amazing book',
        author: 'Random mans'
    }
]

//create a book
app.post('/books', (req, res) => {
    const {title, author} = req.body
    if( !title || !author){
        return res.status(400).send('Missing title or author')
    }
    const newBook = {id: books.length + 1, title, author}
    books.push(newBook)
    res.status(201).send(newBook)
})

//get all books
app.get('/books', (req,res) => {
    res.json(books)
})

//get a single book
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if(!book){
        return res.status(404).send('Book not found')
    } 
    res.json(book)
})

//update a book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if(!book){
        return res.status(404).send('Book not found')
    } 
    
    const {title, author} = req.body
    book.title = title || book.title
    book.author = author || book.author
    res.send(book)
})

app.delete('/books/:id', (req, res) => {
    const bookIndex = books.find(b => b.id === parseInt(req.params.id))
    if(!bookIndex){
        return res.status(404).send('Book not found')
    } 
    books.splice(bookIndex, 1)
    res.status(204).send()
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})