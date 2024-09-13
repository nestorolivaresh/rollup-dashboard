export const formatTimestamp = (timestamp: number): string => {
  if (!timestamp) return "Invalid Timestamp";
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
