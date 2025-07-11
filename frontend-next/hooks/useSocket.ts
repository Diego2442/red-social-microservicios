import { useCallback, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

interface UseSocketReturn {
  socket: Socket | null
  onLine: boolean
  conectarSocket: () => void
  desconectarSocket: () => void
}

// Mantener una sola instancia de socket global
let socketGlobal: Socket | null = null

export const useSocket = (serverPath: string): UseSocketReturn => {
  const [onLine, setOnLine] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)

  const conectarSocket = useCallback(() => {
    if (!socketGlobal) {
      const token =
        localStorage.getItem('token') || getCookie('token') || ''

      socketGlobal = io(serverPath, {
        transports: ['websocket'],
        autoConnect: true,
        forceNew: false, // ✅ importante
        query: {
          'x-token': token,
        },
      })
    }

    setSocket(socketGlobal)
  }, [serverPath])

  const desconectarSocket = useCallback(() => {
    if (socketGlobal) {
      socketGlobal.disconnect()
      socketGlobal = null
      setSocket(null)
    }
  }, [])

  useEffect(() => {
    if (!socketGlobal) return

    const handleConnect = () => setOnLine(true)
    const handleDisconnect = () => setOnLine(false)

    socketGlobal.on('connect', handleConnect)
    socketGlobal.on('disconnect', handleDisconnect)

    return () => {
      socketGlobal?.off('connect', handleConnect)
      socketGlobal?.off('disconnect', handleDisconnect)
    }
  }, [])

  return {
    socket,
    onLine,
    conectarSocket,
    desconectarSocket,
  }
}
