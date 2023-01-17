import mongoose from 'mongoose';
import { Blog } from '../models/blog.model.js';
export const createBlog = (request, response) => {
    const user = request.user;
    const blog = {
        title: request.body.title,
        content: request.body.content,
        author: user.id
    };
    Blog.create(blog).then((result) => {
        response.status(201).json({
            success: true,
            data: result
        });
    }).catch((e) => {
        console.log(e.message);
        if (e["errors"]["title"]?.message) {
            response.status(403).json({
                success: false,
                errors: {
                    title: [e["errors"]["title"].message]
                }
            });
        }
        else {
            response.status(403).json({
                success: false,
                errors: {
                    general: [e.message]
                }
            });
        }
    });
};
export const getBlog = (request, response) => {
    const { id } = request.params;
    if (id) {
        Blog.findById(id).populate("author").then((result) => {
            response.status(200).json({
                success: true,
                data: result
            });
        }).catch((e) => {
            response.status(403).json({
                success: false,
                errors: {
                    general: e.message
                }
            });
        });
    }
    else {
        Blog.find({ author: new mongoose.Types.ObjectId(request.user.id) }).populate("author").then((result) => {
            response.status(200).json({
                success: true,
                data: result
            });
        }).catch((e) => {
            response.status(403).json({
                success: false,
                errors: {
                    general: e.message
                }
            });
        });
    }
};
export const updateBlog = (request, response) => {
    const { id } = request.params;
    const { title, content } = request.body;
    const newDocument = {};
    if (title)
        newDocument['title'] = title;
    if (content)
        newDocument['content'] = content;
    Blog.findByIdAndUpdate(id, newDocument, { new: true }).populate("author").then((result) => {
        response.status(201).json({
            success: true,
            data: result
        });
    }).catch((e) => {
        if (e["errors"]["title"]?.message) {
            response.status(403).json({
                success: false,
                errors: {
                    title: [e["errors"]["title"].message]
                }
            });
        }
        else {
            response.status(403).json({
                success: false,
                errors: {
                    general: [e.message]
                }
            });
        }
    });
};
export const deleteBlog = (request, response) => {
    const { id } = request.params;
    Blog.findByIdAndDelete(id).populate("author").then((result) => {
        response.status(200).json({
            success: true,
            data: result
        });
    }).catch((e) => {
        response.status(403).json({
            success: false,
            errors: {
                general: [e.message]
            }
        });
    });
};
//# sourceMappingURL=blog.controller.js.map