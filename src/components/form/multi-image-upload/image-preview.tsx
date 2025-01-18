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
    <div className="relative bg-white border rounded-lg overflow-hidden group">
      <div className="aspect-[16/9] relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.url}
          alt={`Uploaded image ${index + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 group-focus-within:bg-opacity-50 transition-opacity duration-200" />
        {image.status === "uploading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Loader2 className="size-8 text-white animate-spin" />
          </div>
        )}
        {image.status === "deleting" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Loader2 className="size-8 text-white animate-spin" />
          </div>
        )}
        {image.status === "error" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <AlertCircle className="size-8 text-red-500" />
          </div>
        )}
        {image.status === "success" && (
          <div className="absolute top-2 right-2 group-hover:hidden group-focus-within:hidden">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
        )}
      </div>
      <div className="absolute top-2 left-2 right-2 flex justify-between items-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
        <div className="flex space-x-1">
          <button
            type="button"
            onClick={onRemove}
            disabled={image.status === "deleting"}
            className="inline-flex items-center justify-center size-8 rounded-md btn bg-red-500"
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
            className="inline-flex items-center justify-center size-8 rounded-md btn-secondary text-white"
            aria-label={`Move image ${index + 1} up`}
          >
            <ChevronUp className="size-4" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast || image.status === "deleting"}
            className="inline-flex items-center justify-center size-8 rounded-md btn-secondary text-white"
            aria-label={`Move image ${index + 1} down`}
          >
            <ChevronDown className="size-4" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 transform translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-200">
        <div className="flex items-center mb-1">
          <FileIcon size={14} className="mr-1" />
          <p className="text-xs font-medium truncate flex-grow">
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
