import express from 'express';
import bookController from '../controllers/book.controller.js';

const router = express.Router();
//all methods of controllers
const { addBook, getAllBooks, getBookById, updateBook, deleteBook } = new bookController();

// routes
router.post('/add', addBook);                 // Adding a new book
router.get('/all', getAllBooks);              // Fetching all books
router.get('/:id', getBookById);              // Fetching a book by its ID
router.put('/update/:id', updateBook);        // Updating a book by its ID
router.delete('/delete/:id', deleteBook);     // Deleting a book by its ID

export default router;
