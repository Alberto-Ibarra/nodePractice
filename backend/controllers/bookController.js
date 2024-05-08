// controllers/bookController.js
const Book = require('../model/book');

// Create a book
exports.createBook = async (req, res) => {
    try {
        let book = new Book({ title: req.body.title, author: req.body.author})
        book = await book.save()
        res.send(book)
        console.log('All books called');
    } catch (error) {
        res.status(400).send(error.message)
    }
};

// Get all books
exports.getAllBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
};

// Get a single book
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if(!book) return res.status(404).send('Book not found')
        res.send(book)
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title, author: req.body.author
    }, {new : true})
    if(!book) return res.status(404).send('Book not found')
    res.send(book)
};

// Delete a book
exports.deleteBook = async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id)
    if(!book) return res.status(404).send('Book not found')
    res.status(204).send('Book deleted')
};
