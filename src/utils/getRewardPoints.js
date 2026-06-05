/**
 * Calculates reward points for a transaction based on the rewards program rules.
 * Awards 1 point per dollar spent between $50–$100 and 2 points per dollar spent above $100.
 */

export const calculateRewardPoints = (amount) => {
  const value = Number(amount);

  if (!value || value <= 50) return 0;

  let points;

  if (value <= 100) {
    points = value - 50;
  } else {
    points = 50 + (value - 100) * 2;
  }

  return Math.round(points);
};
