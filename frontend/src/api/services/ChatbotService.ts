/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Chat } from '../models/Chat';
import type { InteractRequest } from '../models/InteractRequest';
import type { Message } from '../models/Message';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChatbotService {
    /**
     * Interact
     * Merged endpoint that both records the user's message and generates a bot response.
     *
     * Flow:
     * 1. If a chat_id is provided, fetch the chat; if not, create a new chat.
     * 2. Add the user's message to the conversation.
     * 3. Build a conversation context:
     * - If ≤ 25 messages, include all.
     * - If > 25 messages, include the 25 most recent messages plus a summary of up to 10 earlier messages.
     * 4. Append the new user prompt and call ChatGPT to generate a response.
     * 5. Return the ChatGPT response back to the client.
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static interactChatsInteractPost(
        requestBody: InteractRequest,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/chats/interact',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * List Chats
     * @returns Chat Successful Response
     * @throws ApiError
     */
    public static listChatsChatsGet(): CancelablePromise<Array<Chat>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chats',
        });
    }
    /**
     * Get Chat Messages
     * @param chatId
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static getChatMessagesChatsChatIdMessagesGet(
        chatId: string,
    ): CancelablePromise<Array<Message>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chats/{chat_id}/messages',
            path: {
                'chat_id': chatId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
