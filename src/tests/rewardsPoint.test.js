import { describe, test, expect } from "vitest";
import { calculateRewardPoints } from "../utils/getRewardPoints";

// Test suite for the calculateRewardPoints function, which calculates reward points based on the amount spent.
describe("calculateRewardPoints", () => {
  test("returns 0 for amount <= 50", () => {
    expect(calculateRewardPoints(50)).toBe(0);
  });

  test("returns 25 for amount 75", () => {
    expect(calculateRewardPoints(75)).toBe(25);
  });

  test("returns 90 for amount 120", () => {
    expect(calculateRewardPoints(120)).toBe(90);
  });

  test("returns 50 for amount 100", () => {
    expect(calculateRewardPoints(100)).toBe(50);
  });

  test("returns 551 for amount 350.66", () => {
    expect(calculateRewardPoints(350.66)).toBe(551);
  });

  test("returns 118 for amount 134.22", () => {
    expect(calculateRewardPoints(134.22)).toBe(118);
  });

  test("returns 291 for amount 220.66", () => {
    expect(calculateRewardPoints(220.66)).toBe(291);
  });
});
