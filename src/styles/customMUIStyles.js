import { TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const tableStyles = {
  marginTop: "1rem",
  marginLeft: "1%",
  maxWidth: "98%",
  marginBottom: "0.6rem",
};

export const filterControlStyles = {
  minWidth: 150,
};
