import express from 'express'
import { UserController } from './user.contoller';

const router = express.Router();

router.get(
    "/",
    UserController.getAllFormDB
)

router.get(
    "/:id",
    UserController.getUserById
)

router.post(
    "/",
    UserController.createUser
)


export const userRouter = router;
