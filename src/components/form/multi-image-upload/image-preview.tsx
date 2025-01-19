import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileIcon,
  Loader2,
  Trash2,
} from "lucide-react";
import { useImageDetails } from "./use-image-details";
import { ImageItem } from "./use-multi-image-upload";

type ImagePreviewProps = {
  image: ImageItem;
  index: number;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
};

export function ImagePreview({
  image,
  index,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: ImagePreviewProps) {
  const imageDetails = useImageDetails(image);

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white">
      <div className="relative aspect-[16/9]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.url}
          alt={`Uploaded image ${index + 1}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-200 group-focus-within:bg-opacity-50 group-hover:bg-opacity-50" />
        {image.status === "uploading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Loader2 className="size-8 animate-spin text-white" />
          </div>
        )}
        {image.status === "deleting" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Loader2 className="size-8 animate-spin text-white" />
          </div>
        )}
        {image.status === "error" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <AlertCircle className="size-8 text-red-500" />
          </div>
        )}
        {image.status === "success" && (
          <div className="absolute right-2 top-2 group-focus-within:hidden group-hover:hidden">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
        )}
      </div>
      <div className="absolute left-2 right-2 top-2 flex items-center justify-between opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100">
        <div className="flex space-x-1">
          <button
            type="button"
            onClick={onRemove}
            disabled={image.status === "deleting"}
            className="btn inline-flex size-8 items-center justify-center rounded-md bg-red-500"
            aria-label={`Remove image ${index + 1}`}
          >
            <Trash2 className="size-4" />
          </button>
        </div>
        <div className="flex space-x-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst || image.status === "deleting"}
            className="btn-secondary inline-flex size-8 items-center justify-center rounded-md text-white"
            aria-label={`Move image ${index + 1} up`}
          >
            <ChevronUp className="size-4" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast || image.status === "deleting"}
            className="btn-secondary inline-flex size-8 items-center justify-center rounded-md text-white"
            aria-label={`Move image ${index + 1} down`}
          >
            <ChevronDown className="size-4" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 translate-y-full transform bg-black bg-opacity-70 p-2 text-white transition-transform duration-200 group-focus-within:translate-y-0 group-hover:translate-y-0">
        <div className="mb-1 flex items-center">
          <FileIcon size={14} className="mr-1" />
          <p className="flex-grow truncate text-xs font-medium">
            {image.file.name}
          </p>
        </div>
        {imageDetails && (
          <div className="flex justify-between text-xs">
            <span>
              {imageDetails.width} x {imageDetails.height}px
            </span>
            <span className="font-semibold">{imageDetails.size}</span>
          </div>
        )}
      </div>
    </div>
  );
}
