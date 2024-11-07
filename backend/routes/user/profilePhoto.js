const uploadOnCloudinary = require("../../cloudinary/cloudinary");
const User = require("../../db/userModel");

async function profilePhoto(req,res) {
    console.log("useer", req.body)
    const {id} = req.user
    
    const imagePath = req.files?.profile[0].path;
 
    if(!id) return res.json({message : "User Not Logged in"})

    try {
        const media = await uploadOnCloudinary(imagePath);
        console.log("media",media)
       const user =  await User.updateOne({_id:id},{
        profileUrl : media.secure_url
       }) 
        res.status(200).json({message : "Profile Photo Unloaded"})
    } catch (error) {
        return res.status(402).json({message : "error in uploading image"})
    }

}

module.exports = profilePhoto