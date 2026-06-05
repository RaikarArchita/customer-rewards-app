import { Card, CardContent, Typography } from "@mui/material";
import PropTypes from 'prop-types';

const SummaryCards = ({ title, value }) => {
  return (
    <Card
      sx={{
        boxShadow: "2px 3px 10px #68719f",
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: "0.7rem"}}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: "1.3rem", marginTop: "8px" }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

SummaryCards.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};


export default SummaryCards;
