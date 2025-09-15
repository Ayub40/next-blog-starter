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

// for pagination 
const getAllPost = async ({
    page = 1,
    limit = 10,
    search,
    isFeatured
}: {
    page?: number,
    limit?: number,
    search?: string,
    isFeatured?: boolean
}) => {
    console.log({ page, limit });

    const skip = (page - 1) * limit;
    console.log({ isFeatured });

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } }
                ]

            },
            typeof isFeatured === "boolean" && { isFeatured },
            // (tags && tags.length > 0) && { tags: { hasEvery: tags } }
        ].filter(Boolean)
    }

    const result = await prisma.post.findMany({
        skip, take: limit, where


        // select: {
        //     id: true,
        //     title: true,
        //     content: true,
        //     thumbnail: true,
        //     isFeatured: true,
        //     tags: true,
        //     views: true,
        //     authorId: true,
        //     author: {
        //         select: {
        //             id: true,
        //             name: true,
        //             email: true
        //         }
        //     },
        //     createdAt: true,
        //     updatedAt: true
        // },
        // orderBy: {
        //     createdAt: "asc"
        // }
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

const updatePost = async (id: number, data: Partial<any>) => {
    return prisma.post.update({ where: { id }, data });
};

const deletePost = async (id: number) => {
    return prisma.post.delete({ where: { id } });
};

export const PostService = {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost
}

