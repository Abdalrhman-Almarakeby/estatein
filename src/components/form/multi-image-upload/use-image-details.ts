import { useEffect, useState } from "react";
import { formatFileSize } from "@/lib/utils";
import { ImageItem } from "./use-multi-image-upload";

export type ImageDetails = {
  width: number;
  height: number;
  size: string;
};

export function useImageDetails(image: ImageItem) {
  const [imageDetails, setImageDetails] = useState<ImageDetails | null>(null);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setImageDetails({
        width: img.width,
        height: img.height,
        size: formatFileSize(image.file.size),
      });
    };

    img.src = image.url;
  }, [image]);

  return imageDetails;
}
