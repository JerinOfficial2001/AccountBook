import { Box, Typography } from "@mui/material";
import React from "react";
import SouthWestRoundedIcon from "@mui/icons-material/SouthWestRounded";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";

export default function ExpenseCard({ condition, type, amount }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems:
          type == "statics" || type == "collection" ? "center" : "flex-start",
        flexDirection:
          type == "statics" || type == "collection" ? "row" : "column-reverse",
        gap: 1,
        color: condition == "CREDIT" ? "green" : "red",
      }}
    >
      <Typography
        sx={{
          textTransform: type !== "statics" ? "uppercase" : "none",
          color: "#5d5d5d",
          fontSize: type !== "statics" ? "small" : "",
        }}
      >
        {condition == "DEBIT" ? "You'll Get" : "You'll Give"}
      </Typography>
      <Typography
        sx={{ color: type == "statics" ? "black" : "", fontWeight: "bold" }}
      >
        ₹{amount}
      </Typography>
      {type == "statics" ? (
        condition == "CREDIT" ? (
          <NorthEastRoundedIcon />
        ) : (
          <SouthWestRoundedIcon />
        )
      ) : null}
    </Box>
  );
}
