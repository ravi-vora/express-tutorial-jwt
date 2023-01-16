import { genPassword, issueJWT } from '../helpers/utils.helper.js';
import { User } from '../models/user.model.js';
export const registerUser = (request, response) => {
    const user = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        phone: request.body.phone,
        password: request.body.password
    };
    /**
     * encrypt password
     */
    const encrypted = genPassword(user.password);
    user['hash'] = encrypted.hash;
    user['salt'] = encrypted.salt;
    delete user['password'];
    /**
     * creting new document of User
     */
    User.create(user).then((result) => {
        // creted jwt token
        const jwt = issueJWT(result.id);
        response.cookie("token", jwt.token);
        response.cookie("expires", jwt.expires);
        response.status(201).json({
            success: true,
            data: {
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                phone: result.phone,
                token: jwt.token,
                expires: jwt.expires
            }
        });
    }).catch((e) => {
        if (e["errors"]["email"]?.message) {
            response.status(403).json({
                success: false,
                errors: {
                    email: [e["errors"]["email"].message]
                }
            });
        }
        else if (e["errors"]["phone"]?.message) {
            response.status(403).json({
                success: false,
                errors: {
                    email: [e["errors"]["phone"].message]
                }
            });
        }
        else {
            response.status(500).json({
                success: false,
                errors: {
                    general: [e.message]
                }
            });
        }
    });
};
export const sendAuthUser = (request, response) => {
    response.status(200).json(request.user);
};
//# sourceMappingURL=user.controller.js.map