/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HTTPBasicCredentials } from '../models/HTTPBasicCredentials';
import type { LoginResponse } from '../models/LoginResponse';
import type { SignupRequest } from '../models/SignupRequest';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Signup
     * @param requestBody
     * @returns LoginResponse Successful Response
     * @throws ApiError
     */
    public static signupSignupPost(
        requestBody: SignupRequest,
    ): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get User Data
     * @returns User Successful Response
     * @throws ApiError
     */
    public static getUserDataUserMeGet(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/me',
        });
    }
    /**
     * Login
     * @param requestBody
     * @returns LoginResponse Successful Response
     * @throws ApiError
     */
    public static loginLoginPost(
        requestBody: HTTPBasicCredentials,
    ): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
