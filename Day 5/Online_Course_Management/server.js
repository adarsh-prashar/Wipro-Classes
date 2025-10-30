"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CourseApp_1 = require("./CourseApp");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const manager = new CourseApp_1.CourseManager();
// API endpoints
app.get('/courses', (req, res) => {
    const courses = manager.getAllCourses();
    res.json(courses);
});
app.get('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const course = manager.getCourseDetails(id);
    if (course) {
        res.json(course);
    }
    else {
        res.status(404).json({ error: 'Course not found' });
    }
});
app.post('/courses', (req, res) => {
    const { title, category, instructorId } = req.body;
    const course = manager.createCourse(title, category, instructorId);
    res.json(course);
});
app.post('/enroll', (req, res) => {
    const { courseId, studentId } = req.body;
    manager.enrollStudent(courseId, studentId);
    res.json({ message: 'Student enrolled' });
});
app.get('/instructors', (req, res) => {
    const instructors = manager.getAllInstructors();
    res.json(instructors);
});
app.post('/instructors', (req, res) => {
    const { name, expertise } = req.body;
    const instructor = manager.addInstructor(name, expertise);
    res.json(instructor);
});
app.get('/students', (req, res) => {
    const studentsList = Array.from(CourseApp_1.students.values());
    res.json(studentsList);
});
app.post('/students', (req, res) => {
    const { name } = req.body;
    const student = manager.addStudent(name);
    res.json(student);
});
app.get('/summary', (req, res) => {
    manager.printSummary();
    res.json({ message: 'Summary printed to console' });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
