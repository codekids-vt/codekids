/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Book } from "./Book";
import type { Question } from "./Question";
/**
 * Represents a Page record
 */
export type Page = {
  id: number;
  pageNumber: number;
  content: any;
  image: string;
  props?: null;
  book?: Book | null;
  bookId: number;
  questions?: Array<Question> | null;
};
