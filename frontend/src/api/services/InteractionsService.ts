/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InteractionCreateRequest } from '../models/InteractionCreateRequest';
import type { InteractionCreateResponse } from '../models/InteractionCreateResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InteractionsService {
    /**
     * Create Interaction
     * @param requestBody
     * @returns InteractionCreateResponse Successful Response
     * @throws ApiError
     */
    public static createInteractionInteractionsPost(
        requestBody: InteractionCreateRequest,
    ): CancelablePromise<InteractionCreateResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/interactions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
