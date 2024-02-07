/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookCourse } from './BookCourse';
import type { CourseStudent } from './CourseStudent';
import type { User } from './User';
/**
 * Represents a Course record
 */
export type Course = {
    id: number;
    title: string;
    teacher?: (User | null);
    teacherId: number;
    students?: (Array<CourseStudent> | null);
    books?: (Array<BookCourse> | null);
};

