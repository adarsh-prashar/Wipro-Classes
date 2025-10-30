"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseManager = void 0;
exports.LogAction = LogAction;
/**
 * Simple unique id generator
 */
function uid(prefix = "") {
    return prefix + Math.random().toString(36).slice(2, 9);
}
/**
 * Decorator to log calls and return values (basic)
 */
function LogAction(target, propertyKey, descriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`\n[LOG] Action: ${propertyKey} called`);
        if (args.length > 0) {
            try {
                console.log(`[LOG]  Arguments: ${JSON.stringify(args)}`);
            }
            catch (_a) {
                console.log("[LOG]  Arguments: (unable to stringify)");
            }
        }
        const result = original.apply(this, args);
        // log synchronous return (if promise we'd need to handle)
        console.log(`[LOG]  ${propertyKey} returned: ${JSON.stringify(result)}`);
        return result;
    };
    return descriptor;
}
/**
 * CourseManager handles courses, instructors, students.
 * - uses Maps for quick lookup
 * - uses arrays/tuples for some records
 * - demonstrates iterators using generator functions
 */
class CourseManager {
    constructor() {
        // Maps provide O(1) lookup by id
        this.courses = new Map();
        this.instructors = new Map();
        this.students = new Map();
        // Example of storing enrollments as a Map<courseId, Enrollment[]>
        // where Enrollment is a tuple [studentId, dateString]
        this.enrollments = new Map();
        // Keep an array of actions (demonstrates any type usage and arrays)
        this.actionLog = [];
        // seed actionLog with a tuple (string, ISODate) to demonstrate tuples usage
        const seed = ["system-init", new Date().toISOString()];
        this.actionLog.push(seed);
    }
    // ---------- Instructors ----------
    addInstructor(name, categories = []) {
        const id = uid("inst_");
        const instructor = {
            id,
            name,
            categories,
            courses: []
        };
        this.instructors.set(id, instructor);
        this.actionLog.push({ op: "addInstructor", id, at: new Date().toISOString() });
        return instructor;
    }
    getInstructor(id) {
        return this.instructors.get(id);
    }
    // ---------- Students ----------
    addStudent(name) {
        const id = uid("stud_");
        const student = {
            id,
            name,
            enrolledCourses: []
        };
        this.students.set(id, student);
        this.actionLog.push({ op: "addStudent", id, at: new Date().toISOString() });
        return student;
    }
    getStudent(id) {
        return this.students.get(id);
    }
    // ---------- Courses ----------
    createCourse(title, category, instructorId, capacity = 30) {
        const id = uid("course_");
        const course = {
            id,
            title,
            category,
            instructorId: instructorId !== null && instructorId !== void 0 ? instructorId : null,
            capacity,
            students: []
        };
        this.courses.set(id, course);
        // if instructor provided, attach course to instructor
        if (instructorId) {
            const inst = this.instructors.get(instructorId);
            if (inst) {
                inst.courses.push(id);
                // also ensure category is present
                if (!inst.categories.includes(category))
                    inst.categories.push(category);
                this.instructors.set(instructorId, inst);
            }
        }
        this.enrollments.set(id, []); // initialize enrollments array
        this.actionLog.push({ op: "createCourse", id, at: new Date().toISOString() });
        return course;
    }
    assignInstructorToCourse(courseId, instructorId) {
        const course = this.courses.get(courseId);
        const inst = this.instructors.get(instructorId);
        if (!course || !inst)
            return false;
        // remove from old instructor if present
        if (course.instructorId) {
            const old = this.instructors.get(course.instructorId);
            if (old) {
                old.courses = old.courses.filter(cid => cid !== courseId);
                this.instructors.set(old.id, old);
            }
        }
        course.instructorId = instructorId;
        inst.courses.push(courseId);
        if (!inst.categories.includes(course.category))
            inst.categories.push(course.category);
        this.courses.set(courseId, course);
        this.instructors.set(instructorId, inst);
        this.actionLog.push({ op: "assignInstructor", courseId, instructorId, at: new Date().toISOString() });
        return true;
    }
    // ---------- Enrollment ----------
    enrollStudent(courseId, studentId) {
        var _a;
        const course = this.courses.get(courseId);
        const student = this.students.get(studentId);
        if (!course || !student)
            return false;
        // check capacity
        if (course.students.length >= course.capacity) {
            return false;
        }
        // prevent double enrollment
        if (course.students.includes(studentId))
            return false;
        // enroll
        course.students.push(studentId);
        student.enrolledCourses.push(courseId);
        // store tuple [studentId, dateString]
        const enrollRec = [studentId, new Date().toISOString()];
        const arr = (_a = this.enrollments.get(courseId)) !== null && _a !== void 0 ? _a : [];
        arr.push(enrollRec);
        this.enrollments.set(courseId, arr);
        this.courses.set(courseId, course);
        this.students.set(studentId, student);
        this.actionLog.push({ op: "enrollStudent", courseId, studentId, at: new Date().toISOString() });
        return true;
    }
    unenrollStudent(courseId, studentId) {
        var _a;
        const course = this.courses.get(courseId);
        const student = this.students.get(studentId);
        if (!course || !student)
            return false;
        course.students = course.students.filter(sid => sid !== studentId);
        student.enrolledCourses = student.enrolledCourses.filter(cid => cid !== courseId);
        this.courses.set(courseId, course);
        this.students.set(studentId, student);
        // remove from enrollments history (simple remove)
        const enrollList = (_a = this.enrollments.get(courseId)) !== null && _a !== void 0 ? _a : [];
        const filtered = enrollList.filter(([sid]) => sid !== studentId);
        this.enrollments.set(courseId, filtered);
        this.actionLog.push({ op: "unenrollStudent", courseId, studentId, at: new Date().toISOString() });
        return true;
    }
    // ---------- Iterators (Generators) ----------
    // iterate all courses
    *coursesIterator() {
        for (const course of this.courses.values()) {
            yield course;
        }
    }
    // iterate all students
    *studentsIterator() {
        for (const student of this.students.values()) {
            yield student;
        }
    }
    // iterate all instructors
    *instructorsIterator() {
        for (const instructor of this.instructors.values()) {
            yield instructor;
        }
    }
    // iterate enrollments for a course (yields Enrollment tuples)
    *enrollmentsIterator(courseId) {
        var _a;
        const list = (_a = this.enrollments.get(courseId)) !== null && _a !== void 0 ? _a : [];
        for (const rec of list) {
            yield rec;
        }
    }
    // ---------- Utilities / Reports ----------
    listCourses() {
        return Array.from(this.courses.values());
    }
    listStudents() {
        return Array.from(this.students.values());
    }
    listInstructors() {
        return Array.from(this.instructors.values());
    }
    /**
     * Print a compact summary to console (human readable)
     */
    printSummary() {
        var _a, _b;
        console.log("\n=== Online Course Management System Summary ===\n");
        console.log("Instructors:");
        for (const inst of this.instructorsIterator()) {
            console.log(` - ${inst.name} (${inst.id}) — categories: ${inst.categories.join(", ") || "None"} — courses: ${inst.courses.length}`);
        }
        console.log("\nCourses:");
        for (const course of this.coursesIterator()) {
            const instName = course.instructorId ? ((_b = (_a = this.instructors.get(course.instructorId)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "Unknown") : "Unassigned";
            console.log(` - ${course.title} [${course.category}] (${course.id}) — instructor: ${instName} — capacity: ${course.capacity} — enrolled: ${course.students.length}`);
        }
        console.log("\nStudents:");
        for (const student of this.studentsIterator()) {
            console.log(` - ${student.name} (${student.id}) — enrolled courses: ${student.enrolledCourses.length}`);
        }
        console.log("\nRecent actions (last 10):");
        const tail = this.actionLog.slice(-10);
        for (const a of tail) {
            console.log("  •", a);
        }
        console.log("\n=== End Summary ===\n");
    }
    /**
     * Return a plain object with structured data (can be used for tests or console.table)
     */
    snapshot() {
        return {
            instructors: this.listInstructors(),
            courses: this.listCourses(),
            students: this.listStudents(),
            enrollments: Array.from(this.enrollments.entries())
        };
    }
}
exports.CourseManager = CourseManager;
__decorate([
    LogAction
], CourseManager.prototype, "addInstructor", null);
__decorate([
    LogAction
], CourseManager.prototype, "addStudent", null);
__decorate([
    LogAction
], CourseManager.prototype, "createCourse", null);
__decorate([
    LogAction
], CourseManager.prototype, "assignInstructorToCourse", null);
__decorate([
    LogAction
], CourseManager.prototype, "enrollStudent", null);
__decorate([
    LogAction
], CourseManager.prototype, "unenrollStudent", null);
