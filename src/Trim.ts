export const trim = (input: string): string => {
  return input
    .replace(/%/g, "")
    .replace(/kr/g, "")
    .replace(" ", "")
    .replace(",", ".")
    .replace(/_/g, " ");
};
