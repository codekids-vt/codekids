/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Page } from "../models/Page";
import type { UpdatePage } from "../models/UpdatePage";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class PagesService {
  /**
   * Page Update
   * @param pageId
   * @param requestBody
   * @returns Page Successful Response
   * @throws ApiError
   */
  public static pageUpdatePagePageIdPut(
    pageId: number,
    requestBody: UpdatePage,
  ): CancelablePromise<Page> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/page/{page_id}",
      path: {
        page_id: pageId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
