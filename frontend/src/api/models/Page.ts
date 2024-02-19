/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Book } from './Book';
import type { Question } from './Question';
/**
 * Represents a Page record
 */
export type Page = {
    id: number;
    number: number;
    book?: (Book | null);
    bookId: number;
    questions?: (Array<Question> | null);
};

