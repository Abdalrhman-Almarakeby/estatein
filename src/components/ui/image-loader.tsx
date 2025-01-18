"use client";

import { ReactNode, useEffect, useState } from "react";

type ImageLoaderProps = {
  images: string[];
  loading: ReactNode;
  children: ReactNode;
};
export function ImageLoader({ images, loading, children }: ImageLoaderProps) {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const imagePromises = images.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        }),
    );

    Promise.all(imagePromises).then(() => setLoaded(true));
  }, [images]);

  if (!loaded) return loading;
  return <>{children}</>;
}
