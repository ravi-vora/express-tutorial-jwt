import { Request, Response } from 'express'
import { UserSchema } from '../config/user.config.js'
import { genPassword, issueJWT } from '../helpers/utils.helper.js'
import { User } from '../models/user.model.js'

export const registerUser = (request: Request, response: Response) : void => {
    const user : UserSchema = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        phone: request.body.phone,
        password: request.body.password
    }

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
    User.create(user).then((result) : void => {
        // creted jwt token
        const jwt = issueJWT(result.id);
        response.cookie("token", jwt.token)
        response.cookie("expires", jwt.expires)
        response.header('authorization', jwt.token);
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
        })
    }).catch( (e: Error) : void => {
        if(e["errors"]["email"]?.message) {
            response.status(403).json({
                success: false,
                errors: {
                    email: [e["errors"]["email"].message]
                }
            })
        } else if (e["errors"]["phone"]?.message) {
            response.status(403).json({
                success: false,
                errors: {
                    email: [e["errors"]["phone"].message]
                }
            })
        } else {
            response.status(500).json({
                success: false,
                errors: {
                    general: [e.message]
                }
            })
        }
    })
}

export const sendAuthUser = (request: Request, response: Response) : void => {
    const user = request.user;
    if(user) {
        response.status(200).json({
            success: true,
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            }
        })
    } else {
        response.status(403).json({
            success: false,
            errors: {
                general: ["you've been registered. but user is missing in our ledger."]
            }
        })
    }
}