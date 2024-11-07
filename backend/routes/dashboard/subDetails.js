const Media = require("../../db/mediaModel");
const User = require("../../db/userModel"); // Import user model if necessary

const subdetails = async (req, res) => {
  const { category } = req.params;
  try {
    // Aggregate media items and join with user details
    const media = await Media.aggregate([
      { $match: { categories: category } },
      { $limit: 50 },
      {
        $lookup: {
          from: "users", // Collection name of users in MongoDB
          localField: "userId", // Field in media referencing the user
          foreignField: "_id", // Field in user collection to join on
          as: "userDetails"
        }
      },
      {
        $project: {
          title: 1, // Include specific media fields here
          description: 1,
          category: 1,
          url:1,
          "userDetails.username": 1, // Include specific user fields here
          "userDetails.profileUrl": 1
        }
      }
    ]);

    // If userDetails is an array, flatten it for easier access
    const response = media.map((item) => ({
      ...item,
      userDetails: item.userDetails[0] // Assuming only one user per media item
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = subdetails;
