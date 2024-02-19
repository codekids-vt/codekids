/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Book } from './Book';
import type { Course } from './Course';
/**
 * Represents a BookCourse record
 */
export type BookCourse = {
    id: number;
    book?: (Book | null);
    bookId: number;
    course?: (Course | null);
    courseId: number;
};

