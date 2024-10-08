import mongoose from 'mongoose';

const borrowSchema = new mongoose.Schema({
 userId :{type: mongoose.Schema.ObjectId, ref:'users', required :true},
 bookId :{type: mongoose.Schema.ObjectId, ref:'books', required :true},
 borrowDate :{type: Date, default:Date.now},
 returnDate:{type: Date}
});

const Borrow = mongoose.model('borrow',borrowSchema);

export default Borrow;