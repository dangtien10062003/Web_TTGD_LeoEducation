-- Database: Web_GD
-- SQL Server location is configured by DB_SERVER in .env.

-- Contact Requests Table
CREATE TABLE ContactRequests (
    id INT PRIMARY KEY IDENTITY(1,1),
    fullName NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    phone NVARCHAR(20) NOT NULL,
    message NVARCHAR(MAX) NOT NULL,
    status NVARCHAR(50) DEFAULT N'Mới',
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

-- Courses Table
CREATE TABLE Courses (
    id INT PRIMARY KEY IDENTITY(1,1),
    title NVARCHAR(200) NOT NULL,
    description NVARCHAR(MAX),
    instructor NVARCHAR(100),
    duration NVARCHAR(50),
    level NVARCHAR(50),
    price DECIMAL(10,2),
    image NVARCHAR(500),
    category NVARCHAR(100),
    students INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    isActive BIT DEFAULT 1,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

-- Insert sample courses data
INSERT INTO Courses (title, description, instructor, duration, level, price, image, category, students, rating) VALUES
(N'Lập trình Web Full-Stack', N'Học xây dựng ứng dụng web hoàn chỉnh với React, Node.js và SQL Server', N'Nguyễn Văn A', N'12 tuần', N'Trung cấp', 2999000, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', N'Lập trình', 1250, 4.8),
(N'Digital Marketing 2024', N'Chiến lược marketing online hiệu quả cho doanh nghiệp', N'Trần Thị B', N'8 tuần', N'Cơ bản', 1999000, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', N'Marketing', 890, 4.7),
(N'UI/UX Design Chuyên Nghiệp', N'Thiết kế giao diện người dùng đẹp và trải nghiệm tốt', N'Lê Văn C', N'10 tuần', N'Trung cấp', 2499000, 'https://images.unsplash.com/photo-1561070791-2526d30994b5', N'Thiết kế', 670, 4.9),
(N'Data Science với Python', N'Phân tích dữ liệu và Machine Learning cơ bản', N'Phạm Thị D', N'14 tuần', N'Nâng cao', 3499000, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', N'Data Science', 450, 4.6);
