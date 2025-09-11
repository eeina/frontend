export const formatTimeLocalized = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}`;
  }
  return `${hours}:${mins.toString().padStart(2, "0")}`;
};
