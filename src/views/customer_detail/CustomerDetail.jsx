import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerById } from "../../services/getCustomerDetails";
import LoaderSkeleton from "../../components/loading_skeleton/LoaderSkeleton";
import { calculateCustomerTotalRewards } from "../../utils/getCustomerTotalRewards";
import { calculateRewardPoints } from "../../utils/getRewardPoints";
import CustomError from "../../components/error_component/CustomError";
import {
  PAGE_SIZE,
  VIEW_MODES,
  FILTER_OPTIONS,
  SORT_ORDERS,
  MONTHS,
  YEARS,
} from "../../constants/constant";
import {
  filterControlStyles,
  StyledTableRow,
  tableStyles,
} from "../../styles/customMUIStyles";
import { getMonthlyRewards } from "../../utils/getMonthlyRewards";

const CustomerInfoRow = ({ label, value, showTopBorder = true }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      py: 1.5,
      borderTop: showTopBorder ? "0.5px solid #e0e0e0" : "none",
      borderBottom: "0.5px solid #e0e0e0",
      width: {
        xs: "100%",
        md: "40%",
        lg: "20%",
      },
      ml: 1,
    }}
  >
    <Typography variant="body2" sx={{ color: "#888" }}>
      {label}
    </Typography>

    <Typography sx={{ fontWeight: 500 }}>{value}</Typography>
  </Box>
);

const CustomerDetail = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewBy, setViewBy] = useState(VIEW_MODES.MONTH); // month or date
  const [selectedYear, setSelectedYear] = useState(FILTER_OPTIONS.ALL);
  const [selectedMonth, setSelectedMonth] = useState(FILTER_OPTIONS.ALL);
  const [sortOrder, setSortOrder] = useState(SORT_ORDERS.ASC);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Fetches customer details based on the customerId from the URL parameters.
  useEffect(() => {
    const fetchCustomer = async () => {
      setIsLoading(true);
      try {
        const customerResponse = await getCustomerById(customerId);
        setCustomer(customerResponse);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  // Extracts initials from the customer's name to display in the avatar.
  const customerInitials = customer?.name
    ?.split(" ")
    ?.map((namePart) => namePart[0])
    ?.join("");

  // Calculates total rewards and transaction statistics for the customer.
  const customerSummary = useMemo(() => {
    if (!customer) return null;

    return calculateCustomerTotalRewards(customer);
  }, [customer]);

  // Filters the customer's transactions based on the selected year and month.
  const filteredTransactions = customer
    ? customer.transactions.filter((transaction) => {
        const date = new Date(transaction.date);

        const matchesYear =
          selectedYear === FILTER_OPTIONS.ALL ||
          date.getFullYear() === Number(selectedYear);

        const matchesMonth =
          selectedMonth === FILTER_OPTIONS.ALL ||
          date.getMonth() === Number(selectedMonth);

        return matchesYear && matchesMonth;
      })
    : [];

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortOrder === SORT_ORDERS.ASC) {
      return new Date(b.date) - new Date(a.date);
    }

    return new Date(a.date) - new Date(b.date);
  });

  // Maps the sorted transactions to include calculated reward points for each transaction.
  const transactionDetails = sortedTransactions.map((transaction) => ({
    transactionId: transaction.transactionId,
    amount: transaction.amount,
    date: transaction.date,
    rewardPoints: calculateRewardPoints(transaction.amount),
  }));

  const pageStartIndex = (page - 1) * PAGE_SIZE;
  const paginatedTransactions = transactionDetails.slice(
    pageStartIndex,
    pageStartIndex + PAGE_SIZE,
  );

  // Groups transactions by month and year, calculating total rewards and transaction count for each month.
  const monthlyRewards = useMemo(() => {
    if (!customer) return [];

    const groupedRewards = getMonthlyRewards(filteredTransactions);

    return Object.values(groupedRewards).sort((a, b) => {
      const dateA = new Date(a.year, a.monthIndex);
      const dateB = new Date(b.year, b.monthIndex);

      return sortOrder === SORT_ORDERS.ASC ? dateB - dateA : dateA - dateB;
    });
  }, [customer, selectedYear, selectedMonth, sortOrder]);

  const paginatedMonthlyRewards = monthlyRewards.slice(
    pageStartIndex,
    pageStartIndex + PAGE_SIZE,
  );

  if (isLoading) {
    return <LoaderSkeleton />;
  }

  if (error) {
    return <CustomError error={error} />;
  }

  return (
    <Box sx={{ padding: "10px" }}>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginBottom: "1.75rem",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#e6f1fb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
              fontWeight: 500,
              color: "#185fa5",
            }}
          >
            {customerInitials}
          </Box>
          <Box>
            <Typography sx={{ margin: 0, fontSize: 19, fontWeight: 600 }}>
              {customer?.name}
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#888" }}>
              Customer account
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#4258c7e6",
            textTransform: "none",
            height: "50px",
          }}
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </Button>
      </Stack>
      <CustomerInfoRow
        label="No. of transactions"
        value={customer?.transactions.length}
      />

      <CustomerInfoRow
        label="Total Rewards (Points)"
        value={Number.isInteger(customerSummary?.totalRewards) ? customerSummary?.totalRewards : customerSummary?.totalRewards.toFixed(2)}
        showTopBorder={false}
      />

      <CustomerInfoRow
        label="Total Transaction Amount"
        value={`${Number.isInteger(customerSummary?.totalAmountSpent) ? customerSummary?.totalAmountSpent : customerSummary?.totalAmountSpent.toFixed(2)}`}
        showTopBorder={false}
      />
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "700",
          marginLeft: "1%",
          marginTop: "2%",
        }}
      >
        Rewards History
      </Typography>
      <Stack
        direction="row"
        spacing={3}
        sx={{ marginTop: "2%", marginLeft: "1%", flexWrap: "wrap" }}
      >
        <FormControl size="small" sx={filterControlStyles}>
          <InputLabel>View By</InputLabel>

          <Select
            value={viewBy}
            label="View By"
            onChange={(e) => {
              setViewBy(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value={VIEW_MODES.MONTH}>Month View</MenuItem>
            <MenuItem value={VIEW_MODES.DATE}>Date View</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={filterControlStyles}>
          <InputLabel>Year</InputLabel>

          <Select
            value={selectedYear}
            label="Year"
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value={FILTER_OPTIONS.ALL}>All Years</MenuItem>
            {YEARS.map((year) => (
              <MenuItem value={year} key={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={filterControlStyles}>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            label="Month"
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value={FILTER_OPTIONS.ALL}>All</MenuItem>
            {MONTHS.map((option, index) => (
              <MenuItem value={index} key={index}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ToggleButtonGroup
          value={sortOrder}
          exclusive
          size="small"
          onChange={(_, value) => {
            if (value) setSortOrder(value);
          }}
        >
          <ToggleButton value={SORT_ORDERS.ASC}>Newest First</ToggleButton>
          <ToggleButton value={SORT_ORDERS.DESC}>Oldest First</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {paginatedTransactions.length != 0 && viewBy === VIEW_MODES.DATE ? (
        <Table sx={tableStyles}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="center">Transaction Amount</TableCell>
              <TableCell align="center">Reward Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <StyledTableRow key={transaction.transactionId}>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  ${Number.isInteger(transaction.amount) ? transaction.amount : transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {transaction.rewardPoints} pts
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      ) : paginatedMonthlyRewards.length !== 0 ? (
        <Table sx={tableStyles}>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell align="center">No. of Transactions</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Rewards</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMonthlyRewards.map((item) => (
              <StyledTableRow key={`${item.month}-${item.year}`}>
                <TableCell>{`${item.month} ${item.year}`}</TableCell>
                <TableCell align="center">{item.transactionCount}</TableCell>
                <TableCell align="center">
                  ${Number.isInteger(item.totalAmount) ? item.totalAmount : item.totalAmount.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {item.totalRewards} pts
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Typography variant="h6">No transactions found</Typography>
        </Box>
      )}
      {(viewBy === VIEW_MODES.DATE
        ? transactionDetails.length
        : monthlyRewards.length) > 0 && (
        <Pagination
          count={Math.ceil(
            (viewBy === VIEW_MODES.DATE
              ? transactionDetails.length
              : monthlyRewards.length) / PAGE_SIZE,
          )}
          page={page}
          onChange={handlePageChange}
          sx={{ pl: 2, pt: 1 }}
        />
      )}
    </Box>
  );
};

export default CustomerDetail;
