<h1>Customer Rewards Program</h1>

A React-based customer rewards dashboard that calculates and displays reward points earned by customers based on transaction history.

<h3>Overview</h3>

This application simulates a customer rewards program where:<br>
  - Customers earn 1 point for every dollar spent between $50 and $100.<br>
  - Customers earn 2 points for every dollar spent above $100.<br>
  - Rewards are calculated per transaction and aggregated monthly and overall.<br>

Example:
Transaction Amount: $120
Reward Points: (50 × 1) + (20 × 2) = 90 points

<h3>Features</h3>

<h5>Dashboard</h5>
  View all customers and their reward summaries.<br>
- Display: <br>
  - Total customers<br>
  - Total transactions<br>
  - Total reward points<br>
  - Customer-level reward and transaction aggregation<br>
  - Client-side pagination<br>

<h5>Customer Details</h5>
  View detailed information for a selected customer.<br>
-Display:<br>
  - Total transactions<br>
  - Total amount spent<br>
  - Total reward points

Toggle between:<br>
  - Filter by Year<br>
  - Filter by Month<br>
  - Sort by newset first/oldest first
  - Transaction-level reward details with dates

<h5>User Experience</h5>
  Loading skeleton while data is being fetched.<br>
  Error handling for failed API requests.<br>
  Responsive UI built with Material UI.<br>
  Navigation using React Router.
  
<h3>Testing</h3>
Unit tests for reward point calculation logic using Vitest.

<h3>Tech Stack</h3>
  React 19<br>
  Vite<br>
  Material UI (MUI)<br>
  React Router<br>
  Vitest

<h3>Project Structure</h3>
<pre>
src/
├── components/
│   ├── cards/
│   ├── error_component/
│   └── loading_skeleton/
│
├── data/
│   └── customer_transaction.js
│ 
├── constants/
│   └── constants.js
│  
├── styles/
│   
├── services/
│   └── getCustomerDetails.js
│
├── utils/
│   ├── getRewardPoints.js
│   └── getCustomerTotalRewards.js
│
├── views/
│   ├── dashboard/
│   └── customer_detail/
│ 
├── hooks/
│   └── useDebounce.js
│ 
├── routers/
├── theme/
└── tests/
</pre>

<h3>Installation</h3>

Clone the repository:<br>
git clone https://github.com/RaikarArchita/customer-rewards-program.git<br>

Install dependencies:<br>
npm install<br>

Start the development server:<br>
npm run dev<br>

<h3>Run Tests</h3>
npm run test<br>

<h3>Build for Production</h3>
npm run build

<h3>Assumptions</h3>
Transaction data is mocked locally.<br>
API calls are simulated using Promises and timeouts.<br>

<h3>Screenshots</h3>

<h4>Dashboard</h4>
<img width="1918" height="875" alt="image" src="https://github.com/user-attachments/assets/22a4e2bc-d791-4bf1-8cbd-f747cee68590" />

<h4>Search by Customer Name</h4>
<img width="1918" height="640" alt="image" src="https://github.com/user-attachments/assets/c6ab8910-6fde-4eee-a2a0-9dcb547679dc" />

<h4>Search by Customer Name , No Matches found</h4>
<img width="1918" height="713" alt="image" src="https://github.com/user-attachments/assets/34c12390-6b6c-476c-9c91-285b494db535" />

<h4>Customer Detail Page</h4>

<h5>Default Options</h5>
<img width="1901" height="860" alt="image" src="https://github.com/user-attachments/assets/07d75941-7069-41cd-9d2a-06206c3915e9" />

<h5>Filter by Year</h5
<img width="1903" height="867" alt="image" src="https://github.com/user-attachments/assets/b4ba85bf-981b-4059-8a9d-90c464c2a0f7" />

<h5>Filter by Month</h5>
<img width="1916" height="865" alt="image" src="https://github.com/user-attachments/assets/b23ef228-dbc5-4582-a567-fb9493781c52" />

<h5>Sort By Oldest</h5>
<img width="1890" height="868" alt="image" src="https://github.com/user-attachments/assets/8f5c7b8f-7924-4875-8128-e4e908640eec" />

<h5>View By Date</h5>
<img width="1887" height="870" alt="image" src="https://github.com/user-attachments/assets/bd082b2d-be80-4bc5-b636-cafb71f997e7" />


<h4>Test Cases</h4>

<h5>Reward points logic test case </h5>
<img width="926" height="323" alt="image" src="https://github.com/user-attachments/assets/d629f5f3-d1cc-4667-9443-6864dc8adcec" />

<h5>Monthly Reward points</h5>
<img width="1018" height="322" alt="image" src="https://github.com/user-attachments/assets/647b5394-7abc-48d0-92cd-21109d30c1c4" />

<h5>Total rewards for customer </h5>
<img width="1003" height="322" alt="image" src="https://github.com/user-attachments/assets/bfca215e-e72c-4d43-ba64-b761530ec33a" />





