# Book Management - Node.js MVVM + MongoDB

Quản lý sách với giao diện web đơn giản, backend Node.js theo mô hình MVVM, database MongoDB. 

## 🎯 Tính năng nổi bật

- CRUD sách: Thêm, sửa, xoá, tìm kiếm, sắp xếp
- **Review sách**: Đánh giá, bình luận, xem điểm trung bình rating
- **Mượn/trả sách**: Quản lý trạng thái mượn/trả, chỉ mượn được sách còn trống, trả rồi thì lại mượn tiếp
- **Giao diện profile user**: Xem lịch sử mượn/trả và thống kê tổng quan toàn hệ thống
- Responsive UI với HTML/CSS/JS
- Mô hình MVVM: Tách rõ Model / ViewModel (Controller) / View (Frontend)

## 💎 Yêu cầu cài đặt

- Node.js >= 16 
- MongoDB (local hoặc cloud, ví dụ Atlas)

## 🚀 Hướng dẫn chạy dự án

### 1. Clone và cài đặt thư viện
```sh
git clone https://github.com/hoang310/Book-management.git
cd Book-management
npm install
```

### 2. Khởi động MongoDB
- Nếu máy cá nhân: chạy `mongod` hoặc sử dụng Atlas (chỉnh sửa chuỗi kết nối nếu cần)

### 3. Các file & thư mục chính

```
.
├── app.js
├── models/
│   ├── book.js
│   ├── bookReview.js
│   └── bookBorrow.js
├── viewmodels/
│   ├── bookViewModel.js
│   ├── reviewViewModel.js
│   └── bookBorrowViewModel.js
├── public/
│   ├── index.html
│   └── style.css
├── README.md
```

### 4. Chạy ứng dụng
```
node app.js
```

### 5. Truy cập giao diện web
- Mở trình duyệt tới: [http://localhost:3000](http://localhost:3000)

---

## 📚 Mô tả tính năng

### Sách (Book)
- Thêm/sửa/xoá/tìm kiếm sách
- Sắp xếp danh sách theo tên, filter, tìm kiếm

### Review sách
- Gửi bình luận và đánh giá (từ 1 đến 5 sao) cho từng sách
- Xem danh sách bình luận, điểm trung bình rating ngay tại bảng

### Mượn/trả sách
- Chỉ sách "available" mới mượn được, khi mượn sẽ đổi trạng thái sang "borrowed"
- Trả sách sẽ ghi nhận thời điểm trả, sách trở lại trạng thái "available"
- Lịch sử mượn/trả chi tiết từng user

### Profile user
- ID user test mặc định: `000000000000000000000000`
- Xem tất cả lượt mượn/trả, tình trạng trả hay chưa
- Thống kê tổng lượt mượn, trả, số sách đang được mượn

---

## 🔗 Các API chính (sử dụng fetch JS, Postman hoặc curl đều được)

### Book
- `GET    /api/books`                - Lấy danh sách sách
- `POST   /api/books`                - Thêm sách
- `PUT    /api/books/:id`            - Sửa sách
- `DELETE /api/books/:id`            - Xoá sách
- `GET    /api/books/search?q=xxx`   - Tìm kiếm sách
- `GET    /api/books/sorted`         - Sắp xếp sách

### Review
- `POST   /api/books/:id/reviews`          - Gửi bình luận & đánh giá
- `GET    /api/books/:id/reviews`          - Xem bình luận của 1 sách
- `GET    /api/books/:id/rating`           - Lấy điểm trung bình & số lượng đánh giá 1 sách

### Mượn/Trả sách
- `POST   /api/books/:id/borrow`           - Mượn sách (truyền userId và dueDate)
- `POST   /api/books/:id/return`           - Trả sách
- `GET    /api/borrows?userId=abc`         - Lịch sử mượn/trả của user
- `GET    /api/borrows/stats`              - Thống kê hệ thống (tổng số lượt mượn/trả, số sách đang bị mượn)
