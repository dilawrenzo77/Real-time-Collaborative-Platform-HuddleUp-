# Huddle - Real-time Collaboration Platform

A modern, real-time collaboration platform built with React, Express, Socket.io, and Tailwind CSS. Features multi-room chat, user presence tracking, and real-time messaging.

## 🚀 Features

- **Real-time Chat**: Instant messaging across multiple rooms
- **Multi-room Support**: Create and join different chat rooms
- **User Presence**: See who's online and active in rooms
- **User Authentication**: Secure user login and session management
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Live Notifications**: Real-time user join/leave notifications
- **Message History**: Persistent chat history per room
- **User Roles**: Role-based access control

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and responsive design
- **React Router** - Navigation and routing
- **Socket.io Client** - Real-time communication

### Backend
- **Express.js** - Web server framework
- **Socket.io** - Real-time bidirectional communication
- **Node.js** - Runtime environment
- **TypeScript** - Backend type safety
- **JWT** - Authentication tokens

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=3000
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

5. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=ws://localhost:3000
```

5. Start the development server:
```bash
npm run dev
```

## 🏗 Project Structure

```
huddle/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   └── types/          # TypeScript type definitions
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── sockets/        # Socket.io event handlers
│   │   └── types/          # TypeScript type definitions
│   └── package.json
└── README.md
```

## 🔌 Socket Events

### Client to Server
- `JoinChat` - Join a chat room
- `sentChat` - Send a chat message
- `leaveRoom` - Leave a chat room
- `user-authenticated` - User authentication
- `get-room-users` - Request room users list

### Server to Client
- `room-users-update` - Room users list update
- `recieveChat` - Receive chat message
- `room-history` - Room message history
- `user-joined` - User joined notification
- `user-left` - User left notification
- `joinSuccess` - Room join confirmation
- `left-room-success` - Room leave confirmation

## 🎯 Key Components

### Frontend Components
- `Chat` - Main chat interface
- `UserTab` - User list item component
- `RoomList` - Available rooms display
- `Notification` - Real-time notifications

### Backend Features
- Room management with user tracking
- Real-time message broadcasting
- User authentication and session management
- Message persistence and history
- Socket connection handling

## 🎨 Styling

The project uses **Tailwind CSS** for styling with:
- Responsive design patterns
- Custom color scheme
- Component-based styling
- Dark/light mode support (if implemented)

## 🔒 Authentication

JWT-based authentication system:
- Secure token generation and validation
- Protected socket connections
- User session management
- Role-based permissions

## 📱 Responsive Design

- Mobile-first approach
- Responsive breakpoints
- Touch-friendly interfaces
- Cross-browser compatibility

## 🚀 Deployment

### Backend Deployment
```bash
cd server
npm run build
npm start
```

### Frontend Deployment
```bash
cd client
npm run build
# Deploy the dist/ folder to your hosting service
```

## 🧪 Development

### Running in Development Mode
```bash
# Backend (runs on port 3000)
cd server && npm run dev

# Frontend (runs on port 5173)
cd client && npm run dev
```

### Building for Production
```bash
# Backend
cd server && npm run build

# Frontend
cd client && npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🐛 Troubleshooting

### Common Issues

1. **Socket connection fails**
   - Check if backend server is running
   - Verify CORS configuration
   - Check firewall settings

2. **Messages not appearing**
   - Verify socket event listeners are properly set up
   - Check room joining logic
   - Verify message persistence

3. **User presence not updating**
   - Check socket connection status
   - Verify room user tracking
   - Check event emission

### Debugging

Enable debug logs by checking browser console and server logs for real-time event tracking.

## 📞 Support

For support and questions:
- mbatalawrence@gmail.com
- Review socket event documentation
- Examine the component structure

---

**Built with ❤️ using React, Express, Socket.io, and Tailwind CSS**
