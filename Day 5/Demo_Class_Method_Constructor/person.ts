export class Person {
  public name: string;
  protected age: number;
  readonly institute: string;
  private id: number;
  static counter: number = 0;

  constructor(name: string, age: number, institute: string, id: number) {
    this.name = name;
    this.age = age;
    this.institute = institute;
    this.id = id;
    Person.counter++;
  }

  public greet(): string {
    return `Hello, my name is ${this.name} and I am ${this.age} years old. I study at ${this.institute}.`;
  }

  protected getAge(): number {
    return this.age;
  }

  public showId(): number {
    return this.id;
  }
}

export class Student extends Person {
  private skills: string[];

  constructor(name: string, age: number, institute: string, id: number, skills: string[]) {
    super(name, age, institute, id);
    this.skills = skills;
  }

  public getStudentDetails(): string {
    return `${this.greet()} I have skills in: ${this.skills.join(", ")}.`;
  }

  public addskill(skill: string): void {
    this.skills.push(skill);
  }

  public display(): void {
    console.log(`my age is ${this.getAge()}`);
  }

  public greet(): string {
    return `Hello, my name is ${this.name} and I am a student at ${this.institute}.
    I have skills in: ${this.skills.join(", ")}.`;
  }
}
