const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// GET / - Root route for API info
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Student Management API',
    endpoints: {
      'GET /students': 'Fetch all students',
      'GET /students/:id': 'Fetch student by ID',
      'POST /students': 'Add a new student (body: name, skills, course)',
      'PUT /students/:id': 'Update student by ID',
      'DELETE /students/:id': 'Delete student by ID'
    }
  });
});

// In-memory storage for students
let students = [];
let nextId = 1;

// GET /students - Fetch all students
app.get('/students', (req, res) => {
  res.json(students);
});

// GET /students/:id - Fetch student by ID
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
});

// POST /students - Add a new student
app.post('/students', (req, res) => {
  const { name, skills, course } = req.body;
  if (!name || !skills || !course) {
    return res.status(400).json({ message: "Required fields: name, skills, course" });
  }
  const newStudent = {
    id: nextId++,
    name,
    skills,
    course
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /students/:id - Update student details
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);
  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }
  const { name, skills, course } = req.body;
  if (name !== undefined) students[studentIndex].name = name;
  if (skills !== undefined) students[studentIndex].skills = skills;
  if (course !== undefined) students[studentIndex].course = course;
  res.json(students[studentIndex]);
});

// DELETE /students/:id - Delete a student
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);
  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }
  students.splice(studentIndex, 1);
  res.json({ message: "Student deleted successfully" });
});

app.listen(port, () => {
  console.log(`Student API listening at http://localhost:${port}`);
});
