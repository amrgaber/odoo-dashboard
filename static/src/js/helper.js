function generateDynamicColors(count) {
  const hueStep = 360 / count;
  return Array.from({ length: count }, (_, i) => {
      const hue = i * hueStep;
      return `hsl(${hue}, 70%, 50%)`;
  });
}