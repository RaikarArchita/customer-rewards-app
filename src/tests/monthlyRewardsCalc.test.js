import { describe, it, expect } from "vitest";
import { getMonthlyRewards } from "../utils/getMonthlyRewards";
import { customers } from "../data/customer_transaction";

describe("getMonthlyRewards", () => {
  it("should calculate monthly rewards for Emma Wilson", () => {
    const customer = customers.find((customer) => customer.customerId === 1002);

    const monthlyRewards = getMonthlyRewards(customer.transactions);

    const nov_month = monthlyRewards.find(
      (month) => month.year === 2024 && month.month === "November",
    );

    expect(nov_month).toEqual({
      month: "November",
      year: 2024,
      monthIndex: 10,
      totalAmount: 355,
      totalRewards: 410,
      transactionCount: 2,
    });
  });
});
