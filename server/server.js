const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" }  // Allow frontend to connect
});

let content = ""; // Shared text content

// Handle new user connections
io.on("connection", (socket) => {
    console.log("New user connected");

    // Send existing content to new users
    socket.emit("loadContent", content);

    // Listen for text updates
    socket.on("updateContent", (newContent) => {
        content = newContent;
        socket.broadcast.emit("updateContent", newContent);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));