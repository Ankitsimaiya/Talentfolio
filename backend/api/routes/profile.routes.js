import express from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  homeMedia,
  getUserWithFullProfileById,
} from "../controllers/profile.controllers.js";

import { authenticate ,authorize} from "../middleware/auth.middleware.js";
import upload  from "../middleware/multer.js";
import { profilePhotoUpload } from "../controllers/user.controllers.js";


const router = express.Router();

router.post("/", authenticate, createProfile);
router.get("/", authenticate, getProfile);
router.put("/", authenticate, updateProfile);
router.delete("/", authenticate, deleteProfile);
router.post(
  "/profile-photo",
  authenticate,
  authorize("user", "admin"),
  upload.fields([{ name: "profile", maxCount: 1 }]),
  profilePhotoUpload
);;
router.get('/home', homeMedia);               // GET /api/media/home
// router.get('/category/:category', subdetails)
router.get('/:id', getUserWithFullProfileById
)

export default router;
