import { Request, Response } from 'express'
import { Blog } from '../models/blog.model.js';
import { Comment } from '../models/comment.model.js';

export const getComments = ( request: Request, response: Response ) : void => {
    const { id } : { id: string } = request.params;

    Blog.findById(id).populate('comments').then(( result ) : void => {
        response.status(200).json({
            success: true,
            data: result?.comments?.length > 0 ? result.comments : []
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

export const createComment = ( request: Request, response: Response ) : void => {
    const blogId : string = request.params.id;
    const { id } : { id: string } = request.user;

    Comment.create({
        comment: request.body.comment,
        userId: id,
        blogId
    }).then(( result ) : void => {
        Blog.findByIdAndUpdate(blogId, {
            $push: {
                comments: result.id
            }
        }, { new: true }).populate(['comments', 'author']).then( (blog) => {
            const commentCreated = blog.comments.filter( (singleComment : any) : boolean => {
                return singleComment.id === result.id
            });
            response.status(201).json({
                success: true,
                data: commentCreated[0]
            })
        }).catch((e : Error) => {
            response.status(403).json({
                success: false,
                errors: {
                    general: [e.message]
                }
            })
        })
    }).catch((e: Error) => {
        response.status(403).json({
            success: false,
            errors: {
                general: [e.message]
            }
        })
    })
}

export const updateComment = ( request: Request, response: Response ) : void => {
    const commentId = request.params.id;

    Comment.findByIdAndUpdate(commentId, {
        comment: request.body.comment
    }, {new: true}).then((comment) : void => {
        response.status(201).json({
            success: true,
            data: comment
        })
    }).catch((e: Error) => {
        response.status(403).json({
            success: false,
            errors: {
                general: [e.message]
            }
        })
    })
}

export const deleteComment = ( request: Request, response: Response ) : void => {
    const commentId: string = request.params.id;
    Blog.findOneAndUpdate({comments: commentId}, {
        $pull: {
            comments: commentId
        }
    }).then(( blog ) : void => {
        Comment.findByIdAndDelete(commentId).then((result) : void => {
            response.status(200).json({
                success: true,
                data: result
            })
        }).catch((e: Error) : void => {
            response.status(403).json({
                success: false,
                errors: {
                    general: [e.message]
                }
            })
        })  
    }).catch((e: Error) => {
        response.status(403).json({
            success: false,
            errors: {
                general: [e.message]
            }
        })
    })
}