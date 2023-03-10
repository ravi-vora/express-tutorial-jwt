import { Request, Response } from 'express'
import { AuthUserError, UserError } from '../config/user.config.js'
import { validateEmail, validatePhone, verifyJwt } from '../helpers/utils.helper.js'
import { User } from '../models/user.model.js'

export const validateUser = (request: Request, response: Response, next: () => void) : void => {
    const errors : UserError = {
        firstName: [],
        lastName: [],
        email: [],
        phone: [],
        password: [],
        confirmPassword: []
    }

    /**
     * required validation
     */
    if ( !request.body.firstName || request.body.firstName === "" ) errors.firstName.push("'firstName' is required.")
    if ( !request.body.lastName || request.body.lastName === "" ) errors.lastName.push("'lastName' is required.")
    if ( !request.body.email || request.body.email === "" ) errors.email.push("'email' is required.")
    if ( !request.body.phone || request.body.phone === "" ) errors.phone.push("'phone' is required.")
    if ( !request.body.password || request.body.password === "" ) errors.password.push("'password' is required.")
    if ( !request.body.confirmPassword || request.body.confirmPassword === "" ) errors.confirmPassword.push("'confirmPassword' is required.")

    /**
     * length validation
     */
    if( request.body.firstName && request.body.firstName.length > 10) errors.firstName.push("'firstName' is too long. allowed -> < 10")
    if( request.body.firstName && request.body.firstName.length < 2) errors.firstName.push("'firstName' is too short. allowed -> > 2")
    
    if( request.body.lastName && request.body.lastName.length > 10) errors.lastName.push("'lastName' is too long. allowed -> < 10")
    if( request.body.lastName && request.body.lastName.length < 2) errors.lastName.push("'lastName' is too short. allowed -> > 2")

    if( request.body.password && request.body.password.length > 14) errors.password.push("'password' is too long. allowed -> < 14")
    if( request.body.password && request.body.password.length < 8) errors.password.push("'password' is too short. allowed -> > 8")

    /**
     * format validation
     */
    if( request.body.email && !validateEmail(request.body.email) ) errors.email.push("'email' is invalid.")
    if( request.body.phone && !validatePhone(request.body.phone) ) errors.phone.push("'phone' is invalid.")
    if( request.body.password && request.body.confirmPassword && request.body.password !== request.body.confirmPassword)
        errors.confirmPassword.push("'confirmPassword' does not match with password.")

    if (
        errors.firstName.length > 0 ||
        errors.lastName.length > 0 ||
        errors.email.length > 0 ||
        errors.phone.length > 0 ||
        errors.password.length > 0 ||
        errors.confirmPassword.length > 0 
    ) {
        Object.keys(errors).map( (key: string, index: number) : void => {
            if (errors[key].length < 1) delete errors[key];
        })
        response.status(403).json({
            success: false,
            errors: errors
        });
    } else next();
}

export const verifyUser = (request: Request, response: Response, next: () => void) : void => {
    const checkUser = verifyJwt(request.headers['authorization']);
    
    if(!checkUser.validate) {
        response.status(401).json({
            success: false,
            errors: {
                authorization: [checkUser.message]
            }
        })
    } else {
        User.findById(checkUser.id).then((result) : void => {
            request.user = result;
            next();
        }).catch((e: Error) => {
            response.status(403).json({
                success: false,
                errors: {
                    general: [e.message]
                }
            })
        })
    }
}

export const validateAuthUser = (request: Request, response: Response, next: () => void) : void => {
    const errors: AuthUserError = {
        email: [],
        password: []
    }

    /**
     * require validation
     */
    if ( !request.body.email || request.body.email === "" ) errors.email.push("'email' is required");
    if ( !request.body.password || request.body.password === "" ) errors.password.push("'password' is required");

    /**
     * format validation
     */
    if ( request.body.email && !validateEmail(request.body.email) ) errors.email.push("'email' is invalid");


    if (
        errors.email.length > 0 ||
        errors.password.length > 0
    ) {
        Object.keys(errors).map( (key: string, index: number) : void => {
            if (errors[key].length < 1) delete errors[key];
        })
        response.status(403).json({
            success: false,
            errors
        })
    } else next();
}