import { customers } from "../data/customer_transaction";
import { API_DELAY } from "../constants/constant";

//Simulates an API call to fetch all customer transaction data.
export const getCustomerDetails = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = false

      if (shouldFail) {
        reject(new Error("Failed to fetch transactions"));
      } else {
        resolve(customers);
      }
    }, API_DELAY);
  });
};

//Simulates an API call to fetch a customer by ID.
export const getCustomerById = (customerId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const customer = customers.find(
        (c) => c.customerId === Number(customerId),
      );

      if (customer) {
        resolve(customer);
      } else {
        reject(new Error("Customer not found"));
      }
    }, API_DELAY);
  });
};
