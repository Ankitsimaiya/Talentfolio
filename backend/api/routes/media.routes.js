import express from "express";
import {
  createMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
  incrementView,
  likeMedia,
  uploadMedia,
  getMediaDetailsWithRecommendations,
  searchMediaByTitle,
} from "../controllers/media.controllers.js";

import { authenticate } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", authenticate,createMedia);
router.get("/", getAllMedia);
router.get("/:id", getMediaById);
router.put("/:id", updateMedia);
router.delete("/:id", authenticate,deleteMedia);
router.get('/media/:mediaId', getMediaDetailsWithRecommendations)
router.patch("/:id/view", incrementView);
router.patch("/:id/like", likeMedia);
router.get('/search', searchMediaByTitle);
router.post(
  "/upload",
  upload.fields([{ name: "media", maxCount: 1 }]),
  uploadMedia
);

export default router;
