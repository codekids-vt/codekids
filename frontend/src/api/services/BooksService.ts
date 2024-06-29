/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Book } from "../models/Book";
import type { BookCategory } from "../models/BookCategory";
import type { CreateBookRequest } from "../models/CreateBookRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class BooksService {
  /**
   * Search Books
   * @param category
   * @param limit
   * @param ownerId
   * @param published
   * @param query
   * @param userToken
   * @returns Book Successful Response
   * @throws ApiError
   */
  public static searchBooksBooksGet(
    category?: BookCategory | null,
    limit?: number | null,
    ownerId?: number | null,
    published?: boolean | null,
    query?: string | null,
    userToken?: string | null,
  ): CancelablePromise<Array<Book>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/books",
      query: {
        category: category,
        limit: limit,
        owner_id: ownerId,
        published: published,
        query: query,
        user_token: userToken,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Create Book
   * @param requestBody
   * @returns Book Successful Response
   * @throws ApiError
   */
  public static createBookBooksPost(
    requestBody: CreateBookRequest,
  ): CancelablePromise<Book> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/books",
      body: requestBody,
      mediaType: "application/json",
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
   * Edit Book
   * @param bookId
   * @param requestBody
   * @returns Book Successful Response
   * @throws ApiError
   */
  public static editBookBooksBookIdPut(
    bookId: number,
    requestBody: CreateBookRequest,
  ): CancelablePromise<Book> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/books/{book_id}",
      path: {
        book_id: bookId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
