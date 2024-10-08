import borrowRepository from "../repositories/borrow.repo.js";

const borrowRepo = new borrowRepository();

export default class BorrowController {
    
    // Borrow a book
    async borrowBook(req, res) {
        try {
            const { userId, bookId, borrowDate } = req.body;

            if (!userId || !bookId) {
                return res.status(400).json({
                    success: false,
                    message: "BookId and UserId are required"
                });
            }

            const newBorrow = await borrowRepo.borrowBook({userId, bookId, borrowDate});
            //Check if book has been borrowed already
            if(!newBorrow){
                return res.status(400).json({
                    success: false,
                    message: "Book has been borrowed already",
                    data:""
                });
            }
            // otherwise return the book details
            return res.status(201).json({
                success: true,
                message: "Book borrowed successfully",
                data: newBorrow
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error borrowing book",
                error: error.message
            });
        }
    }

    // Get details of all borrowed books
    async getAllBorrowedBooks(req, res) {
        try {
            const borrowedBooks = await borrowRepo.getAllBorrowedBooks();
            return res.status(200).json({
                success: true,
                message: "Borrowed books details retrieved successfully",
                data: borrowedBooks
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error retrieving borrowed books details",
                error: error.message
            });
        }
    }

    // Return a book
    async returnBook(req, res) {
        try {
            const { userId, bookId, returnDate } = req.body;
    
            if (!userId || !bookId || !returnDate) {
                return res.status(400).json({
                    success: false,
                    message: "UserId, BookId, and ReturnDate are required"
                });
            }
    
            const book = await borrowRepo.returnBook(userId, bookId, returnDate);
            console.log(book);
            if (!book) {
                return res.status(404).json({
                    success: false,
                    message: "No book borrowed with this ID or Book has been returned already"
                });
            }
    
            return res.status(200).json({
                success: true,
                message: "Book returned successfully",
                data: book 
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error returning the book",
                error: error.message
            });
        }
    }
    
}
