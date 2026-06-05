import { calculateRewardPoints } from "./getRewardPoints";

export const getMonthlyRewards = (transactions) => {
  const groupedRewards = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);

    const year = date.getFullYear();
    const month = date.toLocaleString("default", {
      month: "long",
    });

    const key = `${year}-${date.getMonth()}`;

    if (!groupedRewards[key]) {
      groupedRewards[key] = {
        month,
        year,
        monthIndex: date.getMonth(),
        totalAmount: 0,
        totalRewards: 0,
        transactionCount: 0,
      };
    }

    groupedRewards[key].totalAmount += transaction.amount;
    groupedRewards[key].totalRewards += calculateRewardPoints(
      transaction.amount,
    );
    groupedRewards[key].transactionCount += 1;
  });

  return Object.values(groupedRewards);
};