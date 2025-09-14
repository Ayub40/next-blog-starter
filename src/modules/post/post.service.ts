import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

// ekhane "Promise<Post>" eta te Post ta deoa hoyse ,, karon Post return korbe
const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    const result = await prisma.post.create({
        data: payload,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })

    return result;
}

export const PostService = {
    createPost
}