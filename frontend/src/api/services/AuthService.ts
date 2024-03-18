/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HTTPBasicCredentials } from "../models/HTTPBasicCredentials";
import type { SignupRequest } from "../models/SignupRequest";
import type { UpdateUserRequest } from "../models/UpdateUserRequest";
import type { UserLightNoPassword } from "../models/UserLightNoPassword";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AuthService {
  /**
   * Signup
   * @param requestBody
   * @returns UserLightNoPassword Successful Response
   * @throws ApiError
   */
  public static signupSignupPost(
    requestBody: SignupRequest,
  ): CancelablePromise<UserLightNoPassword> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/signup",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Get User Data
   * @returns UserLightNoPassword Successful Response
   * @throws ApiError
   */
  public static getUserDataUserMeGet(): CancelablePromise<UserLightNoPassword> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/user/me",
    });
  }
  /**
   * Update User Data
   * @param requestBody
   * @returns any Successful Response
   * @throws ApiError
   */
  public static updateUserDataUserMePut(
    requestBody: UpdateUserRequest,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/user/me",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Delete User Account
   * @returns any Successful Response
   * @throws ApiError
   */
  public static deleteUserAccountUserMeDelete(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/user/me",
    });
  }
  /**
   * Login
   * @param requestBody
   * @returns UserLightNoPassword Successful Response
   * @throws ApiError
   */
  public static loginLoginPost(
    requestBody: HTTPBasicCredentials,
  ): CancelablePromise<UserLightNoPassword> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/login",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
