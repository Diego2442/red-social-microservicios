// src/sockets/socketHandler.ts
import { Server, Socket } from 'socket.io'
import { countLikesByPost } from '../utilities/post'

export default function socketHandler(io: Server) {
    io.on('connection', (socket: Socket) => {
        console.log('🔌 Nuevo cliente conectado:', socket.id)

        //Contar los likes por post
        socket.on('get_likes', async (postId: number) => {
            try {
                const likeCount = await countLikesByPost(postId)
                // Enviar a todos los usuario
                io.emit('likes_count', { postId, likeCount })
            } catch (error) {
                console.error('Error al contar likes:', error)
                socket.emit('likes_count_error', { postId, error: 'No se pudo obtener el conteo' })
            }

        })

        // Manejar eventos personalizados
        socket.on('mensaje', (data) => {
            console.log('mensaje recibido:', data)
            io.emit('mensaje', data) // broadcast a todos
        })

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id)
        })
    })
}