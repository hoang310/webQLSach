const mongoose = require('mongoose');
const BookReview = require('../models/bookReview');

// Thêm review
exports.addReview = async (req, res) => {
    const bookId = req.params.id;
    const { rating, comment } = req.body;
    const userId = req.body.userId || "000000000000000000000000";
    if (!rating || rating < 1 || rating > 5) return res.status(400).json({ error: 'Rating phải từ 1 đến 5' });
    try {
        const review = await BookReview.create({ bookId, userId, rating, comment });
        res.status(201).json(review);
    } catch (e) {
        res.status(500).json({ error: 'Lỗi database' });
    }
};

// Lấy danh sách review của một sách
exports.listReviews = async (req, res) => {
    const bookId = req.params.id;
    const reviews = await BookReview.find({ bookId }).sort({ createdAt: -1 });
    res.json(reviews);
};

// Lấy điểm trung bình rating của một sách
exports.avgRating = async (req, res) => {
    const bookId = req.params.id;
    try {
        const stats = await BookReview.aggregate([
            { $match: { bookId: new mongoose.Types.ObjectId(bookId) } },
            { $group: { _id: "$bookId", avg: { $avg: "$rating" }, count: { $sum: 1 } } }
        ]);
        res.json(stats.length ? stats[0] : { avg: null, count: 0 });
    } catch (e) {
        console.error(e);
        res.json({ avg: null, count: 0 });
    }
};