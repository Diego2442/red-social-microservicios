import { NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { param, validationResult } from 'express-validator'

declare global {
    namespace Express {
        interface Request {
            user?: User
            userProfile?: User
        }
    }
}


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const bearer = req.headers.authorization

        if(!bearer) {
            const error = new Error('No estas autorizado')
            res.status(401).json({error: error.message})
            return
        } 

        const [, token] = bearer.split(' ')

        if (!token){
            const error = new Error('Token no válido')
            res.status(401).json({error: error.message})
            return
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            //Se coloca esta comprobación debido a que typescript no sabe cual es el valor que retorna ese jwt.verify entonces no puede inferirlo
            if(typeof decode === 'object' && decode.id){
                req.user = await User.findByPk(decode.id, {
                    attributes: ['id', 'user_name', 'full_name', 'birth_date']
                })
                next()
            }
        } catch (error) {
            res.status(500).json({error: 'Token no válido'})
        }


} 


export const validateUserId = async (req: Request, res: Response, next: NextFunction) => {
    await param('userId')
        .isInt().withMessage('Id no válido')
        .bail()
        .custom(value => value > 0).withMessage('Id no válido')
        .bail()
        .run(req)
    
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
    next()
}


export const validateUserExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId} = req.params
        const user = await User.findByPk(userId, {
            attributes: ['id', 'user_name', 'full_name', 'birth_date']
        })

        if(!user){
            const error = new Error('Usuario no encontrado')
            res.status(404).json({error: error.message})
            return
        }

        req.userProfile = user
        next()
    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}