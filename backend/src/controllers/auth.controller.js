import cloudinary from '../lib/cloudinary.js';
import { generateToken } from '../lib/util.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const Signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            // You can handle response here
           
            generateToken(newUser._id, res); // Generate token and set cookie
            await newUser.save(); // Save the user to the database
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
               profilePic: newUser.profilePic,
                
            });    
        } else {
            res.status(400).json({ message: "invalid user data" });
        }

    } catch (err) {
        // You can handle error here
        console.log("error in signup controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const Login = async (req, res) => {

    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({ message: 'invalid credentials' });
        }
        
        const ispasswordMatched = await bcrypt.compare(password, user.password);
        if (!ispasswordMatched) {
            return res.status(400).json({ message: 'invalid email or password' });
        }
        generateToken(user._id, res); // Generate token and set cookie

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({ message: "Internal server error" });
        
    }
};

export const Logout = (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0})
     res.status(200).json({message: "user logged out successfully"})
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: 'Please provide a profile picture' });
    }

    // Upload base64 or url string to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: 'profile_pics', // optional folder
      overwrite: true,
      resource_type: 'image',
    });

    // Update user profilepic with secure_url
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error in updateProfile controller:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
        
    } catch (error) {
        console.log("error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}