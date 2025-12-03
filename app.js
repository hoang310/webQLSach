const express = require('express');
const mongoose = require('mongoose');
const bookVM = require('./viewmodels/bookViewModel');
const reviewVM = require('./viewmodels/reviewViewModel');
const bookBorrowVM = require('./viewmodels/bookBorrowViewModel');
const connectDB = require("./db");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static('public'));

// Kết nối MongoDB
connectDB();

// book
app.get('/api/books', bookVM.getBooks);
app.post('/api/books', bookVM.addBook);
app.put('/api/books/:id', bookVM.updateBook);
app.delete('/api/books/:id', bookVM.deleteBook);
app.get('/api/books/search', bookVM.searchBooks);
app.get('/api/books/sorted', bookVM.sortedBooks);

// Review APIs
app.post('/api/books/:id/reviews', reviewVM.addReview);
app.get('/api/books/:id/reviews', reviewVM.listReviews);
app.get('/api/books/:id/rating', reviewVM.avgRating);

// Book Borrow APIs 
app.post('/api/books/:id/borrow', bookBorrowVM.borrowBook);
app.post('/api/books/:id/return', bookBorrowVM.returnBook);
app.get('/api/borrows', bookBorrowVM.borrowHistory);
app.get('/api/borrows/stats', bookBorrowVM.stats);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});