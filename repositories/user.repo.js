import User from "../models/user.model.js";

export default class userRepository {
    
    // Register a new user
    async registerUser(name, email, password) {
        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return false;  // User already exists
            }
            
            // Create new user
            const newUser = new User({ name, email, password });
            await newUser.save();
            return newUser;  // User registered successfully
        } catch (error) {
            console.error("Error registering user:", error);
            return false;  // Registration failed
        }
    }

    // Sign in user (authentication)
    async signin(email, password) {
        try {
            // Find user by email
            const user = await User.findOne({ email });

            if (!user) {
                //returning null as we donot want to tell whether email is incorrect or password
                return null; 
              }
          
            const isMatch = await user.isValidPassword(password);

            if (!isMatch) {
                // Invalid credentials
                return null;  
            }
            // Return user if found
            return user;  
        } catch (error) {
            console.error("Error during user sign-in:", error);
            // Sign-in failed
            return null;  
        }
    }

    // Get all users
    async getAllUsers() {
        try {
            // Fetch all users
            const users = await User.find();  
            return users;
        } catch (error) {
            console.error("Error fetching all users:", error);
            return [];
        }
    }

    // Get user by ID
    async getUserById(userId) {
        try {
            // Find user by ID
            const user = await User.findById(userId);  
            return user;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            return null;
        }
    }

    // Update user details
    async updateUser(userId, updatedData) {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
            // Return updated user
            return updatedUser;  
        } catch (error) {
            console.error("Error updating user:", error);
            return null;
        }
    }

    // Delete user
    async deleteUser(userId) {
        try {
            const result = await User.findByIdAndDelete(userId);
            // Return true if deletion was successful
            return result ? true : false;  
        } catch (error) {
            console.error("Error deleting user:", error);
            return false;
        }
    }
}
