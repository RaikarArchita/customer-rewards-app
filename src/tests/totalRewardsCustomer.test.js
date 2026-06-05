import { describe, it, expect } from "vitest";
import { customers } from "../data/customer_transaction";
import { calculateCustomerTotalRewards } from "../utils/getCustomerTotalRewards";

describe("calculate total rewards for a customer", () => {
  it("should calculate monthly rewards for Ava Thompson", () => {
    const customer = customers.find((customer) => customer.customerId === 1008);

    const result = calculateCustomerTotalRewards(customer);

    expect(result.customerId).toBe(1008);
    expect(result.customerName).toBe("Ava Thompson");
    expect(result.totalAmountSpent).toBe(1520);
    expect(result.totalRewards).toBe(1990);
  });
});
