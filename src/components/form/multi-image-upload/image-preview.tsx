import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle,
  Edit2,
  FileIcon,
  Loader2,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useImageDetails } from "./use-image-details";
import { ImageItem } from "./use-multi-image-upload";

type ImagePreviewProps = {
  image: ImageItem;
  index: number;
  onEdit: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
};

export function ImagePreview({
  image,
  index,
  onEdit,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: ImagePreviewProps) {
  const imageDetails = useImageDetails(image);

  return (
    <div className="relative bg-white border rounded-lg overflow-hidden group">
      {/* // TODO: Make the aspect ration dynamic */}
      <div className="aspect-[16/9] relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.url}
          alt={`Uploaded image ${index + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200" />
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
          <div className="absolute top-2 right-2 group-hover:hidden">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
        )}
      </div>
      <div className="absolute top-2 left-2 right-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={onEdit}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
            aria-label={`Edit image ${index + 1}`}
          >
            <Edit2 size={16} />
          </button>
          <button
            type="button"
            onClick={onRemove}
            disabled={image.status === "deleting"}
            className={cn(
              "p-2 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black",
              image.status === "deleting"
                ? "bg-gray-500"
                : "bg-red-500 hover:bg-red-600",
            )}
            aria-label={`Remove image ${index + 1}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst || image.status === "deleting"}
            className={cn(
              "p-2 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black",
              isFirst || image.status === "deleting"
                ? "bg-gray-400 cursor-not-allowed focus:ring-gray-400"
                : "bg-gray-500 hover:bg-gray-600 focus:ring-gray-400",
            )}
            aria-label={`Move image ${index + 1} up`}
          >
            <ArrowUp size={16} />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast || image.status === "deleting"}
            className={cn(
              "p-2 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black",
              isLast || image.status === "deleting"
                ? "bg-gray-400 cursor-not-allowed focus:ring-gray-400"
                : "bg-gray-500 hover:bg-gray-600 focus:ring-gray-400",
            )}
            aria-label={`Move image ${index + 1} down`}
          >
            <ArrowDown size={16} />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
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
        {image.status !== "success" && (
          <p className="text-xs mt-1">
            {
              {
                uploading: "Uploading...",
                deleting: "Deleting...",
                error: "Upload failed",
              }[image.status]
            }
          </p>
        )}
      </div>
    </div>
  );
}
