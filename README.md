# 💬 SyntexHub Chat Application

A modern **real-time chat application** built using the **MERN Stack**. This application enables users to communicate instantly using Socket.io while securely authenticating with JWT. Chat history is stored in MongoDB, allowing conversations to persist even after users disconnect.

---

# 🚀 Live Demo

Frontend:
https://syntecxhubchatweb-rust.vercel.app

Backend:
https://syntecxhub-chat-web-sl9o.onrender.com

---


# ✨ Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing (bcrypt)

---

## Chat Features

- Real-time Messaging
- Instant Message Delivery
- Online User Status
- Typing Indicator
- Join Chat Rooms
- Leave Chat Rooms
- Private Conversations (Optional)
- Auto Scroll to Latest Message

---

## Database Features

- Store User Information
- Store Chat Messages
- Store Chat Rooms
- Retrieve Previous Chat History

---

## UI Features

- Responsive Design
- Modern User Interface
- Mobile Friendly
- Loading Indicators
- Error Handling
- Toast Notifications

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- React Router
- Axios
- Socket.io Client
- Context API
- Tailwind CSS

---

## Backend

- Node.js
- Express.js
- Socket.io
- JWT Authentication
- bcrypt
- MongoDB
- Mongoose
- dotenv

---

# 📂 Project Structure

```
Syntecxhub_Chat_Application/
│
├── 💻 client/                                  # React frontend (Vite)
│   ├── .env.example                            # Frontend environment template
│   ├── index.html                              # HTML shell entry point
│   ├── package.json                            # Frontend dependencies
│   ├── vite.config.js                          # Vite build configuration
|   ├── vercel.json                             # Fix Refresh page issue in React + Vite on Vercel.
│   │
│   └── src/                                    # Frontend source code
│       ├── App.jsx                             # Root component & route definitions
│       ├── main.jsx                            # React DOM entry point
│       │
│       ├── 🌐 api/
│       │   └── httpClient.js                   # Axios instance with base URL & interceptors
│       │
│       ├── 🧩 components/
│       │   ├── Button/
│       │   │   ├── Button.jsx                  # Reusable button component
│       │   │   └── Button.css
│       │   ├── FormField/
│       │   │   ├── FormField.jsx               # Reusable input field component
│       │   │   └── FormField.css
│       │   └── LoadingScreen/
│       │       ├── LoadingScreen.jsx           # Full-screen loading spinner
│       │       └── LoadingScreen.css
│       │
│       ├── 🔐 context/
│       │   └── AuthContext.jsx                 # Global auth state (user, token, login, logout)
│       │
│       ├── 🗂️ layouts/
│       │   └── AuthLayout/
│       │       ├── AuthLayout.jsx              # Shared layout wrapper for auth pages
│       │       └── AuthLayout.css
│       │
│       ├── 📄 pages/
│       │   ├── HomePage.jsx                    # Landing / home screen
│       │   ├── HomePage.css
│       │   ├── LoginPage.jsx                   # Login form page
│       │   ├── RegisterPage.jsx                # Register form page
│       │   ├── AuthPages.css                   # Shared styles for auth pages
│       │   ├── ChatPage.jsx                    # Main chat interface
│       │   ├── ChatPage.css
│       │   ├── NotFoundPage.jsx                # 404 page
│       │   └── NotFoundPage.css
│       │
│       ├── 🔒 routes/
│       │   ├── ProtectedRoute.jsx              # Redirects unauthenticated users to login
│       │   └── PublicRoute.jsx                 # Redirects logged-in users away from auth pages
│       │
│       ├── 🔌 services/
│       │   ├── authService.js                  # Login, register, logout API calls
│       │   ├── conversationService.js          # Fetch & create conversations
│       │   ├── messageService.js               # Fetch message history
│       │   ├── socketService.js                # Socket.io connection & event management
│       │   └── userService.js                  # User search & profile API calls
│       │
│       ├── 🎨 styles/
│       │   └── global.css                      # Global CSS variables & resets
│       │
│       └── 🧰 utils/
│           ├── getApiErrorMessage.js           # Extracts readable error from API response
│           └── tokenStorage.js                 # localStorage token get/set/remove helpers
│
├── 🔧 server/                                  # Node.js + Express backend
│   ├── .env.example                            # Backend environment template
│   ├── package.json                            # Backend dependencies
│   │
│   └── src/                                    # Backend source code
│       ├── app.js                              # Express app setup, middleware, routes
│       ├── server.js                           # HTTP server + Socket.io initialization
│       │
│       ├── ⚙️ config/
│       │   ├── db.js                           # MongoDB Atlas connection setup
│       │   └── env.js                          # Environment variable validation
│       │
│       ├── 🧠 controllers/
│       │   ├── auth.controller.js              # Register, login, get current user
│       │   ├── conversation.controller.js      # Create & fetch conversations
│       │   ├── health.controller.js            # Health check endpoint
│       │   ├── message.controller.js           # Fetch message history
│       │   └── user.controller.js              # Search & get user profiles
│       │
│       ├── 🛡️ middleware/
│       │   ├── authMiddleware.js               # JWT verification & user attachment
│       │   ├── errorHandler.js                 # Centralized error response middleware
│       │   └── validateRequest.js              # Runs express-validator checks
│       │
│       ├── 🗄️ models/
│       │   ├── Conversation.js                 # Mongoose schema for conversations
│       │   ├── Message.js                      # Mongoose schema for messages
│       │   └── User.js                         # Mongoose schema for users
│       │
│       ├── 🔗 routes/
│       │   ├── auth.routes.js                  # /api/auth — register, login, me
│       │   ├── conversation.routes.js          # /api/conversations — CRUD
│       │   ├── health.routes.js                # /api/health — server status
│       │   ├── message.routes.js               # /api/messages — fetch history
│       │   └── user.routes.js                  # /api/users — search, profile
│       │
│       ├── 🔌 services/
│       │   ├── conversation.service.js         # Business logic for conversations
│       │   └── message.service.js              # Business logic for messages
│       │
│       ├── ⚡ socket/
│       │   └── socket.js                       # Socket.io events (join, message, disconnect)
│       │
│       ├── 🧰 utils/
│       │   ├── apiError.js                     # Custom API error class
│       │   ├── asyncHandler.js                 # Wraps async route handlers for error catching
│       │   └── jwt.js                          # JWT sign & verify helpers
│       │
│       └── ✅ validators/
│           ├── auth.validator.js               # Validate register/login input
│           ├── conversation.validator.js       # Validate conversation creation input
│           └── message.validator.js            # Validate message send input
│
│
├── .gitignore                                  # Files excluded from Git
├── package.json                                # Root package (scripts only)
└── README.md                                   # Project documentation
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/syntexhub-chat-app.git
```

Move into project

```bash
cd syntexhub-chat-app
```

---

## Backend Setup

```bash
cd server

npm install
```

Create a `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

Start backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api

VITE_SOCKET_URL=http://localhost:5000
```

Start frontend

```bash
npm run dev
```

---

# 🔐 Environment Variables

## Backend

```env
PORT=

MONGO_URI=

JWT_SECRET=

CLIENT_URL=
```

## Frontend

```env
VITE_API_URL=

VITE_SOCKET_URL=
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login

GET /api/auth/me
```

---

## Chat

```
GET /api/messages/:conversationId

POST /api/messages

GET /api/conversations
```

---

# 🔌 Socket Events

## Client → Server

```
connection

join-room

leave-room

send-message

typing

stop-typing

disconnect
```

---

## Server → Client

```
receive-message

user-online

user-offline

typing

stop-typing
```

---

# 🗃 Database Collections

```
Users

Messages

Conversations
```

---

# 📚 What I Learned

- MERN Stack Development
- REST API Development
- JWT Authentication
- Password Encryption
- MongoDB Schema Design
- Socket.io
- Real-time Communication
- React Context API
- Protected Routes
- Deployment
- Environment Variables

---

# 🚀 Deployment

Frontend

- Vercel

Backend

- Render

Database

- MongoDB Atlas

---

# 🔮 Future Improvements

- Image Sharing
- Emoji Picker
- Group Chat
- Voice Messages
- Video Calling
- Read Receipts
- Message Reactions
- File Uploads
- Dark Mode
- Push Notifications

---

# 👨‍💻 Author

**Jublee Dash**


---

# ⭐ Support

If you like this project, don't forget to give it a ⭐ on GitHub.
