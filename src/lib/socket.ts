// src/lib/socket.ts
import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export function getSocket() {
  if (!socket) {
    socket = io(window.location.origin, {
      path: '/api/socket',           // ← must match server
      transports: ['websocket','polling'],
    })
  }
  return socket
}
