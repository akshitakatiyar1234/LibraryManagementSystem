import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export default async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1); // Exit the process in case of failure
    }
}
