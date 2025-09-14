import express from 'express';
import { PostController } from './post.controller';

const router = express.Router();

// get all posts
router.get(
    "/",
    PostController.getAllPost
)

router.get(
    "/:id",
    // UserController.getUserById
    PostController.getPostById
)

router.post(
    "/",
    PostController.createPost
)


// get single post
// update post
// delete post

export const postRouter = router;

