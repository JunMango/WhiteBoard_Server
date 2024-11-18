// Load environment variables
import 'dotenv/config';

// Dependencies
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import pkg from 'jsonwebtoken';
const { sign } = pkg; // Named export 추출

// Router
import authRouter from "./routes/auth/google.js";
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { httpOnly: true, secure: false },
    })
);

// Routes
app.use('/api/auth',authRouter )

/*
시발 만들어야 할거 api Root
 */
// app.use('/api/auth/login')
// app.use('/api/auth/logout')
// app.use('/api/note')
// app.use('/api/group')
// app.use('/api/socket')
// app.use('/api/db')


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
