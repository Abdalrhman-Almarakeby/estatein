"use client";

import { useId } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/form/input";
import { cn } from "@/lib/utils";
import { ImagePreview } from "./image-preview";
import { useMultiImageUpload } from "./use-multi-image-upload";

type MultiImageUploadProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  maxNumber?: number;
};

const IMAGE_ASPECT_RATIO = "16 / 9";
const MAX_IMAGE_NUMBER = 15;

export function MultiImageUpload<T extends FieldValues>({
  name,
  control,
  maxNumber = MAX_IMAGE_NUMBER,
}: MultiImageUploadProps<T>) {
  const imageUploadId = useId();

  const { images, isUploading, handleImageChange, moveImage, removeImage } =
    useMultiImageUpload({ name, control, maxNumber });

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white p-4 text-center transition-colors",
          !isUploading && "focus-within:bg-gray-dark hover:bg-gray-dark",
        )}
      >
        <label
          htmlFor={imageUploadId}
          className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center"
        >
          {isUploading ? (
            <Loader2 className="mb-2 size-8 animate-spin text-white" />
          ) : (
            <Camera className="mb-2 size-8 text-white" />
          )}
          <span className="text-sm font-medium text-white">
            {isUploading ? "Uploading..." : "Click or drop images here"}
          </span>
          <span className="mt-1 text-xs text-gray-light">
            Max {maxNumber} images • {IMAGE_ASPECT_RATIO} aspect ratio
          </span>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageChange(e.target.files)}
            disabled={isUploading}
            id={imageUploadId}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:opacity-0"
          />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <ImagePreview
            key={image.id}
            image={image}
            index={index}
            onRemove={() => removeImage(index)}
            onMoveUp={() => moveImage(index, index - 1)}
            onMoveDown={() => moveImage(index, index + 1)}
            isFirst={index === 0}
            isLast={index === images.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
