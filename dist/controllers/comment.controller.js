import { Blog } from '../models/blog.model.js';
import { Comment } from '../models/comment.model.js';
export const getComments = (request, response) => {
    const { id } = request.params;
    Blog.findById(id).populate('comments').then((result) => {
        response.status(200).json({
            success: true,
            data: result?.comments?.length > 0 ? result.comments : []
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
export const createComment = (request, response) => {
    const blogId = request.params.id;
    const { id } = request.user;
    Comment.create({
        comment: request.body.comment,
        userId: id,
        blogId
    }).then((result) => {
        Blog.findByIdAndUpdate(blogId, {
            $push: {
                comments: result.id
            }
        }, { new: true }).populate(['comments', 'author']).then((blog) => {
            const commentCreated = blog.comments.filter((singleComment) => {
                return singleComment.id === result.id;
            });
            response.status(201).json({
                success: true,
                data: commentCreated[0]
            });
        }).catch((e) => {
            response.status(403).json({
                success: false,
                errors: {
                    general: [e.message]
                }
            });
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
export const updateComment = (request, response) => {
    const commentId = request.params.id;
    Comment.findByIdAndUpdate(commentId, {
        comment: request.body.comment
    }, { new: true }).then((comment) => {
        response.status(201).json({
            success: true,
            data: comment
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
export const deleteComment = (request, response) => {
    const commentId = request.params.id;
    Blog.findOneAndUpdate({ comments: commentId }, {
        $pull: {
            comments: commentId
        }
    }).then((blog) => {
        Comment.findByIdAndDelete(commentId).then((result) => {
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
    }).catch((e) => {
        response.status(403).json({
            success: false,
            errors: {
                general: [e.message]
            }
        });
    });
};
//# sourceMappingURL=comment.controller.js.map