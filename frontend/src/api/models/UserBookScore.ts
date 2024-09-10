/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Book } from "./Book";
import type { User } from "./User";
/**
 * Represents a UserBookScore record
 */
export type UserBookScore = {
  id: number;
  userId: number;
  bookId: number;
  score: number;
  user?: User | null;
  book?: Book | null;
};
