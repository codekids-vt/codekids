/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookCategory } from "./BookCategory";
import type { BookCourse } from "./BookCourse";
import type { Page } from "./Page";
import type { User } from "./User";
/**
 * Represents a Book record
 */
export type Book = {
  id: number;
  bookCover?: string | null;
  coverImage?: string | null;
  title: string;
  blurb?: string | null;
  readyForPublish: boolean;
  published: boolean;
  author: string;
  gradeRange: string;
  category: BookCategory;
  pages?: Array<Page> | null;
  courses?: Array<BookCourse> | null;
  owner?: User | null;
  ownerId: number;
};
