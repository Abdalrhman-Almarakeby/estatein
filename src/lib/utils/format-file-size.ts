export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const kilobyte = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const sizeIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(kilobyte)),
    sizes.length - 1,
  );

  const formattedSize = (bytes / Math.pow(kilobyte, sizeIndex)).toFixed(2);

  return `${parseFloat(formattedSize)} ${sizes[sizeIndex]}`;
}
