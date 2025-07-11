import {Request, Response} from 'express'
import User from '../models/User'
import { checkPassword } from '../utilities/auth'
import { generateJWT } from '../utilities/jwt'

export class AuthController {

    static login = async (req: Request, res: Response) => {
        const {user_name, password} = req.body

        const user = await User.findOne({
            where: {user_name}
        })
        //console.log(user)
        if(!user){
            const error = new Error('Usuario no encontrado')
            return res.status(404).json({error: error.message})
            
        }

        const isPasswordCorrect = await checkPassword(password, user.password)
        if(!isPasswordCorrect){
            const error = new Error('Datos de usuario incorrectos')
            return res.status(401).json({error: error.message})
        }

        const token = generateJWT(user.id)
        res.json({token})
    }

    static getUser = async (req: Request, res: Response) => {
        res.json(req.user)
    }

    static profileUser = async (req: Request, res: Response) => {
        res.json(req.userProfile)
    }
}