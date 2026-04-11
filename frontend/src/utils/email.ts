export const generatePreview = (body: string, maxLength: number = 80) => {
  if (!body) return "";

  const clean = body.replace(/\n/g, " "); 
  return clean.length > maxLength
    ? clean.substring(0, maxLength) + "..."
    : clean;
};