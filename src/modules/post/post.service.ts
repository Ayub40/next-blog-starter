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

const getAllPost = async () => {
    const result = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            thumbnail: true,
            isFeatured: true,
            tags: true,
            views: true,
            authorId: true,
            // author: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            createdAt: true,
            updatedAt: true
        },
        orderBy: {
            createdAt: "asc"
        }
    });
    return result;
}

const getPostById = async (id: number) => {
    const result = await prisma.post.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            title: true,
            content: true,
            thumbnail: true,
            isFeatured: true,
            tags: true,
            views: true,
            authorId: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            createdAt: true,
            updatedAt: true,
        }
    })
    return result;
}

export const PostService = {
    createPost,
    getAllPost,
    getPostById
}