export const formatTimestamp = (timestamp: number) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );
  return diffInHours;
};
