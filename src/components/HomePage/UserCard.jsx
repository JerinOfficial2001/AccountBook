import React from "react";
import ExpenseCard from "./ExpenseCard";
import { Avatar, Box, Stack, Typography } from "@mui/material";

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

function stringAvatar(name) {
  const names = name.split(" ");
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
}

export default function UserCard({ data, handleClick }) {
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
        color: "#5d5d5d",
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
        <Avatar {...stringAvatar(data?.customername)} />
        <Stack>
          <Typography sx={{ fontWeight: "bold", color: "black" }}>
            {data?.customername}
          </Typography>
          <Typography>{data?.date}</Typography>
        </Stack>
      </Box>
      <ExpenseCard
        amount={data?.amount}
        condition={data?.expensetype}
        type="user"
      />
    </Box>
  );
}
