import { Comment } from '../models/comment.model.js';
export const validateComment = (request, response, next) => {
    const errors = {
        comment: []
    };
    /**
     * require validation
     */
    if (!request.body.comment || request.body.comment === "")
        errors.comment.push("'comment' is required");
    /**
     * length validation
     */
    if (request.body?.comment?.length > 1000)
        errors.comment.push("'comment' is too long");
    if (errors.comment.length > 0) {
        response.status(403).json({
            success: false,
            errors
        });
    }
    else
        next();
};
export const verifyCommentId = (request, response, next) => {
    const { id } = request.params;
    Comment.findById(id).then((result) => {
        if (!result) {
            response.status(403).json({
                success: false,
                errors: {
                    id: ["comment not found."]
                }
            });
        }
        else {
            next();
        }
    }).catch((e) => {
        response.status(403).json({
            successs: false,
            errors: {
                id: ["comment id is not valid."]
            }
        });
    });
};
//# sourceMappingURL=comment.middleware.js.map