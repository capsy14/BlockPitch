// src/lib/socket.ts
import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export function getSocket() {
  if (typeof window === "undefined") {
    // Optionally: throw an error or return null if called on server
    throw new Error("getSocket() must be called on the client");
  }
  if (!socket) {
    socket = io(window.location.origin, {
      path: '/api/socket',
      transports: ['websocket','polling'],
    })
  }
  return socket
}
