import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const CustomError = ({ error }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 10,
          padding: "12px 14px",
          borderRadius: 8,
          border: "0.5px solid #f09595",
          background: "#fcebeb",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "#a32d2d", fontSize: 20 }}>⚠</Typography>
        <Typography sx={{ margin: 0, fontSize: 16, color: "#a32d2d" }}>{error}</Typography>
      </Box>
    </Box>
  );
};

CustomError.propTypes = {
  error: PropTypes.string.isRequired,
};

export default CustomError;
