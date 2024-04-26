import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ExpenseCard from "./ExpenseCard";
import UserCard from "./UserCard";

export default function UserContainer({ Users, handleClick }) {
  return (
    <Stack
      sx={{ width: "100%", justifyContent: "space-between", height: "100%" }}
    >
      <Box
        sx={{
          width: "100%",
          height: "50px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
          padding: 1,
          borderBottom: "1px solid #d4c9c9",
        }}
      >
        <ExpenseCard amount="5000" condition="credit" type="statics" />
        <ExpenseCard amount="4000" condition="debit" type="statics" />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingX: 5,
          background: "#bfbfbf",
          color: "#5d5d5d",
        }}
      >
        <Typography sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
          Name
        </Typography>
        <Typography sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
          Amount
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "529px",

          "&:hover": {
            overflowY: "auto", // Show overflow when hovering over the side menu
          },
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f5f5f5",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#bdbdbd",
            borderRadius: "4px",
            "&:hover": {
              background: "#a5a5a5",
            },
          },
        }}
      >
        {Users.length > 0 ? (
          Users.map((data, index) => (
            <UserCard key={index} data={data} handleClick={handleClick} />
          ))
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box
              component="img"
              src="/empty.png"
              sx={{ height: 250, width: 250 }}
            />
            <Typography
              sx={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              No party data available
            </Typography>
          </Box>
        )}
      </Box>
    </Stack>
  );
}
