import { useCallback, useEffect, useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { generateId } from "@/lib/utils";
import { deleteImage, uploadImage } from "@/server/actions";

export type UploadStatus = "uploading" | "success" | "error" | "deleting";

export type ImageItem = {
  id: string;
  url: string;
  file: File;
  status: UploadStatus;
};

type UseMultiImageUploadProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  maxNumber: number;
};

export function useMultiImageUpload<T extends FieldValues>({
  name,
  control,
  maxNumber,
}: UseMultiImageUploadProps<T>) {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const [images, setImages] = useState<ImageItem[]>(
    Array.isArray(value)
      ? value.map((url: string) => ({
          id: generateId(),
          url,
          file: new File([], "placeholder"),
          status: "success" as const,
        }))
      : [],
  );
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const successImages = images
      .filter((img) => img.status === "success")
      .map((img) => img.url);

    // Only trigger onChange if the values are actually different
    if (JSON.stringify(successImages) !== JSON.stringify(value)) {
      onChange(successImages);
    }
  }, [images, onChange, value]);

  const uploadSingleImage = async (image: ImageItem): Promise<ImageItem> => {
    const formData = new FormData();
    formData.append("file", image.file);

    const { success, url } = await uploadImage(formData);

    if (success && url) {
      return { ...image, url, status: "success" as const };
    }

    return { ...image, status: "error" as const };
  };

  const addImages = useCallback(async (newImages: File[]) => {
    setIsUploading(true);

    const optimisticImages = newImages.map((file) => ({
      id: generateId(),
      url: URL.createObjectURL(file),
      file,
      status: "uploading" as const,
    }));

    setImages((prevImages) => [...prevImages, ...optimisticImages]);

    for (const image of optimisticImages) {
      const uploadedImage = await uploadSingleImage(image);
      setImages((prevImages) =>
        prevImages.map((img) =>
          img.id === uploadedImage.id ? uploadedImage : img,
        ),
      );
    }

    setImages((prevImages) =>
      prevImages.filter((img) => img.status !== "uploading"),
    );
    setIsUploading(false);
  }, []);

  const handleImageChange = useCallback(
    async (files: FileList | null) => {
      if (files && files.length > 0) {
        const filesToUpload = Array.from(files).slice(
          0,
          maxNumber - images.length,
        );
        await addImages(filesToUpload);
      }
    },
    [addImages, images.length, maxNumber],
  );

  const moveImage = useCallback((fromIndex: number, toIndex: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      const [removed] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, removed);
      return newImages;
    });
  }, []);

  const removeImage = useCallback(
    async (index: number) => {
      const imageToRemove = images[index];

      setImages((prevImages) =>
        prevImages.map((img, i) =>
          i === index ? { ...img, status: "deleting" } : img,
        ),
      );

      if (imageToRemove.status === "success") {
        const result = await deleteImage(imageToRemove.url);
        if (!result.success) {
          setImages((prevImages) =>
            prevImages.map((img, i) =>
              i === index ? { ...img, status: "success" } : img,
            ),
          );
          return;
        }
      }

      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    },
    [images],
  );

  return {
    images,
    isUploading,
    handleImageChange,
    moveImage,
    removeImage,
  };
}
