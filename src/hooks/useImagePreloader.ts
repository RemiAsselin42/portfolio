import { useEffect } from "react";

export const useImagePreloader = (images: string[]) => {
  useEffect(() => {
    if (!images || images.length === 0) return;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);
};
