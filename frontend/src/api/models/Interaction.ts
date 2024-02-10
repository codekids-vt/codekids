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
  interactionType: InteractionType;
  userId: number;
  answer?: string | null;
  correct?: boolean | null;
  date: string;
  timeSinceLoad: number;
  question?: Question | null;
  questionId?: number | null;
};
