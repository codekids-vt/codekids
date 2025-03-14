/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Message } from "./Message";
import type { User } from "./User";
/**
 * Represents a Chat record
 */
export type Chat = {
  id: string;
  userId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages?: Array<Message> | null;
  user?: User | null;
};
