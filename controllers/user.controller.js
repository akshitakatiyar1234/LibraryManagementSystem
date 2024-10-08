import userRepository from "../repositories/user.repo.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const userRepo = new userRepository();

export default class userController {

    //USER REGISTERATION
    async registerUser(req, res) {
        try {
            const { name, email, password } = req.body;

            // Validating request data
            if (!name || !email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }

            // Calling repository method to register the user
            const isRegistered = await userRepo.registerUser(name, email, password);
            
            // Send success or error response based on repository result
            if (isRegistered) {
                res.status(201).json({success:true, message: "User registered successfully",data: isRegistered });
            } else {
                res.status(500).json({success:false, message: "User registration failed,Please check if user with this id is already registered" ,data :""});
            }
        } catch (error) {
            // Catch and log errors
            console.error("Error during user registration:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    //USER LOGIN
    async signin(req, res) {
        try {
            const { email, password } = req.body;

              // Validating request data
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }
             
            // Calling repository method to sign-in the user
            const user = await userRepo.signin(email, password);
     
            //Generate Token if valid user

            if (user) {
                //create token
                const token= jwt.sign({
                    email:user.email
                },
                process.env.SECRET_KEY,
                {
                    expiresIn :'4h'
                }
            );

            //send the token
            return res.status(200).send(token);
            } 
            else {
                // No user found, send failure response
                res.status(404).json({ message: 'Invalid credentials' });
            }
           
        } catch (error) {
            //log errors
            console.error("Error during user login:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
    //GET ALL REGISTERED USERS
    async getAllUsers(req, res) {
        try {
            //Calling Repository method to get all user 
            const users = await userRepo.getAllUsers();
            if(users){
                res.status(200).json(users);
            }
            else{
                res.status(200).json({message : "Something Went wrong to get all the users"});
            }
           
        } catch (error) {
            console.error("Error fetching all users:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    //GET A USER BY ID
    async getUserById(req, res) {
        try {
            const userId = req.params.id;
           
            // fetch user by calling repository method
            const user = await userRepo.getUserById(userId);
            
         // Send success or error response based on repository result
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }


    //UPDATE A USER
    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updatedData = req.body;

            //Calling Repository method to update a user 
            const updatedUser = await userRepo.updateUser(userId, updatedData);

              
            // Send success or error response based on repository result
            if (updatedUser) {
                res.status(200).json({ message: "User updated successfully", updatedUser });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }


    // DELETE A USER
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;

            //Calling Repository method to delete a user 
            const isDeleted = await userRepo.deleteUser(userId);
            
            // Send success or error response based on repository result
            if (isDeleted) {
                res.status(200).json({ message: "User deleted successfully" });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
