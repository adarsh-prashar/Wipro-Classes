// this file will have all server related code ie
// express setup, routes, custom middleware and server start etc
// 1. import express
const express = require('express');
const morgan = require('morgan');
// Creating an express application instance
const app = express();
// 2. Middleware to parse JSON bodies with the built-in express middleware
// express.json() and express.urlencoded()
// app.use is used to mount the middleware functions at the specified path
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS as template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// 3. Custom middleware example: here we have to log each request method and url unlike morgan or other logging libraries
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} request for '${req.url}'`);
    next();
});

// Morgan middleware for logging in development mode
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('[:date[iso]] :method :url :status :response-time ms'));
}

// Mock student data
let students = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', progress: 85 },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', progress: 92 },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', progress: 78 }
];

// Validation middleware for student routes
const validateStudentData = (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    next();
};
// 4. Define routes( these will go through middleware first )
// app.get() defines a route handler for GET requests to the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Student routes
app.get('/students', (req, res) => {
    res.render('dashboard', { students });
});

app.post('/students', validateStudentData, (req, res) => {
    const { name, email } = req.body;
    const newStudent = {
        id: students.length + 1,
        name,
        email,
        progress: 0
    };
    students.push(newStudent);
    res.redirect('/students');
});

// Error-handling middleware (must be last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 5. Start the server and listen on a specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
