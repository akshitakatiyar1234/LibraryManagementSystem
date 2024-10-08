import bookRepository from "../repositories/book.repo.js";

const bookRepo = new bookRepository();

export default class BookController {
    
    // Add a new book
    async addBook(req, res) {
        try {
            const { title, author, ISBN, publishYear, genre } = req.body;

            if (!title || !author || !ISBN || !publishYear || !genre) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            const newBook = await bookRepo.addBook({ title, author, ISBN, publishYear, genre });
            
            return res.status(201).json({
                success: newBook.success,
                message: newBook.message,
                data: newBook.data
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error adding book",
                error: error.message
            });
        }
    }

    // Get all books
    async getAllBooks(req, res) {
        try {
            const books = await bookRepo.getAllBooks();
            return res.status(200).json({
                success: true,
                message: "Books retrieved successfully",
                data: books
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error retrieving books",
                error: error.message
            });
        }
    }

    // Get a book by ID
    async getBookById(req, res) {
        try {
            const { id } = req.params;
            const book = await bookRepo.getBookById(id);

            if (!book) {
                return res.status(404).json({
                    success: false,
                    message: "Book not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Book retrieved successfully",
                data: book
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error retrieving book",
                error: error.message
            });
        }
    }

    // Update book by ID
    async updateBook(req, res) {
        try {
            const { id } = req.params;
            const updatedBook = await bookRepo.updateBook(id, req.body);

            if (!updatedBook) {
                return res.status(404).json({
                    success: false,
                    message: "Book not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Book updated successfully",
                data: updatedBook
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error updating book",
                error: error.message
            });
        }
    }

    // Delete a book by ID
    async deleteBook(req, res) {
        try {
            const { id } = req.params;
            const deletedBook = await bookRepo.deleteBook(id);

            if (!deletedBook) {
                return res.status(404).json({
                    success: false,
                    message: "Book not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Book deleted successfully"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error deleting book",
                error: error.message
            });
        }
    }
}
