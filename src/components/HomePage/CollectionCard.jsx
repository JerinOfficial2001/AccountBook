import React from "react";
import ExpenseCard from "./ExpenseCard";
import { Box, Stack, Typography } from "@mui/material";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export const stringAvatar = (name) => {
  const names = name?.split(" ");
  let initials = "";

  if (names.length === 1) {
    // For single names, use the first letter of the name
    initials = names[0][0];
  } else if (names.length >= 2) {
    // For double names, use the first character of each name
    initials = names[0][0] + names[1][0];
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
};

export default function CollectionCard({ data, handleClick }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingX: 5,
        color: "slategray",
        "&:hover": {
          background: "#cbcbcb45",
        },
        cursor: "pointer",
        transition: ".3s",
      }}
      onClick={() => {
        handleClick(data._id);
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Stack>
          <Typography sx={{ fontWeight: "bold", color: "whitesmoke" }}>
            {data?.date}
          </Typography>
          <Typography>Balance:-</Typography>
        </Stack>
      </Box>
      <Typography
        sx={{
          color: data.expensetype == "DEBIT" ? "red" : "whitesmoke",
          fontWeight: "bold",
        }}
      >
        {data.expensetype == "DEBIT" ? `₹${data.amount}` : "-"}
      </Typography>
      <Typography
        sx={{
          color: data.expensetype == "CREDIT" ? "green" : "black",
          fontWeight: "bold",
        }}
      >
        {data.expensetype == "CREDIT" ? `₹${data.amount}` : "-"}
      </Typography>
    </Box>
  );
}
