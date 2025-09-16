import express from 'express';
import { PostController } from './post.controller';

const router = express.Router();
router.get("/stats", PostController.getBlogStat)


router.get("/", PostController.getAllPosts)
router.get("/:id", PostController.getPostById)
router.post("/", PostController.createPost)
router.patch("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);


// update post
// delete post

export const postRouter = router;

