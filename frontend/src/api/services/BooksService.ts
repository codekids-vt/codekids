/* generated using openapi-typescript-codegen -- do not edit */
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
   * @param bookTopic
   * @param limit
   * @param ownerId
   * @param published
   * @param query
   * @returns Book Successful Response
   * @throws ApiError
   */
  public static searchBooksBooksGet(
    category?: BookCategory | null,
    bookTopic?: string | null,
    limit?: number | null,
    ownerId?: number | null,
    published?: boolean | null,
    query?: string | null,
  ): CancelablePromise<Array<Book>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/books",
      query: {
        category: category,
        bookTopic: bookTopic,
        limit: limit,
        owner_id: ownerId,
        published: published,
        query: query,
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
  /**
     * Get Unique Book Topics
     * @returns string Successful Response
     * @throws ApiError
     */
  public static getUniqueBookTopicsBookTopicsGet(): CancelablePromise<Array<string>> {
    return __request(OpenAPI, {
        method: 'GET',
        url: '/book-topics',
    });
  }
}

