
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{type: String ,required :true},
    author:{type: String ,required :true},
    ISBN:{type: Number ,required :true},
    publishYear:{type: Date ,required :true},
    genre:{type: String ,required :true},
    

})

const Book = mongoose.model('books',bookSchema);
export default Book;