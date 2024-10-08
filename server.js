import server from "./app.js";
import dotenv from 'dotenv';
import connectToDb from './config/db.js';

dotenv.config();
const port = process.env.PORT || 3000;

(async () => {
    try {
        await connectToDb();  // Connect to the database before starting the server
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1);  // Exit process if database connection fails
    }
})();
