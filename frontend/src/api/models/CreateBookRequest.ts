/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookCategory } from "./BookCategory";
export type CreateBookRequest = {
  title: string;
  category: BookCategory;
  gradeRange: string;
  bookCover?: string | null;
  coverImage?: string | null;
  author?: string | null;
  blurb?: string | null;
};
