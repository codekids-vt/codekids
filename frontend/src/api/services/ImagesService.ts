/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_image_images_post } from "../models/Body_upload_image_images_post";
import type { Image } from "../models/Image";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class ImagesService {
  /**
   * Upload Image
   * @param formData
   * @returns Image Successful Response
   * @throws ApiError
   */
  public static uploadImageImagesPost(
    formData: Body_upload_image_images_post,
  ): CancelablePromise<Image> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/images",
      formData: formData,
      mediaType: "multipart/form-data",
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Get Image
   * @param imageId
   * @returns Image Successful Response
   * @throws ApiError
   */
  public static getImageImageImageIdGet(
    imageId: number,
  ): CancelablePromise<Image> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/image/{image_id}",
      path: {
        image_id: imageId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Delete Image
   * Delete an image from both database and MinIO
   * @param imageId
   * @returns any Successful Response
   * @throws ApiError
   */
  public static deleteImageImageImageIdDelete(
    imageId: number,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/image/{image_id}",
      path: {
        image_id: imageId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
