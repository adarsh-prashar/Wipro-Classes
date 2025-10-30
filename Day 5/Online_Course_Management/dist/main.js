"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// main.ts
const courseApp_1 = require("./courseApp");
const courseCategory_1 = require("./courseCategory");
function demo() {
    const manager = new courseApp_1.CourseManager();
    // Add instructors
    const instAlice = manager.addInstructor("Alice Johnson", [courseCategory_1.CourseCategory.DEVELOPMENT]);
    const instBob = manager.addInstructor("Bob Lee", [courseCategory_1.CourseCategory.DESIGN, courseCategory_1.CourseCategory.DEVELOPMENT]);
    // Add students
    const s1 = manager.addStudent("Vikram Patel");
    const s2 = manager.addStudent("Fatima Khan");
    const s3 = manager.addStudent("Liu Chen");
    // Create courses (some assigned instructor at creation)
    const c1 = manager.createCourse("TypeScript Basics", courseCategory_1.CourseCategory.DEVELOPMENT, instAlice.id, 2);
    const c2 = manager.createCourse("Intro to UI/UX", courseCategory_1.CourseCategory.DESIGN, instBob.id, 10);
    const c3 = manager.createCourse("Marketing 101", courseCategory_1.CourseCategory.MARKETING); // unassigned instructor
    // Assign an instructor later
    manager.assignInstructorToCourse(c3.id, instBob.id);
    // Enroll students
    manager.enrollStudent(c1.id, s1.id);
    manager.enrollStudent(c1.id, s2.id);
    // attempt to enroll beyond capacity (should fail)
    const tooMany = manager.enrollStudent(c1.id, s3.id);
    console.log(`Attempt to enroll third student into "${c1.title}" (capacity 2) succeeded? ${tooMany}`);
    // enroll into other courses
    manager.enrollStudent(c2.id, s3.id);
    manager.enrollStudent(c3.id, s1.id);
    // Demonstrate iterators usage directly
    console.log("\n--- Iterating over courses with generator ---");
    for (const course of manager.coursesIterator()) {
        console.log(`* ${course.title} (${course.id}) - category: ${course.category} - enrolled: ${course.students.length}`);
        // list enrollments with enrollmentsIterator(generator of tuples)
        console.log("  Enrollments (studentId, date):");
        for (const [studentId, date] of manager.enrollmentsIterator(course.id)) {
            console.log(`    - ${studentId} at ${date}`);
        }
    }
    // Print snapshot using console.table for courses (demonstrating TABLE output possibility)
    console.log("\n--- Console.table snapshot of courses ---");
    console.table(manager.listCourses().map(c => ({
        id: c.id,
        title: c.title,
        category: c.category,
        instructorId: c.instruc
    })));
}
