import express from 'express'
import { UserController } from './user.contoller';

const router = express.Router();

router.post(
    "/",
    UserController.createUser
)


export const userRouter = router;
