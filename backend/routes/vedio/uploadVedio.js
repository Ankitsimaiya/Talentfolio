const uploadOnCloudinary = require("../../cloudinary/cloudinary.js");
const Media = require("../../db/mediaModel.js");

async function uploadVedio(req, res) {
  const { id } = req.body.user;
  const { title, description, categories } = req.body;

 if(!id || !title  || !categories)return res.json({message : "please enter valid credentials" })

//   console.log(req.body);

  const imagePath = req.files?.image[0].path;
  const media = await uploadOnCloudinary(imagePath);


  if(!media ) return  res.json({message : "please upload vedio/image" })
    // console.log("url", media.secure_url)
    // console.log("type" ,media.resource_type)
  console.log("media",media)

    const user = await Media.create({
        userId : id,
        title:title,
        description:description,
        categories: categories,
        mediaType: media.resource_type,
        url : media.secure_url
    })
 

res.status(200).json({message:"media uploaded successfully"})


}

module.exports = uploadVedio;
