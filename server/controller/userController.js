const mongoose = require('mongoose');
const User = require('../models/User');
const UsersChat = require('../models/UsersChat');
const {searchUsers} = require('../utils/searchUser');

const ChangeProfile = async (req,res)=>{
    try{
        const userId = req.params.id;
        const {username,avatar} = req.body;
        if(!username||!avatar){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        user.username = username;
        user.avatar = avatar;
        await user.save();
        return res.status(200).json({message:"Profile updated successfully"})
    }catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }
}       
const FindUserEmail = async (req,res)=>{
    try{
        const userId = req.params.email;
        const user = await User.findOne({email:userId});
        if(!user){
            return res.status(200).json(null)
        }
        return res.status(200).json({
            displayname:user.displayname,
            _id:user._id,
            avatar:user.avatar,
            email:user.email,
        })
    }catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }
}
const FindUserByID = async (req,res)=>{
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json(null)
        }
        return res.status(200).json({
            displayname:user.displayname,
            _id:user._id,
            avatar:user.avatar,
            email:user.email,
        })
    }catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }
}
const FindUserSearch =async(req,res)=> {
    const query = req.params.query;
    try {
      if (!query) {
        return res.status(400).json({ error: 'Query parameter is required.' });
      }
      const users = await searchUsers(query);
      return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Error searching users.' });
    }
};
const GetFriends = async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Find all personal chats where the user is involved
        const userChats = await UsersChat.findOne({ user_id: userId }).populate('chats.chat_id');
        
        if (!userChats || !userChats.chats) {
            return res.status(404).json({ message: 'No chats found for the user' });
        }
        // Filter out the friends (users involved in personal chats)
        const friends = userChats.chats
            .filter(chat => chat.type === 'personal' && chat.isActive)
            .map(chat => {
                // The user we are chatting with will be in the chat but not the current user
                const friend = chat.chat_id.members.find(friend => friend.toString() !== userId.toString());
                return friend ? friend._id : null;
            })
            .filter(friendId => friendId !== null); // Remove any null values
        
        // Return the list of friends
        return res.status(200).json({ friends });
        
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {

    ChangeProfile,
    FindUserEmail,
    FindUserByID,
    FindUserSearch,
    GetFriends
};
