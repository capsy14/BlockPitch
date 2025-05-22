// global.d.ts
import { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'
import { NextApiResponse } from 'next'

declare module 'next' {
  interface NextApiResponse<T = any> {
    socket: HTTPServer & { io?: IOServer }
  }
}
