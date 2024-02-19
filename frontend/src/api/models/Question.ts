/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Interaction } from './Interaction';
import type { Page } from './Page';
/**
 * Represents a Question record
 */
export type Question = {
    id: number;
    question: string;
    answer: string;
    options: Array<string>;
    questionAttempts?: (Array<Interaction> | null);
    page?: (Page | null);
    pageId: number;
};

