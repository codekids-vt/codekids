/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DataInput } from '../models/DataInput';
import type { HTTPBasicCredentials } from '../models/HTTPBasicCredentials';
import type { LoginResponse } from '../models/LoginResponse';
import type { MaternityRecord } from '../models/MaternityRecord';
import type { SignupRequest } from '../models/SignupRequest';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Predict
     * @param requestBody
     * @returns MaternityRecord Successful Response
     * @throws ApiError
     */
    public static predictPredictPost(
        requestBody: DataInput,
    ): CancelablePromise<MaternityRecord> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/predict',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
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
    /**
     * Get Results
     * @returns MaternityRecord Successful Response
     * @throws ApiError
     */
    public static getResultsResultsGet(): CancelablePromise<Array<MaternityRecord>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/results',
        });
    }
    /**
     * Add Notification Token
     * @param token
     * @returns any Successful Response
     * @throws ApiError
     */
    public static addNotificationTokenNotificationTokenPost(
        token: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/notification_token',
            query: {
                'token': token,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
