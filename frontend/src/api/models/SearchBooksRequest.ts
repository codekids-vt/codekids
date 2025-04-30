/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookCategory } from "./BookCategory";
export type SearchBooksRequest = {
  categories?: Array<BookCategory> | null;
  limit?: number | null;
  owner_id?: number | null;
  published?: boolean | null;
  query?: string | null;
};
