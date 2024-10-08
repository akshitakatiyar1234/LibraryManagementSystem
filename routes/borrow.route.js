import express from 'express';
import borrowController from '../controllers/borrow.controller.js';

const router = express.Router();
//all methods of controllers
const { borrowBook, getAllBorrowedBooks, returnBook} = new borrowController();

// routes
router.post('/add', borrowBook);                 // Borrow a new Book
router.get('/all', getAllBorrowedBooks);         // All Borrowed Books
router.post('/return', returnBook);              // Return a Book
    

export default router;
