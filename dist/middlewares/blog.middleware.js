import { Blog } from '../models/blog.model.js';
export const validateBlog = (request, response, next) => {
    const errors = {
        title: [],
        content: []
    };
    /**
     * required validation
     */
    if (!request.body.title || request.body.title === "")
        errors.title.push("'title' is required.");
    if (!request.body.content || request.body.content === "")
        errors.content.push("'content' is required.");
    /**
     * length validation
     */
    if (request.title && request.title.length < 10)
        errors.title.push("'title' is too short.");
    if (request.title && request.title.length > 255)
        errors.title.push("'title' is too long.");
    if (request.content && request.content.length < 100)
        errors.title.push("'content' is too short.");
    if (errors.title.length > 0 ||
        errors.content.length > 0) {
        Object.keys(errors).map((key, index) => {
            if (errors[key].length < 1)
                delete errors[key];
        });
        response.status(403).json({
            success: false,
            errors
        });
    }
    else
        next();
};
export const verifyBlogId = (request, response, next) => {
    const { id } = request.params;
    Blog.findById(id).then((result) => {
        if (!result) {
            response.status(403).json({
                success: false,
                errors: {
                    id: ["blog not found."]
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
                id: ["blog id is not valid."]
            }
        });
    });
};
export const validateBlogUpdate = (request, response, next) => {
    const errors = {
        title: [],
        content: [],
        general: []
    };
    const { title, content } = request.body;
    /**
     * required validation
     */
    if (!title && !content)
        errors.general.push("provide 'title' or 'content' to update.");
    /**
     * length validation
     */
    if (title && title.length < 10)
        errors.title.push("'title' is too short.");
    if (title && title.length > 255)
        errors.title.push("'title' is too long.");
    if (content && content.length < 100)
        errors.content.push("'content' is too short.");
    if (errors.title.length > 0 ||
        errors.content.length > 0 ||
        errors.general.length > 0) {
        Object.keys(errors).map((key, index) => {
            if (errors[key].length < 1)
                delete errors[key];
        });
        response.status(403).json({
            success: false,
            errors
        });
    }
    else
        next();
};
//# sourceMappingURL=blog.middleware.js.map