import express  from "express";
import dotenv from "dotenv";
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';
import commentsRouter from './routes/comments.js';

// express app
const app = express();

// inits the dotenv package
dotenv.config();

// App port
const PORT = process.env.PORT || 4000;

// ================ Middlewares =====================================================

// JSON Parser
app.use(express.json());
// custom logger middleware
app.use((req, res, next) => {
    console.log("Request from url: " + req.url);
    next();
});

console.log(process.env.PORT);

// =============== Routes =====================================================
// GET route

app.get('/', (req, res) => {
    console.log(req.body);
    res.send('Welcome to MongoDB-Database-Application!');
});


//Run this on given requests====================
//This middleware function will be executed only when the base of the requested path matches the defined path.

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);


// Global error handler middleware=============================================
app.use((err, _req, res, next) => {
    res.status(500).send('Server Error!');
});

// Listen port ===================================================================
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});