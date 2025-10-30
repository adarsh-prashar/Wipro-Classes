// Adapted from CourseApp.js for web use
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// Enum for Course Categories
var CourseCategory;
(function (CourseCategory) {
    CourseCategory["DEVELOPMENT"] = "Development";
    CourseCategory["DESIGN"] = "Design";
    CourseCategory["MARKETING"] = "Marketing";
    CourseCategory["BUSINESS"] = "Business";
})(CourseCategory || (CourseCategory = {}));

// Maps to store data
var courses = new Map();
var instructors = new Map();
var students = new Map();

// Decorator for logging actions (adapted for DOM output)
function LogAction(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const output = document.getElementById('output');
        output.textContent += `Action: ${String(propertyKey)} called with arguments: ${JSON.stringify(args)}\n`;
        output.scrollTop = output.scrollHeight;
        return originalMethod.apply(this, args);
    };
    return descriptor;
}

// CourseManager class
class CourseManager {
    constructor() {
        this.courseIdCounter = 1;
    }

    createCourse(title, category, instructorId) {
        const newCourse = {
            id: this.courseIdCounter++,
            title,
            category,
            instructorId,
            studentIds: []
        };
        courses.set(newCourse.id, newCourse);
        return newCourse;
    }

    enrollStudent(courseId, studentId) {
        const course = courses.get(courseId);
        const student = students.get(studentId);
        if (course && student) {
            course.studentIds.push(studentId);
            student.enrolledCourses.push(courseId);
        } else {
            const output = document.getElementById('output');
            output.textContent += "Course or Student not found!\n";
            output.scrollTop = output.scrollHeight;
        }
    }

    getCourseDetails(courseId) {
        return courses.get(courseId);
    }

    getAllCourses() {
        return Array.from(courses.values());
    }

    *courseIterator() {
        for (const course of courses.values()) {
            yield course;
        }
    }

    *instructorIterator() {
        for (const instructor of instructors.values()) {
            yield instructor;
        }
    }

    *studentIterator() {
        for (const student of students.values()) {
            yield student;
        }
    }

    addInstructor(name, expertise) {
        const newInstructor = {
            id: instructors.size + 1,
            name,
            expertise
        };
        instructors.set(newInstructor.id, newInstructor);
        return newInstructor;
    }

    addStudent(name) {
        const newStudent = {
            id: students.size + 1,
            name,
            enrolledCourses: []
        };
        students.set(newStudent.id, newStudent);
        return newStudent;
    }

    getStudentDetails(studentId) {
        return students.get(studentId);
    }

    getInstructorDetails(instructorId) {
        return instructors.get(instructorId);
    }

    getAllInstructors() {
        return Array.from(instructors.values());
    }

            printSummary() {
                const output = document.getElementById('output');
                output.textContent += "Courses:\n";
                for (const course of courses.values()) {
                    output.textContent += `  ID: ${course.id}, Title: ${course.title}, Category: ${course.category}, Instructor ID: ${course.instructorId}, Students: [${course.studentIds.join(', ')}]\n`;
                }
                output.textContent += "\nInstructors:\n";
                for (const instructor of instructors.values()) {
                    output.textContent += `  ID: ${instructor.id}, Name: ${instructor.name}, Expertise: ${instructor.expertise}\n`;
                }
                output.textContent += "\nStudents:\n";
                for (const student of students.values()) {
                    output.textContent += `  ID: ${student.id}, Name: ${student.name}, Enrolled Courses: [${student.enrolledCourses.join(', ')}]\n`;
                }
                output.scrollTop = output.scrollHeight;
            }
}

__decorate([
    LogAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Object)
], CourseManager.prototype, "createCourse", null);

__decorate([
    LogAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], CourseManager.prototype, "enrollStudent", null);

__decorate([
    LogAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], CourseManager.prototype, "getCourseDetails", null);

__decorate([
    LogAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], CourseManager.prototype, "getAllCourses", null);

__decorate([
    LogAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Object)
], CourseManager.prototype, "addInstructor", null);

__decorate([
    LogAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], CourseManager.prototype, "addStudent", null);

__decorate([
    LogAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], CourseManager.prototype, "getStudentDetails", null);

__decorate([
    LogAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], CourseManager.prototype, "getInstructorDetails", null);

__decorate([
    LogAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], CourseManager.prototype, "getAllInstructors", null);

__decorate([
    LogAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseManager.prototype, "printSummary", null);

// Initialize CourseManager
const manager = new CourseManager();

// Event listeners for buttons
document.getElementById('addInstructorBtn').addEventListener('click', () => {
    const name = document.getElementById('instructorName').value;
    const expertise = document.getElementById('instructorExpertise').value;
    if (name && expertise) {
        manager.addInstructor(name, expertise);
        document.getElementById('instructorName').value = '';
        document.getElementById('instructorExpertise').value = '';
    }
});

document.getElementById('addStudentBtn').addEventListener('click', () => {
    const name = document.getElementById('studentName').value;
    if (name) {
        manager.addStudent(name);
        document.getElementById('studentName').value = '';
    }
});

document.getElementById('createCourseBtn').addEventListener('click', () => {
    const title = document.getElementById('courseTitle').value;
    const category = document.getElementById('courseCategory').value;
    const instructorId = parseInt(document.getElementById('courseInstructorId').value);
    if (title && category && instructorId) {
        manager.createCourse(title, category, instructorId);
        document.getElementById('courseTitle').value = '';
        document.getElementById('courseInstructorId').value = '';
    }
});

document.getElementById('enrollStudentBtn').addEventListener('click', () => {
    const courseId = parseInt(document.getElementById('enrollCourseId').value);
    const studentId = parseInt(document.getElementById('enrollStudentId').value);
    if (courseId && studentId) {
        manager.enrollStudent(courseId, studentId);
        document.getElementById('enrollCourseId').value = '';
        document.getElementById('enrollStudentId').value = '';
    }
});

document.getElementById('printSummaryBtn').addEventListener('click', () => {
    manager.printSummary();
});
