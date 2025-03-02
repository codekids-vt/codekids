/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Book } from "../models/Book";
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
  /**
   * Page Delete
   * @param pageId
   * @returns Book Successful Response
   * @throws ApiError
   */
  public static pageDeletePagePageIdDelete(
    pageId: number,
  ): CancelablePromise<Book> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/page/{page_id}",
      path: {

        page_id: pageId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Page Create
   * @param bookId
   * @returns Page Successful Response
   * @throws ApiError
   */
  public static pageCreatePagePost(bookId: number): CancelablePromise<Page> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/page",
      query: {
        bookId: bookId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Page Swap
   * @param pageId1
   * @param pageId2
   * @returns Book Successful Response
   * @throws ApiError
   */
  public static pageSwapPageSwapPageId1PageId2Put(
    pageId1: number,
    pageId2: number,
  ): CancelablePromise<Book> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/page/swap/{page_id1}/{page_id2}",
      path: {
        page_id1: pageId1,
        page_id2: pageId2,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

//   public static pageCreateHints(
//     bookId: number,
//     pageId: number,
//     content: string[],
//     props: Record<string, unknown>,
//   ): CancelablePromise<Page> {
//     console.log(" pageservice pagecreate hints")
//     return __request(OpenAPI, {
//       method: "POST",
//       url: "/page/createhints",
//       query: {
//         bookId: bookId,
//         pageId: pageId,
//       },
//       body: {
//         content: content,
//         props: props,
//       },
//       errors: {
//         422: `Validation Error`,
//       },
//     });
//   }
// }

public static pageCreateHints(
  bookId: number,
  content: string[]
): CancelablePromise<Page> {
  console.log("Calling /page/createhints API");
  
  return __request(OpenAPI, {
    method: "POST",
    url: "/page/createhints",
    query: {
      bookId: bookId,  // ✅ bookId as a query param
    },
    body: {
      content: content,  // ✅ Content should be inside request body
    },
    mediaType: "application/json", // ✅ Ensure correct Content-Type
    errors: {
      422: `Validation Error`,
    },
  });
}
}