// import { Server } from "socket.io";

// let io;

// export const initSocket = (server) => {
//   if (!io) {
//     io = new Server(server, {
//       cors: {
//         origin: "*", // Allow all origins (adjust for production)
//       },
//     });

//     io.on("connection", (socket) => {
//       console.log("A user connected:", socket.id);

//       // Handle incoming messages
//       socket.on("sendMessage", (message) => {
//         console.log("Message received:", message);

//         // Broadcast the message to the recipient
//         io.to(message.recipientId).emit("receiveMessage", message);
//       });

//       // Handle joining a room
//       socket.on("joinRoom", (room) => {
//         socket.join(room);
//         console.log(`User joined room: ${room}`);
//       });

//       socket.on("disconnect", () => {
//         console.log("A user disconnected:", socket.id);
//       });
//     });
//   }

//   return io;
// };