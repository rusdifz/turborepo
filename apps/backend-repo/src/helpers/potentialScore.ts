export const calculatePotentialScore = (
  totalAverageWeightRatings: number,
  numberOfRents: number,
  recentlyActive: number
): number => {
  const weight1 = 100; // Prioritas tinggi untuk ratings
  const weight2 = 10; // Prioritas sedang untuk jumlah sewa
  const weight3 = 1; // Prioritas rendah untuk aktivitas terakhir

  // Normalisasi recentlyActive (misalnya, dalam rentang 0-1)
  const minTimestamp = 1609459200000; // 1 Jan 2021
  const maxTimestamp = Date.now();
  const recentlyActiveNormalized =
    (recentlyActive - minTimestamp) / (maxTimestamp - minTimestamp);

  return (
    totalAverageWeightRatings * weight1 +
    numberOfRents * weight2 +
    recentlyActiveNormalized * weight3
  );
};
