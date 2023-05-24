export function formatDate(stringDate) {
  const date = new Date(stringDate)
  return date?.toISOString().slice(0, 10)
}