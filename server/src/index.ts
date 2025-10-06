import Express  from "express";
import cookieParser from 'cookie-parser';
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/authRoutes";

dotenv.config()


const app = Express();
const HOST = process.env.HOST as string;
const HOST2 = process.env.HOST2 as string;
const server = http.createServer(app);
app.use(cors({
  origin: [
    HOST,
    HOST2
  ],
  methods: ["GET", "POST"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Set-Cookie','X-Requested-With']
}));

// Trust Vercel proxy - add this early
app.set('trust proxy', 1);

// Handle preflight requests explicitly
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie, Set-Cookie, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).send();
});

const io = new Server(server, {
    cors: {
        origin: [HOST, HOST2],
        credentials: true,
        methods: ["GET", "POST"] 
    }
});
const PORT = process.env.PORT;


app.use(Express.json());
app.use(Express.static('public'));
app.use(cookieParser());

// Add this before your router
app.get('/api/test-cors', (req, res) => {
  res.json({ 
    message: 'CORS is working!',
    timestamp: new Date().toISOString(),
    origin: req.headers.origin
  });
});

app.use("/api", router);


const connectedUsers = new Map(); // Map<socketId, User>
const roomUsers = new Map(); // Map<roomName, Set<socketId>>
const roomMessages = new Map();

io.on("connection", socket => {
    // console.log(socket.id, "This user is authenticated and connected");

    socket.on('user-authenticated', (userData) => {

    // Store user information
    const user = {
      id: userData.id,
      socketId: socket.id,
      nickName: userData.nickName,
      role: userData.role,
      isOnline: true,
      joinedAt: new Date()
    };

    connectedUsers.set(socket.id, user);
    
    // Broadcast updated users list to all clients
    broadcastUsersList();

    })

    socket.on("JoinChat", (room) => {
        
        // Check if room exists in the Map, if not create a new Set for it
        if (!roomUsers.has(room)) {
            // console.log(`Creating new room: ${room}`);
            roomUsers.set(room, new Set());
        }

        const usersInRoom = roomUsers.get(room);

        // Check if user already in THIS SPECIFIC ROOM
        if (usersInRoom.has(socket?.id)) {
            socket.emit("joinError", "Already in this room");
            return;
        }

        socket.join(room);
        // console.log(`${socket?.id} has joined the ${room} chat`);


        // Send message history to the joining user
        if (roomMessages.has(room)) {
            const history = roomMessages.get(room);
            // console.log(`Sending ${history.length} messages to user ${socket.id}`);
            socket.emit('room-history', {
                roomId: room,
                messages: history
            });
        } else {
            // // Initialize empty message array for new room
            // roomMessages.set(room, []);
            // socket.emit('room-history', {
            //     roomId: room,
            //     messages: []
            // });
        }

        usersInRoom.add(socket?.id);

        // Get user info from connectedUsers
        // const userInfo = connectedUsers.get(socket.id);
        
        socket.emit("joinSuccess", room);
        
        roomUsers.get(room).add(socket.id);
        updateRoomUsers(room);

        // ✅ FIX: Convert Set to array of user objects
        const usersArray = Array.from(usersInRoom).map(socketId => {
            return connectedUsers.get(socketId) || { socketId, nickName: 'Unknown' };
        }).filter(user => user !== undefined); // Remove undefined users

        // ✅ FIX: Send proper user objects
        io.to(room).emit('room-users-update', {
            room: room,
            users: usersArray
        });
    })

     socket.on('sentChat', (messageData) => {
        try {

            // AUTO-JOIN: If sender is not in the room, join them first
            if (!socket.rooms.has(messageData.room)) {
                // console.log(`Auto-joining socket ${socket.id} to room ${messageData.room}`);
                socket.join(messageData.room);
            }
            
            // Store message in room history
            if (!roomMessages.has(messageData.room)) {
                roomMessages.set(messageData.room, []);
            }


            // Add message to room history
            //Only push once with unique ID
            const messageWithId = {
                ...messageData,
                id: Date.now() + Math.random().toString(36), // Add unique ID
                timestamp: new Date().toISOString()
            };

            //Push only once
            roomMessages.get(messageData.room).push(messageWithId);
            
            // Limit history size
            //Limit history size (use the same array reference)
            const currentMessages = roomMessages.get(messageData.room);
            if (currentMessages.length > 500) {
                roomMessages.set(messageData.room, currentMessages.slice(-500));
            }

        
            // Broadcast to everyone in the room INCLUDING sender
            io.to(messageData.room).emit('recieveChat', messageWithId);
        } catch (error) {
            console.error('Error handling chat message:', error);
        }
    });

   socket.on('leaveRoom', (roomId) => {
    const user = connectedUsers.get(socket.id);
    
    if (roomUsers.has(roomId)) {
        const usersInRoom = roomUsers.get(roomId);
        
        if (usersInRoom.has(socket.id)) {
            usersInRoom.delete(socket.id);
            socket.leave(roomId);
            
            // Update the room
            updateRoomUsers(roomId);
            
            // Notify room
            io.to(roomId).emit('user-left', user?.nickName || socket.id);
            
            console.log(`User left room: ${roomId}`);
            
            // Clean up empty rooms
            if (usersInRoom.size === 0) {
                roomUsers.delete(roomId);
            }
        }
    }
    
    // Send confirmation to user
    socket.emit('left-room-success', {
        roomId: roomId,
        success: true,
        message: `You have left room: ${roomId}`
    });
    });


   function updateRoomUsers(room: string) {
    if (roomUsers.has(room)) {
        const usersInRoom = roomUsers.get(room);
        const usersArray = Array.from(usersInRoom).map(socketId => {
            return connectedUsers.get(socketId) || { socketId, nickName: 'Unknown' };
        }).filter(user => user !== undefined);

        // console.log(`🎯 Sending room-users-update to room ${room} with ${usersArray.length} users:`, usersArray);

        // Send updated user list to room
        io.to(room).emit('room-users-update', {
            room: room,
            users: usersArray
        });
        
        // console.log(`Updated room ${room} with ${usersArray.length} users`);
    }
    }
    
    function broadcastUsersList() {
    const usersArray = Array.from(connectedUsers.values());
    io.emit('users-list', usersArray);
    // console.log(`Broadcasted ${usersArray.length} users to all clients`);
    }



    socket.on("disconnect", ()=> {
        // console.log("disconnected", socket.id);
        // Remove from all rooms
        roomUsers.forEach((users, roomName) => {
        if (users.has(socket.id)) {
            users.delete(socket.id);
            updateRoomUsers(roomName);
        }
        });

        // Mark user as offline
        if (connectedUsers.has(socket.id)) {
        const user = connectedUsers.get(socket.id);
        user.isOnline = false;
        user.lastSeen = new Date();
        }
        
        broadcastUsersList();
        connectedUsers.delete(socket.id);
    });

    // Send initial data to newly connected user
    socket.emit('users-list', Array.from(connectedUsers.values()));
    
    const roomsData = Array.from(roomUsers.entries()).map(([name, users]) => ({
        name,
        userCount: users.size,
        users: Array.from(users).map(socketId => connectedUsers.get(socketId)).filter(Boolean)
    }));
    
    socket.emit('all-rooms', roomsData);
});






server.listen(PORT, () => {
    console.log(`app listening  at port : ${PORT}`);
})

