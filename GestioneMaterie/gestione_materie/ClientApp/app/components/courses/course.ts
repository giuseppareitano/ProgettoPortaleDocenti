import { Student } from '../students/student';
import { Test } from '../../components/tests/test';
export interface Course {
    id: number;
    courseName: string;
    credits: number;
    enrolledStudents: Student[];
    hours: number;
    tests: Test[];
}