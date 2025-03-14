/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Chat } from "./Chat";
/**
 * Represents a Message record
 */
export type Message = {
  id: string;
  chatId: string;
  sender: string;
  content: string;
  createdAt: string;
  chat?: Chat | null;
};
