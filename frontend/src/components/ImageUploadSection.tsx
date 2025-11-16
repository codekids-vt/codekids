import { useRef, useState } from "react";
import { ImagesService, Body_upload_image_images_post } from "../api";

export function ImageUploadSection({
  tempImage,
  setTempImage,
  showLabel = false,
}: {
  tempImage: string;
  setTempImage: (value: string) => void;
  showLabel?: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const uploadToMinIO = async (file: File): Promise<string> => {
    try {
      console.log("=== Upload Debug Info ===");
      console.log("File name:", file.name);
      console.log("File type:", file.type);
      console.log("File size:", file.size);
      console.log("File lastModified:", new Date(file.lastModified));

      // Verify file is readable
      const fileContent = await file.arrayBuffer();
      console.log("File content length:", fileContent.byteLength);

      // Create the form data object matching the generated type
      const formData: Body_upload_image_images_post = {
        image: file,
      };

      console.log("Sending request...");

      // Use the generated ImagesService
      const result = await ImagesService.uploadImageImagesPost(formData);

      console.log("Upload successful:", result);

      if (!result.image_url) {
        throw new Error("No image URL returned from server");
      }

      return result.image_url;
    } catch (error: any) {
      console.error("=== Upload Error ===");
      console.error("Error object:", error);
      console.error("Error status:", error.status);
      console.error("Error body:", error.body);
      console.error("Error message:", error.message);

      // Handle validation errors
      if (error.status === 422) {
        const detail = error.body?.detail || "Invalid image data";
        throw new Error(`Validation error: ${JSON.stringify(detail)}`);
      }

      if (error.status === 400) {
        throw new Error(error.body?.detail || "Bad request - invalid image");
      }

      // Handle API errors
      if (error.body?.detail) {
        throw new Error(error.body.detail);
      }

      if (error instanceof Error) {
        throw new Error(`Failed to upload: ${error.message}`);
      }

      throw new Error("Failed to upload to MinIO");
    }
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file");
      return;
    }

    // Validate file size (e.g., 10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setUploadError("File size must be less than 10MB");
      return;
    }

    setUploadError("");
    setIsUploading(true);

    try {
      const minioUrl = await uploadToMinIO(file);
      setTempImage(minioUrl);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-green-100");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("bg-green-100");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-green-100");

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const event = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(event);
    }
  };

  return (
    <div className="flex flex-col w-full min-w-0 gap-3">
      {/* Conditionally show label */}
      {showLabel && <div>image url or path:</div>}

      <div className="flex flex-col gap-2 w-full">
        {/* URL Input */}
        <input
          className="w-full h-15 border-2 p-2 rounded-xl border-primary-green focus:outline-none min-w-0"
          value={tempImage}
          onChange={(e) => setTempImage(e.target.value)}
          placeholder="Enter image URL or upload a file"
          disabled={isUploading}
        />

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full border-2 border-dashed border-primary-green rounded-xl p-4 text-center cursor-pointer transition-colors min-w-0 ${
            isUploading
              ? "bg-gray-100 cursor-not-allowed opacity-60"
              : "hover:bg-green-50"
          }`}
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isUploading}
            className="hidden"
          />
          <div className="text-gray-600">
            {isUploading ? (
              <>
                <div className="text-sm mb-1">⏳ Uploading...</div>
                <div className="text-xs text-gray-500">Please wait</div>
              </>
            ) : (
              <>
                <div className="text-sm mb-1">
                  📁 Click to upload or drag and drop
                </div>
                <div className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </div>
              </>
            )}
          </div>
        </div>

        {/* Error Message */}
        {uploadError && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
            ❌ {uploadError}
          </div>
        )}
      </div>
    </div>
  );
}
