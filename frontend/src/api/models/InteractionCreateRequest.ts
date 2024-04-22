/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InteractionType } from "./InteractionType";
export type InteractionCreateRequest = {
  interaction_type: InteractionType;
  time_since_load: number;
  user_id?: number | null;
  question_id?: number | null;
  answer?: string | null;
  correct?: boolean | null;
  book_id?: number | null;
  page_id?: number | null;
};
