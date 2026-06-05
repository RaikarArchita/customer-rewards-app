import {
  Button,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { calculateCustomerTotalRewards } from "../../utils/getCustomerTotalRewards";
import SummaryCards from "../../components/cards/SummaryCards";
import { useNavigate } from "react-router-dom";
import LoaderSkeleton from "../../components/loading_skeleton/LoaderSkeleton";
import { getCustomerDetails } from "../../services/getCustomerDetails";
import CustomError from "../../components/error_component/CustomError";
import { useDebounce } from "../../hooks/useDebounce";
import { PAGE_SIZE } from "../../constants/constant";

const Dashboard = () => {
  const [customers, setCustomers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("customerName");
  const [searchByName, setSearchByName] = useState("");

  const navigate = useNavigate();

  const debouncedSearchByName = useDebounce(searchByName, 400);

  // It updates the currentPage state to reflect the selected page.
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handles sorting logic when a column header is clicked. It toggles the sort order between ascending and descending for the selected field.
  const handleSortRequest = (property) => {
    const isAsc = sortField === property && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortField(property);
    setCurrentPage(1);
  };

  // Updates the search query state as the user types in the search input field.
  const handleSearch = (e) => {
    setSearchByName(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const customerResponse = await getCustomerDetails();
        setCustomers(customerResponse);
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Calculates reward summaries and transaction statistics for each customer.
  const customerRewardSummaries = useMemo(() => {
    return customers && customers.map(calculateCustomerTotalRewards);
  }, [customers]);

  // Aggregates dashboard-level metrics for all customers such as total rewards and total transactions.
  const dashboardStats = customerRewardSummaries?.reduce(
    (totals, customer) => {
      totals.totalRewards += customer.totalRewards;
      totals.totalTransactions += customer.totalTransactions;
      return totals;
    },
    { totalRewards: 0, totalTransactions: 0 },
  );

  //Filters the customer list based on the search query entered by the user.
  const filteredCustomers = customerRewardSummaries
    ? debouncedSearchByName !== ""
      ? customerRewardSummaries.filter((customer) =>
          customer.customerName
            ?.toLowerCase()
            .includes(debouncedSearchByName.toLowerCase()),
        )
      : customerRewardSummaries
    : [];

  //Sorts the filtered customer list based on the selected sort field and order (ascending or descending).
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    let valueA = a[sortField];
    let valueB = b[sortField];

    if (typeof valueA === "string") {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    return sortOrder === "asc"
      ? valueA < valueB
        ? -1
        : 1
      : valueA > valueB
        ? -1
        : 1;
  });

  // Returns only the customer records for the currently selected page.
  const pageStartIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedCustomers = sortedCustomers.slice(
    pageStartIndex,
    pageStartIndex + PAGE_SIZE,
  );

  if (isLoading) {
    return <LoaderSkeleton />;
  }

  if (errorMessage) {
    return <CustomError error={errorMessage} />;
  }

  return (
    <Stack direction="column" spacing={2}>
      <Stack
        direction="row"
        spacing={6}
        sx={{
          padding: "20px 30px",
          justifyContent: "center",
        }}
      >
        <SummaryCards title="Total Customers" value={customers?.length} />
        <SummaryCards
          title="Total Transactions"
          value={dashboardStats?.totalTransactions}
        />
        <SummaryCards
          title="Total Rewards"
          value={dashboardStats?.totalRewards}
        />
      </Stack>
      <TextField
        id="search-by-name"
        value={searchByName}
        onChange={handleSearch}
        placeholder="Search by Customer"
        variant="outlined"
        size="small"
        sx={{
          width: 240,
          pl: 3,
        }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell
              align={paginatedCustomers.length == 0 ? "center" : "right"}
            >
              <TableSortLabel
                active={sortField === "totalAmountSpent"}
                direction={sortField === "totalAmountSpent" ? sortOrder : "asc"}
                onClick={() => handleSortRequest("totalAmountSpent")}
              >
                Total Transaction Amt
              </TableSortLabel>
            </TableCell>
            <TableCell
              align={paginatedCustomers.length == 0 ? "center" : "right"}
            >
              <TableSortLabel
                active={sortField === "totalRewards"}
                direction={sortField === "totalRewards" ? sortOrder : "asc"}
                onClick={() => handleSortRequest("totalRewards")}
              >
                Total Reward Points
              </TableSortLabel>
            </TableCell>
            <TableCell
              align={paginatedCustomers.length == 0 ? "center" : "right"}
              sx={{ paddingRight: "4%" }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedCustomers.length === 0 ? (
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <Typography>No transactions found</Typography>
              </TableCell>
            </TableRow>
          ) : (
            paginatedCustomers?.map((row) => (
              <TableRow
                key={row.customerId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ paddingLeft: "2%" }}>
                  {row.customerName}
                </TableCell>
                <TableCell align="right">
                  $
                  {Number.isInteger(row.totalAmountSpent)
                    ? row.totalAmountSpent
                    : row.totalAmountSpent.toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {row.totalRewards} pts
                </TableCell>
                <TableCell align="right" sx={{ paddingRight: "2%" }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ backgroundColor: "#7986cb", textTransform: "none" }}
                    onClick={() => navigate(`customer/${row.customerId}`)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Stack
        spacing={2}
        sx={{
          position: "fixed",
          bottom: 10,
          right: 20,
        }}
        direction="row"
      >
        <Pagination
          count={Math.max(1, Math.ceil(filteredCustomers.length / PAGE_SIZE))}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </Stack>
  );
};

export default Dashboard;
