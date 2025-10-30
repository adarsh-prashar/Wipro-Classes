// Here we will use the CourseApp class to demonstrate the functionality of the Online Course Management System mini app
import { CourseManager, CourseCategory } from './CourseApp';

// Create an instance of CourseManager
const courseManager = new CourseManager();

// Example usage
const instructor1 = courseManager.addInstructor("John Doe", [CourseCategory.DEVELOPMENT]);
const student1 = courseManager.addStudent("Alice Smith");
const course1 = courseManager.createCourse("TypeScript Basics", CourseCategory.DEVELOPMENT, instructor1.id);
courseManager.enrollStudent(course1.id, student1.id);

// Print summary
courseManager.printSummary();

// Fetch and display all courses
const allCourses = courseManager.getAllCourses();
console.log("All Courses:", allCourses);
// Fetch and display course details
const courseDetails = courseManager.getCourseDetails(course1.id);
console.log("Course Details:", courseDetails);
// The above code demonstrates the creation of instructors, students, and courses,
// as well as enrolling students in courses using the CourseManager class.
// It also showcases the use of decorators for logging actions within the system.

// iterators and generators can be implemented in various parts of the system as needed,
// such as iterating over student enrollments or course lists, depending on further requirements.

// StudentManager class can be implemented similarly to CourseManager
// with methods to manage student-specific actions and data.
