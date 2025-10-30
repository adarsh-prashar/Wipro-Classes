import express, { Request, Response } from 'express';
import { CourseManager, students } from './CourseApp';

const app = express();
const port = 3000;

app.use(express.json());

const manager = new CourseManager();

// API endpoints
app.get('/courses', (req: Request, res: Response) => {
  const courses = manager.getAllCourses();
  res.json(courses);
});

app.get('/courses/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const course = manager.getCourseDetails(id);
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ error: 'Course not found' });
  }
});

app.post('/courses', (req: Request, res: Response) => {
  const { title, category, instructorId } = req.body;
  const course = manager.createCourse(title, category, instructorId);
  res.json(course);
});

app.post('/enroll', (req: Request, res: Response) => {
  const { courseId, studentId } = req.body;
  manager.enrollStudent(courseId, studentId);
  res.json({ message: 'Student enrolled' });
});

app.get('/instructors', (req: Request, res: Response) => {
  const instructors = manager.getAllInstructors();
  res.json(instructors);
});

app.post('/instructors', (req: Request, res: Response) => {
  const { name, expertise } = req.body;
  const instructor = manager.addInstructor(name, expertise);
  res.json(instructor);
});

app.get('/students', (req: Request, res: Response) => {
  const studentsList = Array.from(students.values());
  res.json(studentsList);
});

app.post('/students', (req: Request, res: Response) => {
  const { name } = req.body;
  const student = manager.addStudent(name);
  res.json(student);
});

app.get('/summary', (req: Request, res: Response) => {
  manager.printSummary();
  res.json({ message: 'Summary printed to console' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
