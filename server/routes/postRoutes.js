import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import controller from '../controllers/postController.js'
import { verifyToken } from '../middleware/auth.js'
import Post from '../mongodb/models/Post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt, photo, username, postUserId, userImage, likes } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      prompt,
      photo: photoUrl.url,
      username,
      postUserId,
      userImage,
      likes
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});

router.get('/:postUserId/posts', verifyToken, controller.getUserPosts);
router.get('/:userId/liked', verifyToken, controller.getUserLikes);
router.patch("/:userId/edit", verifyToken, controller.editUserPosts);
router.patch("/:id/:like", verifyToken, controller.likePost);

export default router;