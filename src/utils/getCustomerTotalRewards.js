import { calculateRewardPoints } from "./getRewardPoints";

/**
 * Calculates a customer's reward summary by aggregating reward points and transaction amounts from all transactions.
 * Returns total rewards, total spend, transaction count breakdowns.
 */
export const calculateCustomerTotalRewards = (customer) => {
  let totalRewards = 0;
  let totalAmountSpent = 0;
  let totalTransactions = 0;

  customer.transactions.forEach((transaction) => {
    const points = calculateRewardPoints(transaction.amount);

    totalRewards += points;
    totalAmountSpent += transaction.amount;
    totalTransactions++;
  });

  return {
    customerId: customer.customerId,
    customerName: customer.name,
    totalTransactions,
    totalAmountSpent,
    totalRewards,
  };
};