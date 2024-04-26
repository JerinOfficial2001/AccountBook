import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import ExpenseCard from "./ExpenseCard";
import CollectionCard, { stringAvatar } from "./CollectionCard";

export default function DetailsContainer({ partyData, collections }) {
  return (
    <Stack
      sx={{
        width: "100%",
        justifyContent: "space-between",
        height: "100%",
        padding: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 1,
          color: "#5d5d5d",
        }}
      >
        <Avatar {...stringAvatar(partyData?.customername)} />
        <Stack>
          <Typography sx={{ fontWeight: "bold", color: "black" }}>
            {partyData?.customername}
          </Typography>
          <Typography>{partyData?.phone}</Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "50px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          flexDirection: "column",
          paddingX: 2,
          color: "#5d5d5d",
        }}
      >
        <Typography sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
          Net balance :
        </Typography>
        <ExpenseCard
          amount={partyData?.amount}
          condition={partyData?.expensetype}
          type="collection"
        />
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
          borderBottom: "1px solid #d4c9c9",
          color: "#5d5d5d",
        }}
      >
        <Typography sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
          Entries
        </Typography>
        <Typography sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
          You gave
        </Typography>
        <Typography sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
          You got
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
        {collections.map((data, index) => (
          <CollectionCard key={index} data={data} />
        ))}
      </Box>
    </Stack>
  );
}
