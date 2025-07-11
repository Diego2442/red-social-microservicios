import {Request, Response} from 'express'
import Post from '../models/Post'
import User from '../models/User'
import Like from '../models/Like'

export class PostController {


    static create = async (req: Request, res: Response) => {
        try {
            const post = await Post.create(req.body)
            post.user_id = req.user.id
            await post.save()
            res.status(201).json({message: 'Post creado'})
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }


    static getAll = async (req: Request, res: Response) => {
        try {

            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 10
            const offset = (page - 1) * limit

            const {count, rows} = await Post.findAndCountAll({
                limit,
                offset,
                order: [
                    ['createdAt', 'DESC']
                ]
            })

            return res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            posts: rows
        })
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }


    static giveLike = async (req: Request, res: Response) => {
        try {
            const user_id = req.user.id
            const post = await Post.findByPk(req.body.post_id) 
            if(!post){
                return res.status(404).json({error: 'No se encontró el post'})
            } 
            const post_id = post.id
            const likeExists = await Like.findOne({where: {user_id, post_id}})

            if(likeExists) {
                await likeExists.destroy()
                return res.status(200).json({ message: 'Unlike exitoso' })
            } else {

                await Like.create({ user_id, post_id })
                return res.status(201).json({ message: 'Like exitoso' })
            }
            
            //console.log({user_id, post_id})
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

}