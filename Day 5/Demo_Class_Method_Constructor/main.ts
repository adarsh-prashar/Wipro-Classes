import { Person, Student } from "./person";

let person1 = new Person("Alice", 30, "Wonderland University", 101);
console.log(person1.greet());
console.log("Person ID:", person1.showId());
console.log("Person Counter:", Person.counter);

let student1 = new Student("Bob", 20, "Builder Institute", 1, ["JavaScript", "TypeScript"]);
console.log(student1.getStudentDetails());
student1.addskill("React");
student1.display();
console.log("Person Counter after creating Student:", Person.counter);
