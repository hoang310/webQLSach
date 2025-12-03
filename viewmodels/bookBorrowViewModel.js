const BookBorrow = require('../models/bookBorrow');
const Book = require('../models/book');

// Mượn sách
exports.borrowBook = async (req, res) => {
    const { userId, dueDate } = req.body;
    const bookId = req.params.id;

    // Kiểm tra sách đã bị mượn chưa
    const checkBorrow = await BookBorrow.findOne({ bookId, returnedDate: null });
    if (checkBorrow) {
        return res.status(409).json({ error: 'Sách đang được mượn!' });
    }

    // Tạo bản ghi mượn mới
    try {
        const borrow = await BookBorrow.create({
            userId: userId || "000000000000000000000000", // test, sau thay bằng user thực
            bookId,
            dueDate
        });
        // Optional: cập nhật trạng thái sách
        await Book.findByIdAndUpdate(bookId, { status: 'borrowed' });
        res.status(201).json(borrow);
    } catch (e) {
        res.status(500).json({ error: 'Lỗi cơ sở dữ liệu!' });
    }
};

// Trả sách
exports.returnBook = async (req, res) => {
    const bookId = req.params.id;
    // Tìm lượt mượn còn active
    const borrow = await BookBorrow.findOne({ bookId, returnedDate: null });
    if (!borrow) {
        return res.status(404).json({ error: 'Không tìm thấy bản ghi mượn chưa trả!' });
    }
    borrow.returnedDate = new Date();
    await borrow.save();
    // Cập nhật trạng thái sách
    await Book.findByIdAndUpdate(bookId, { status: 'available' });
    res.json({ message: 'Đã trả sách!', data: borrow });
};

// Lịch sử mượn sách của user
exports.borrowHistory = async (req, res) => {
    const { userId } = req.query;
    const q = userId ? { userId } : {};
    const list = await BookBorrow.find(q).populate('bookId').sort({ borrowedDate: -1 });
    res.json(list);
};

exports.stats = async (req, res) => {
    const totalBorrowed = await BookBorrow.countDocuments({ returnedDate: null });
    const totalBorrows = await BookBorrow.countDocuments({});
    // Số lượt trả = số borrow có returnedDate khác null
    const totalReturned = await BookBorrow.countDocuments({ returnedDate: { $ne: null }});
    res.json({
        totalBorrowed,
        totalBorrows,
        totalReturned
    });
};