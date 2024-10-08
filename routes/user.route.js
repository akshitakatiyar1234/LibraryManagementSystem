import express from 'express';
import UserController from '../controllers/user.controller.js';
import jwtAuth from '../middlewares/auth.js';  

const router = express.Router();  
const { registerUser, getUserById, getAllUsers, updateUser, deleteUser, signin } = new UserController(); 

// User Routes
router.post('/login',signin);                           //login
router.post('/signup', registerUser);                   // Register a new user
router.get('/user/:id', getUserById);                  // Get user by ID
router.get('/all-users', getAllUsers);                 // Get all users
router.put('/update/:id',jwtAuth, updateUser);        // Update user by ID
router.delete('/delete/:id',jwtAuth, deleteUser);     // Delete user by ID

export default router;
