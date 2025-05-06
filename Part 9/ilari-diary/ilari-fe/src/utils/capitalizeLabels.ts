export const formatLabel = (s: string) =>
  s
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
