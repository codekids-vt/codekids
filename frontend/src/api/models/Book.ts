/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookCourse } from "./BookCourse";
import type { Page } from "./Page";
/**
 * Represents a Book record
 */
export type Book = {
  id: number;
  number: number;
  pages?: Array<Page> | null;
  courses?: Array<BookCourse> | null;
};
