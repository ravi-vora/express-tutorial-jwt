import mongoose from "mongoose"

export interface BlogError {
    title: string[],
    content: string[],
    general?: string[]
}

export interface Author {
    userId: string
}

export interface BlogSchema {
    title: string,
    content: string,
    author: mongoose.Types.ObjectId
}