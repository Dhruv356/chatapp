import { text } from "express";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from '../lib/cloudinary.js';
import { getReceiverSocketId, io} from "../lib/temp.js";
export const getUserForSidebar = async (req, res) => {

    try {
        const loggedInUserId= req.user._id;
        const filterUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        res.status(200).json(filterUsers);
    } catch (error) {
        console.log("error in getUserForSidebar controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId }
      ]
    }).sort({ createdAt: 1 }); // Sort messages by oldest first

    res.status(200).json(messages);  // Send messages back to client
  } catch (error) {
    console.log("error in getMessages controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params; // fixed typo here
        const senderId = req.user._id;

        let imageurl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageurl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId,       // Use senderId here
            receiverId,     // Use receiverId here
            text,
            image: imageurl,
        });
        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("error in sendMessage controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
