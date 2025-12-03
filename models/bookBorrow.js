const mongoose = require('mongoose');
const bookBorrowSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowedDate: { type: Date, default: Date.now },
    dueDate: { type: Date },
    returnedDate: { type: Date } // null nếu chưa trả
});
module.exports = mongoose.model('BookBorrow', bookBorrowSchema);