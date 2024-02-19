/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountType } from './AccountType';
import type { Course } from './Course';
import type { CourseStudent } from './CourseStudent';
import type { Interaction } from './Interaction';
/**
 * Represents a User record
 */
export type User = {
    id: number;
    token: string;
    type: AccountType;
    name?: (string | null);
    email?: (string | null);
    password?: (string | null);
    interactions?: (Array<Interaction> | null);
    courses?: (Array<Course> | null);
    CourseStudent?: (Array<CourseStudent> | null);
};

