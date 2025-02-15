export function calculatePotentialScore(
  totalAverageWeightRatings: number,
  numberOfRents: number,
  recentlyActive: number
) {
  console.log("tot", totalAverageWeightRatings);
  console.log("num", numberOfRents);
  console.log("rece", recentlyActive);

  const weight1 = 10000000000; // first priority for ratings
  const weight2 = 100000; // second priority for rent
  const weight3 = 1; // third priority for recent activity

  //Normalisasi recentlyActive
  // const minTimestamp = 1735689600000; // 1 jan 2025
  const maxTimestamp = 2147483647;
  const recentlyActiveNormalized = maxTimestamp - recentlyActive;
  // const recentlyActiveNormalized =
  //   (recentlyActive - minTimestamp) / (maxTimestamp - minTimestamp);

  const a = totalAverageWeightRatings * weight1;
  const b = numberOfRents * weight2;
  const calculate = a + b + (maxTimestamp - recentlyActive);

  // const MAX_TIMESTAMP = 2147483647;
  //
  // const potentialScore =
  //   (user.totalAverageWeightRatings * 10000000000) +
  //   (user.numberOfRents * 100000) +
  //   (MAX_TIMESTAMP - user.recentlyActive);

  return calculate;

  //   // Precompute di Cloud Function saat update user
  // const MAX_TIMESTAMP = 2147483647;

  // const potentialScore =
  //   (user.totalAverageWeightRatings * 10000000000) +
  //   (user.numberOfRents * 100000) +
  //   (MAX_TIMESTAMP - user.recentlyActive);
}
