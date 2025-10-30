export class person {
    constructor(name, age, institute, id) {
        this.name = name;
        this.age = age;
        this.institute = institute;
        this.id = id;
    }
    greet() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old. I study at ${this.institute}.`;
    }
    getAge() {
        return this.age;
    }
    showId() {
        return this.id;
    }
}
person.country = 0;
export class Student extends person {
    constructor(name, age, institute, id, skills) {
        super(name, age, institute, id);
        this.skills = skills;
    }
    getStudentDetails() {
        return `${this.greet()} I have skills in: ${this.skills.join(", ")}.`;
    }
    addskill(skill) {
        this.skills.push(skill);
    }
    display() {
        console.log('my age is ${this.getAge()}');
    }
    greet() {
        return `Hello, my name is ${this.name} and I am a student at ${this.institute}.
         I have skills in: ${this.skills.join(", ")}.`;
    }
}
