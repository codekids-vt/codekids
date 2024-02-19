/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Course } from '../models/Course';
import type { CourseCreateRequest } from '../models/CourseCreateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CoursesService {
    /**
     * Get Courses
     * @returns Course Successful Response
     * @throws ApiError
     */
    public static getCoursesCoursesGet(): CancelablePromise<Array<Course>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses',
        });
    }
    /**
     * Create Course
     * @param requestBody
     * @returns Course Successful Response
     * @throws ApiError
     */
    public static createCourseCoursesPost(
        requestBody: CourseCreateRequest,
    ): CancelablePromise<Course> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/courses',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Course
     * @param courseId
     * @returns Course Successful Response
     * @throws ApiError
     */
    public static getCourseCoursesCourseIdGet(
        courseId: number,
    ): CancelablePromise<Course> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses/{course_id}',
            path: {
                'course_id': courseId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
