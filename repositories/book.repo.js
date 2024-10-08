import Book from '../models/book.model.js';

export default class bookRepository {

    // Add a new book to the database
    async addBook({ title, author, ISBN, publishYear, genre }) {
        try {
            //Check whether this book exists in databse
            const bookAlreadyExist = Book.findOne({ISBN :ISBN});

            if(bookAlreadyExist){
                return {success:false , message :"Book with ISBN exists.", data :""};
            }

            const book = new Book({ title, author, ISBN, publishYear, genre });
            const savedBook = await book.save();
            return {success:false , message :"Book added successfully" , data : savedBook};
        } catch (error) {
            console.error("Error adding book to the database:", error);
            return false;
        }
    }

  
   // GET ALL BOOKS 
    async getAllBooks({ page = 1, limit = 10 } = {}) {
        try{
            return await Book.find()
            .skip((page - 1) * limit) //Applying pagination
            .limit(limit);
        }
        catch(error){
            console.log("Error retrieving books from the database:", error);
            return false;
        }
       
    }

    // Retrieve a specific book by its ID
    async getBookById(id) {
        try {
            const book = await Book.findById(id);
            if (!book) {
                throw new Error("Book not found");
            }
            return book;
        } catch (error) {
            console.error("Error retrieving book by ID:", error);
            return false;
        }
    }

    // Update a book by its ID
    async updateBook(id, updatedData) {
        try {
            const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });
            if (!updatedBook) {
                throw new Error("Book not found for update");
            }
            return updatedBook;
        } catch (error) {
            console.error("Error updating book:", error);
            return false;
        }
    }

    // Delete a book by its ID
    async deleteBook(id) {
        try {
            const deletedBook = await Book.findByIdAndDelete(id);
            if (!deletedBook) {
                throw new Error("Book not found for deletion");
            }
            return deletedBook;
        } catch (error) {
            console.error("Error deleting book:", error);
           return false;
        }
    }
}
