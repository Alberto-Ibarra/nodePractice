const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 8080;
require('dotenv').config();

const bookController = require('./controllers/bookController');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_KEY, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB....'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello world');
});

// Routes for books
app.post('/books', bookController.createBook);
app.get('/books', bookController.getAllBooks);
app.get('/books/:id', bookController.getBookById);
app.put('/books/:id', bookController.updateBook);
app.delete('/books/:id', bookController.deleteBook);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
