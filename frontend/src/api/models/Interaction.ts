/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InteractionType } from "./InteractionType";
import type { Question } from "./Question";
import type { User } from "./User";
/**
 * Represents a Interaction record
 */
export type Interaction = {
  id: number;
  user?: User | null;
  userId?: number | null;
  interactionType: InteractionType;
  answer?: string | null;
  correct?: boolean | null;
  date: string;
  timeSinceLoad: number;
  bookId?: number | null;
  pageId?: number | null;
  thumbsUp?: boolean | null;
  question?: Question | null;
  questionId?: number | null;
};
