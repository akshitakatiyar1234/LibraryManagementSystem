import Borrow from '../models/borrow.model.js';

export default class borrowRepository {

    //Borrow a book
    async borrowBook({ userId ,bookId ,borrowDate}) {
        try {
           
            //check whether that book has been borrowed or not 
            const existingBorrowCount = await Borrow.countDocuments({
                bookId,
                returnDate: { $exists: false } // Check if returnDate is not set
            });

            if (existingBorrowCount > 0) {
                // If there is at least one record where the book is currently borrowed, return null
                return null; 
            }

            //Otherwise Allow user to Borrow that book
            const borrow = new Borrow({ userId ,bookId ,borrowDate });
            const borrowed = await borrow.save();
            return borrowed;
        } catch (error) {
            console.error("Error in borrowing a book", error);
            return false;
        }
    }

  
    //  LIST OF ALL BORROWED BOOKS
    async getAllBorrowedBooks() {
        try{
           const borrows= await Borrow.find()
           .populate('userId','name email')       //populate user details
           .populate('bookId','title author');    //populate book details
            
           return borrows;
        }
        catch(error){
            console.log("Error retrieving borrows from the database:", error);
            return false;
        }
       
    }

    // Return a Book
    async returnBook(userId, bookId, returnDate) {
        try {
            // Find the borrow details first
            const borrowDetails = await Borrow.findOne({ userId, bookId });
            
            // Check if the user has borrowed the book
            if (!borrowDetails) {
                throw new Error("No book borrowed with this ID");
            }
    
            // Check if the book has already been returned
            if (borrowDetails.returnDate) {
                throw new Error("This book has already been returned");
            }
    
            // Update the returnDate
            const updatedBorrow = await Borrow.updateOne(
                { userId, bookId },
                { $set: { returnDate } }
            );
    
            // Check if the update was successful
            if (updatedBorrow.modifiedCount === 0) {
                throw new Error("Failed to return the book");
            }
    
            return updatedBorrow; // Return the updated details
        } catch (error) {
            console.error("Error returning the book:", error);
            return false; 
        }
    }
    
  
}
