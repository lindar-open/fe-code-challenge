export const formatTime = (time: number): string => {
  return new Date(time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
};
