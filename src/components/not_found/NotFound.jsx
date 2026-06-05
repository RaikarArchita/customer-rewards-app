import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box sx={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h1">404</Typography>
      <Typography variant="body1">Page Not Found</Typography>
    </Box>
  );
};

export default NotFound;