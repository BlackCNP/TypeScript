"use strict";
// Enum для статусу студента
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["Active"] = "Active";
    StudentStatus["Academic_Leave"] = "Academic Leave";
    StudentStatus["Graduated"] = "Graduated";
    StudentStatus["Expelled"] = "Expelled";
})(StudentStatus || (StudentStatus = {}));
// Enum для типу курсу
var CourseType;
(function (CourseType) {
    CourseType["Mandatory"] = "Mandatory";
    CourseType["Optional"] = "Optional";
    CourseType["Special"] = "Special";
})(CourseType || (CourseType = {}));
// Enum для семестру навчання
var Semester;
(function (Semester) {
    Semester["First"] = "First";
    Semester["Second"] = "Second";
})(Semester || (Semester = {}));
// Enum для оцінок
var Grade;
(function (Grade) {
    Grade[Grade["Excellent"] = 5] = "Excellent";
    Grade[Grade["Good"] = 4] = "Good";
    Grade[Grade["Satisfactory"] = 3] = "Satisfactory";
    Grade[Grade["Unsatisfactory"] = 2] = "Unsatisfactory";
})(Grade || (Grade = {}));
// Enum для факультетів університету
var Faculty;
(function (Faculty) {
    Faculty["Computer_Science"] = "Computer Science";
    Faculty["Economics"] = "Economics";
    Faculty["Law"] = "Law";
    Faculty["Engineering"] = "Engineering";
})(Faculty || (Faculty = {}));
// Клас для системи управління університетом
class UniversityManagementSystem {
    constructor() {
        this.students = [];
        this.courses = [];
        this.grades = [];
        this.studentIdCounter = 1; // Лічильник  студентів
        this.courseIdCounter = 1; // Лічильник  курсів
    }
    // Метод для зарахування студента
    enrollStudent(student) {
        const newStudent = Object.assign({ id: this.studentIdCounter++ }, student);
        this.students.push(newStudent);
        return newStudent;
    }
    // Метод для реєстрації студента на курс
    registerForCourse(studentId, courseId) {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);
        if (!student) {
            throw new Error("Студент не знайдений");
        }
        if (!course) {
            throw new Error("Курс не знайдений");
        }
        if (course.maxStudents <= this.getStudentsByCourse(courseId).length) {
            throw new Error("Курс переповнений");
        }
        if (student.faculty !== course.faculty) {
            throw new Error("Студент не може реєструватися на курс іншого факультету");
        }
        // Реєстрація студента на курс
        this.grades.push({ studentId, courseId, grade: null, date: new Date(), semester: course.semester });
    }
    // Метод для виставлення оцінки
    setGrade(studentId, courseId, grade) {
        const enrollment = this.grades.find(g => g.studentId === studentId && g.courseId === courseId);
        if (!enrollment) {
            throw new Error("Студент не зареєстрований на курс");
        }
        enrollment.grade = grade;
        enrollment.date = new Date();
    }
    // Метод для оновлення статусу студента
    updateStudentStatus(studentId, newStatus) {
        const student = this.students.find(s => s.id === studentId);
        if (!student) {
            throw new Error("Студент не знайдений");
        }
        // Валідація статусу
        if (newStatus === StudentStatus.Graduated && student.status !== StudentStatus.Active) {
            throw new Error("Студент може бути випущений тільки з активного статусу");
        }
        student.status = newStatus;
    }
    // Метод для отримання студентів за факультетом
    getStudentsByFaculty(faculty) {
        return this.students.filter(s => s.faculty === faculty);
    }
    // Метод для отримання оцінок студента
    getStudentGrades(studentId) {
        return this.grades.filter(g => g.studentId === studentId);
    }
    // Метод для отримання доступних курсів
    getAvailableCourses(faculty, semester) {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }
    // Метод для розрахунку середньої оцінки студента
    calculateAverageGrade(studentId) {
        const studentGrades = this.getStudentGrades(studentId);
        const totalGrades = studentGrades.reduce((sum, record) => sum + (record.grade || 0), 0);
        const count = studentGrades.length;
        return count > 0 ? totalGrades / count : 0;
    }
    // Метод для отримання списку відмінників по факультету
    getHonorsByFaculty(faculty) {
        return this.getStudentsByFaculty(faculty).filter(student => {
            const averageGrade = this.calculateAverageGrade(student.id);
            return averageGrade >= 4.5; // Визначення відмінника
        });
    }
    // Метод для додавання курсу
    addCourse(course) {
        const newCourse = Object.assign({ id: this.courseIdCounter++ }, course);
        this.courses.push(newCourse);
        return newCourse;
    }
    // Метод для отримання студентів, зареєстрованих на курс
    getStudentsByCourse(courseId) {
        const enrolledStudents = this.grades.filter(g => g.courseId === courseId && g.grade !== null);
        return this.students.filter(s => enrolledStudents.some(e => e.studentId === s.id));
    }
}
