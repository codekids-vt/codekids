/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookCategory } from "./BookCategory";
export type CreateBookRequest = {
  title: string;
  category: BookCategory;
  bookTopic?: string | null;
  tags?: Array<string>;
  bookCover?: string | null;
  coverImage?: string | null;
  author?: string | null;
  blurb?: string | null;
  readyForPublish?: boolean | null;
};
