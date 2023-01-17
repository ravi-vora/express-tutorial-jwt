import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { BlogSchema } from '../config/blog.config.js';
import { Blog } from '../models/blog.model.js';


export const createBlog = (request: Request, response: Response) : void => {
    const user = request.user;
    const blog: BlogSchema = {
        title: request.body.title,
        content: request.body.content,
        author: user.id
    }

    Blog.create(blog).then( ( result ) : void => {
        response.status(201).json({
            success: true,
            data: result
        })
    }).catch( (e : Error) => {
        console.log(e.message)
        if(e["errors"]["title"]?.message) {
            response.status(403).json({
                success: false,
                errors: {
                    title: [e["errors"]["title"].message]
                }
            })
        } else {
            response.status(403).json({
                success: false,
                errors: {
                    general: [e.message]
                } 
            })
        }
    })
}

export const getBlog = (request: Request, response: Response) : void => {
    const { id } : { id: string } = request.params;
    if (id) {
        Blog.findById(id).populate("author").then( (result) : void => {
            response.status(200).json({
                success: true,
                data: result
            })
        }).catch( ( e: Error ) => {
            response.status(403).json({
                success: false,
                errors: {
                    general: e.message
                }
            })
        })
    } else {
        Blog.find({ author: new mongoose.Types.ObjectId(request.user.id) }).populate("author").then( (result) : void => {
            response.status(200).json({
                success: true,
                data: result
            })
        }).catch( ( e: Error ) => {
            response.status(403).json({
                success: false,
                errors: {
                    general: e.message
                }
            })
        })
    }
}

export const updateBlog = (request: Request, response: Response) : void => {
    const { id } : { id: string } = request.params;
    const {
        title,
        content
    } : { title: string, content: string } = request.body;

    const newDocument = {}
    if ( title ) newDocument['title'] = title;
    if ( content ) newDocument['content'] = content;

    Blog.findByIdAndUpdate(id, newDocument, { new: true }).populate("author").then( (result) : void => {
        response.status(201).json({
            success: true,
            data: result
        })
    }).catch( (e : Error) : void => {
        if(e["errors"]["title"]?.message) {
            response.status(403).json({
                success: false,
                errors: {
                    title: [e["errors"]["title"].message]
                }
            })
        } else {
            response.status(403).json({
                success: false,
                errors: {
                    general: [e.message]
                } 
            })
        }
    })
}

export const deleteBlog = (request: Request, response: Response) : void => {
    const { id } : { id: string } = request.params;

    Blog.findByIdAndDelete(id).populate("author").then( (result) : void => {
        response.status(200).json({
            success: true,
            data: result
        })
    }).catch(( e: Error ) : void => {
        response.status(403).json({
            success: false,
            errors: {
                general: [e.message]
            }
        })
    })
}