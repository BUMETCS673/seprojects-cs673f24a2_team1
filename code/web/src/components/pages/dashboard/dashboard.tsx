import React from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TimelineItem from "./TimelineItem"; // Assuming TimelineItem is a custom component

const OrdersOverview: React.FC = () => {
  return (
    <Card sx={{ height: "100%" }} className="orders-overview-card">
      <Box pt={3} px={3}>
        <Typography variant="h6" fontWeight="medium" className="title">
          Orders Overview
        </Typography>
        <Box mt={0} mb={2}>
          <Typography variant="button" color="textSecondary" className="overview-stats">
            <Icon sx={{ color: "green", verticalAlign: "middle" }}>arrow_upward</Icon>&nbsp;
            <Typography component="span" variant="button" fontWeight="medium">
              24%
            </Typography>{" "}
            this month
          </Typography>
        </Box>
      </Box>
      <Box p={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title="$2400, Design changes"
          dateTime="22 DEC 7:20 PM"
        />
        <TimelineItem
          color="error"
          icon="inventory_2"
          title="New order #1832412"
          dateTime="21 DEC 11 PM"
        />
        <TimelineItem
          color="info"
          icon="shopping_cart"
          title="Server payments for April"
          dateTime="21 DEC 9:34 PM"
        />
        <TimelineItem
          color="warning"
          icon="payment"
          title="New card added for order #4395133"
          dateTime="20 DEC 2:20 AM"
        />
        <TimelineItem
          color="primary"
          icon="vpn_key"
          title="New card added for order #4395133"
          dateTime="18 DEC 4:54 AM"
          lastItem
        />
      </Box>
    </Card>
  );
};

export default OrdersOverview;
