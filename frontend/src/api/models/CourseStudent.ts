/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Course } from "./Course";
import type { User } from "./User";
/**
 * Represents a CourseStudent record
 */
export type CourseStudent = {
  id: number;
  course?: Course | null;
  courseId: number;
  student?: User | null;
  studentId: number;
};
