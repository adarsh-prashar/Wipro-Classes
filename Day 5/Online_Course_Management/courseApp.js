"use strict";
// // We have to implement following Problem Statement: “Online Course Management System (Mini App)”
// You need to build a small TypeScript-based console app to manage online courses, instructors, and students.
// The app should:
// Store data using Maps, Arrays, and Tuples
// Define structure using Interfaces
// Use Enums for course categories
// Demonstrate Iterators to loop through collections
// Apply Decorators for logging actions
// Use Type annotations, any type, and declarations appropriately
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseManager = exports.students = exports.instructors = exports.courses = exports.CourseCategory = void 0;
exports.LogAction = LogAction;
// Step 1: Create Enum for Course Categories
var CourseCategory;
(function (CourseCategory) {
    CourseCategory["DEVELOPMENT"] = "Development";
    CourseCategory["DESIGN"] = "Design";
    CourseCategory["MARKETING"] = "Marketing";
    CourseCategory["BUSINESS"] = "Business";
})(CourseCategory || (exports.CourseCategory = CourseCategory = {}));
//Step 3: Create Maps to store data
//Map will help us in storing key value pairs where key will be id and value will be object of respective type
exports.courses = new Map();
exports.instructors = new Map();
exports.students = new Map();
// Step 4: Implement Decorator for logging actions where we will log method name and its arguments
function LogAction(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("Action: ".concat(String(propertyKey), " called with arguments: ").concat(JSON.stringify(args)));
        return originalMethod.apply(this, args);
    };
    return descriptor;
}
// The above code sets up the foundational structures for the Online Course Management System mini app using TypeScript.
// Decorators are applied to methods to log their calls and arguments. so that we can track actions performed in the system.
// LogAction decorator is defined to log method calls and their arguments.
// Further implementation would involve creating classes or functions to manage courses, instructors, and students,
// utilizing the defined interfaces, enums, and data structures.
// Step 5: Further implementation can be done by creating classes or functions to manage courses, instructors, and students
// utilizing the defined interfaces, enums, and data structures.
//Step 5: Example class to manage Courses with Decorator applied
var CourseManager = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _createCourse_decorators;
    var _enrollStudent_decorators;
    var _getCourseDetails_decorators;
    var _getAllCourses_decorators;
    var _addInstructor_decorators;
    var _addStudent_decorators;
    var _getStudentDetails_decorators;
    var _getInstructorDetails_decorators;
    var _getAllInstructors_decorators;
    var _printSummary_decorators;
    return _a = /** @class */ (function () {
            function CourseManager() {
                this.courseIdCounter = (__runInitializers(this, _instanceExtraInitializers), 1);
            }
            CourseManager.prototype.createCourse = function (title, category, instructorId) {
                //method to create a new course
                var newCourse = {
                    id: this.courseIdCounter++,
                    title: title,
                    category: category,
                    instructorId: instructorId,
                    studentIds: []
                };
                exports.courses.set(newCourse.id, newCourse);
                return newCourse;
            };
            CourseManager.prototype.enrollStudent = function (courseId, studentId) {
                var course = exports.courses.get(courseId);
                var student = exports.students.get(studentId);
                if (course && student) {
                    course.studentIds.push(studentId);
                    student.enrolledCourses.push(courseId);
                }
                else {
                    console.log("Course or Student not found!");
                }
            };
            CourseManager.prototype.getCourseDetails = function (courseId) {
                return exports.courses.get(courseId);
            };
            CourseManager.prototype.getAllCourses = function () {
                return Array.from(exports.courses.values());
            };
            //Step 6: Implementing Iterator to loop through courses
            CourseManager.prototype.courseIterator = function () {
                var _i, _b, course;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _i = 0, _b = exports.courses.values();
                            _c.label = 1;
                        case 1:
                            if (!(_i < _b.length)) return [3 /*break*/, 4];
                            course = _b[_i];
                            return [4 /*yield*/, course];
                        case 2:
                            _c.sent();
                            _c.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            };
            //Step 7: Further methods to manage instructors and students can be added similarly with appropriate decorators and logic
            CourseManager.prototype.instructorIterator = function () {
                var _i, _b, instructor;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _i = 0, _b = exports.instructors.values();
                            _c.label = 1;
                        case 1:
                            if (!(_i < _b.length)) return [3 /*break*/, 4];
                            instructor = _b[_i];
                            return [4 /*yield*/, instructor];
                        case 2:
                            _c.sent();
                            _c.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            };
            CourseManager.prototype.studentIterator = function () {
                var _i, _b, student;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _i = 0, _b = exports.students.values();
                            _c.label = 1;
                        case 1:
                            if (!(_i < _b.length)) return [3 /*break*/, 4];
                            student = _b[_i];
                            return [4 /*yield*/, student];
                        case 2:
                            _c.sent();
                            _c.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            };
            //Step 8: Additional methods to add instructors and students with logging
            CourseManager.prototype.addInstructor = function (name, expertise) {
                var newInstructor = {
                    id: exports.instructors.size + 1,
                    name: name,
                    expertise: expertise
                };
                exports.instructors.set(newInstructor.id, newInstructor);
                return newInstructor;
            };
            //Step 9: Method to add students with logging
            CourseManager.prototype.addStudent = function (name) {
                var newStudent = {
                    id: exports.students.size + 1,
                    name: name,
                    enrolledCourses: []
                };
                exports.students.set(newStudent.id, newStudent);
                return newStudent;
            };
            //Step 10: Method to get student details with logging
            CourseManager.prototype.getStudentDetails = function (studentId) {
                return exports.students.get(studentId);
            };
            //Step 11: Method to get instructor details with logging
            CourseManager.prototype.getInstructorDetails = function (instructorId) {
                return exports.instructors.get(instructorId);
            };
            //Step 12: Method to get all instructors with logging
            CourseManager.prototype.getAllInstructors = function () {
                return Array.from(exports.instructors.values());
            };
            //Step 13: Print summary of all data
            CourseManager.prototype.printSummary = function () {
                console.log("Courses:", Array.from(exports.courses.values()));
                console.log("Instructors:", Array.from(exports.instructors.values()));
                console.log("Students:", Array.from(exports.students.values()));
            };
            return CourseManager;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createCourse_decorators = [LogAction];
            _enrollStudent_decorators = [LogAction];
            _getCourseDetails_decorators = [LogAction];
            _getAllCourses_decorators = [LogAction];
            _addInstructor_decorators = [LogAction];
            _addStudent_decorators = [LogAction];
            _getStudentDetails_decorators = [LogAction];
            _getInstructorDetails_decorators = [LogAction];
            _getAllInstructors_decorators = [LogAction];
            _printSummary_decorators = [LogAction];
            __esDecorate(_a, null, _createCourse_decorators, { kind: "method", name: "createCourse", static: false, private: false, access: { has: function (obj) { return "createCourse" in obj; }, get: function (obj) { return obj.createCourse; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _enrollStudent_decorators, { kind: "method", name: "enrollStudent", static: false, private: false, access: { has: function (obj) { return "enrollStudent" in obj; }, get: function (obj) { return obj.enrollStudent; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getCourseDetails_decorators, { kind: "method", name: "getCourseDetails", static: false, private: false, access: { has: function (obj) { return "getCourseDetails" in obj; }, get: function (obj) { return obj.getCourseDetails; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getAllCourses_decorators, { kind: "method", name: "getAllCourses", static: false, private: false, access: { has: function (obj) { return "getAllCourses" in obj; }, get: function (obj) { return obj.getAllCourses; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _addInstructor_decorators, { kind: "method", name: "addInstructor", static: false, private: false, access: { has: function (obj) { return "addInstructor" in obj; }, get: function (obj) { return obj.addInstructor; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _addStudent_decorators, { kind: "method", name: "addStudent", static: false, private: false, access: { has: function (obj) { return "addStudent" in obj; }, get: function (obj) { return obj.addStudent; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getStudentDetails_decorators, { kind: "method", name: "getStudentDetails", static: false, private: false, access: { has: function (obj) { return "getStudentDetails" in obj; }, get: function (obj) { return obj.getStudentDetails; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getInstructorDetails_decorators, { kind: "method", name: "getInstructorDetails", static: false, private: false, access: { has: function (obj) { return "getInstructorDetails" in obj; }, get: function (obj) { return obj.getInstructorDetails; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getAllInstructors_decorators, { kind: "method", name: "getAllInstructors", static: false, private: false, access: { has: function (obj) { return "getAllInstructors" in obj; }, get: function (obj) { return obj.getAllInstructors; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _printSummary_decorators, { kind: "method", name: "printSummary", static: false, private: false, access: { has: function (obj) { return "printSummary" in obj; }, get: function (obj) { return obj.printSummary; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CourseManager = CourseManager;
//end of CourseManager class with various methods to manage courses, instructors, and students
