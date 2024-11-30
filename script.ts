// Enum для статусу студента
enum StudentStatus {
    Active = "Active",
    Academic_Leave = "Academic Leave",
    Graduated = "Graduated",
    Expelled = "Expelled",
}

// Enum для типу курсу
enum CourseType {
    Mandatory = "Mandatory",
    Optional = "Optional",
    Special = "Special",
}

// Enum для семестру навчання
enum Semester {
    First = "First",
    Second = "Second",
}

// Enum для оцінок
enum Grade {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2,
}

// Enum для факультетів університету
enum Faculty {
    Computer_Science = "Computer Science",
    Economics = "Economics",

    Law = "Law",
    Engineering = "Engineering",
}

// Інтерфейс для студента
interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

// Інтерфейс для курсу
interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

// Інтерфейс для оцінки
interface GradeRecord {
    studentId: number;
    courseId: number;
    grade: Grade | null; 
    date: Date;
    semester: Semester;
}

// Клас для системи управління університетом
class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: GradeRecord[] = [];
    private studentIdCounter = 1; // Лічильник  студентів
    private courseIdCounter = 1; // Лічильник  курсів

    // Метод для зарахування студента
    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = { id: this.studentIdCounter++, ...student };
        this.students.push(newStudent);
        return newStudent;
    }

    // Метод для реєстрації студента на курс
    registerForCourse(studentId: number, courseId: number): void {
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
    setGrade(studentId: number, courseId: number, grade: Grade): void {
        const enrollment = this.grades.find(g => g.studentId === studentId && g.courseId === courseId);
        if (!enrollment) {
            throw new Error("Студент не зареєстрований на курс");
        }

        enrollment.grade = grade;
        enrollment.date = new Date();
    }

    // Метод для оновлення статусу студента
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this .students.find(s => s.id === studentId);
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
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    // Метод для отримання оцінок студента
    getStudentGrades(studentId: number): GradeRecord[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    // Метод для отримання доступних курсів
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }

    // Метод для розрахунку середньої оцінки студента
    calculateAverageGrade(studentId: number): number {
        const studentGrades = this.getStudentGrades(studentId);
        const totalGrades = studentGrades.reduce((sum, record) => sum + (record.grade || 0), 0);
        const count = studentGrades.length;

        return count > 0 ? totalGrades / count : 0;
    }

    // Метод для отримання списку відмінників по факультету
    getHonorsByFaculty(faculty: Faculty): Student[] {
        return this.getStudentsByFaculty(faculty).filter(student => {
            const averageGrade = this.calculateAverageGrade(student.id);
            return averageGrade >= 4.5; // Визначення відмінника
        });
    }

    // Метод для додавання курсу
    addCourse(course: Omit<Course, "id">): Course {
        const newCourse: Course = { id: this.courseIdCounter++, ...course };
        this.courses.push(newCourse);
        return newCourse;
    }

    // Метод для отримання студентів, зареєстрованих на курс
    private getStudentsByCourse(courseId: number): Student[] {
        const enrolledStudents = this.grades.filter(g => g.courseId === courseId && g.grade !== null);
        return this.students.filter(s => enrolledStudents.some(e => e.studentId === s.id));
    }
}