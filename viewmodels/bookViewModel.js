const Book = require('../models/book');

// Lấy danh sách sách
exports.getBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books.map(b => ({ id: b._id, ...b.toObject() })));
};

// Thêm sách
exports.addBook = async (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) return res.status(400).json({ error: "Missing fields" });
    try {
        const book = await Book.create({ title, author, year });
        res.status(201).json({ id: book._id, ...book.toObject() });
    } catch (e) {
        res.status(500).json({ error: "Database error" });
    }
};

// Cập nhật sách
exports.updateBook = async (req, res) => {
    const { title, author, year } = req.body;
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: "Không tìm thấy sách." });
        if (title) book.title = title;
        if (author) book.author = author;
        if (year) book.year = year;
        await book.save();
        res.json({ message: "Đã cập nhật sách!" });
    } catch (e) {
        res.status(500).json({ error: "Database error" });
    }
};

// Xóa sách
exports.deleteBook = async (req, res) => {
    try {
        const result = await Book.deleteOne({ _id: req.params.id });
        if (result.deletedCount) res.json({ message: "Đã xóa sách!" });
        else res.status(404).json({ error: "Không tìm thấy sách." });
    } catch (e) {
        res.status(500).json({ error: "Database error" });
    }
};

// Tìm kiếm sách
exports.searchBooks = async (req, res) => {
    const keyword = (req.query.q || "").toLowerCase();
    const books = await Book.find({
        $or: [
            { title: new RegExp(keyword, "i") },
            { author: new RegExp(keyword, "i") }
        ]
    });
    res.json(books.map(b => ({ id: b._id, ...b.toObject() })));
};

// Sắp xếp sách theo tên
exports.sortedBooks = async (req, res) => {
    const books = await Book.find().sort({ title: 1 });
    res.json(books.map(b => ({ id: b._id, ...b.toObject() })));
};