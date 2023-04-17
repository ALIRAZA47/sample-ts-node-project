import CustomException from '../utils/global/customException'
import { NextFunction, Request, Response } from 'express'
import UserService from '../services/user'
import { FORBIDDEN } from '../constants/statusCodes'

// import * as passport from 'passport'
import { authMiddleware } from '../constants/ExcludedRoutes.json'

const jwt = require('jsonwebtoken')

const authenticationMiddleware = async function authentication(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const excludedRoutes = authMiddleware[req.method]

    const reqUrl = req.originalUrl
    if (
        excludedRoutes &&
        excludedRoutes.length &&
        excludedRoutes.includes(reqUrl)
    ) {
        return next()
    } else {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '')
            if (!token)
                return next(
                    new CustomException(
                        FORBIDDEN,
                        'Token is not present in the Authorization Header!'
                    )
                )
            const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
            req['user'] = await UserService.getById(decoded.id)
            return next()
        } catch (error) {
            return next(
                new CustomException(FORBIDDEN, 'Invalid or expired token!')
            )
        }
        // passport.authenticate(
        //     'oauth-bearer',
        //     { session: false },
        //     function (err, user, info) {
        //         if (err || !user) {
        //             next(new CustomException(403, info))
        //         }
        //         req.user = user // Forward user information to the next middleware
        //         next()
        //     }
        // )(req, res, next)
    }
}

export default authenticationMiddleware
