/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Book } from "../models/Book";
import type { BookCategory } from "../models/BookCategory";
import type { Page } from "../models/Page";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class BooksService {
  /**
   * Search Books
   * @param category
   * @param limit
   * @returns Book Successful Response
   * @throws ApiError
   */
  public static searchBooksBooksGet(
    category?: BookCategory | null,
    limit: number = 10,
  ): CancelablePromise<Array<Book>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/books",
      query: {
        category: category,
        limit: limit,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Get Book
   * @param bookId
   * @returns Book Successful Response
   * @throws ApiError
   */
  public static getBookBooksBookIdGet(bookId: number): CancelablePromise<Book> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/books/{book_id}",
      path: {
        book_id: bookId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Get Page
   * @param bookId
   * @param pageId
   * @returns Page Successful Response
   * @throws ApiError
   */
  public static getPagePagesBookIdPageIdGet(
    bookId: number,
    pageId: number,
  ): CancelablePromise<Page> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/pages/{book_id}/{page_id}",
      path: {
        book_id: bookId,
        page_id: pageId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
