export function toKebabCase(str, lowercase = true) {
  const processedStr = lowercase ? str.trim().toLowerCase() : str.trim();

  return processedStr
    .replace(/[\s_]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}
