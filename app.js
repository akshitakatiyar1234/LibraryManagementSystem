import express from 'express';
import userRoutes from './routes/user.route.js';
import bookRoutes from './routes/book.route.js';
import borrowRoutes from './routes/borrow.route.js';
import jwtAuth from './middlewares/auth.js';

//express server
const app = express();

// Middleware 
app.use(express.json()); 

// Routes
app.use('/api/user', userRoutes);
app.use('/api/book',jwtAuth,bookRoutes);
app.use('/api/borrow',jwtAuth,borrowRoutes);

// for invalid paths
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// General error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server error');
  });


export default app;
