import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MiniDrawer from "@/src/layouts/MiniDrawer";
import { Box, Stack, Typography } from "@mui/material";
import TabContainer from "@/src/components/HomePage/TabContainer";
import { useState } from "react";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import UserContainer from "@/src/components/HomePage/UserContainer";
import DetailsContainer from "@/src/components/HomePage/DetailsContainer";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [tabName, settabName] = useState("CUSTOMER");
  const [PartyData, setPartyData] = useState(null);
  const [selectedParty, setselectedParty] = useState("");

  const handleTabName = (e, name) => {
    settabName(name);
  };
  const handleOpenUserDetail = (id) => {
    const particularPartyData = customers.find((item) => item._id == id);
    if (particularPartyData) {
      setPartyData(particularPartyData);
      setselectedParty(particularPartyData.customername);
    }
  };
  const customers = [
    {
      _id: 1,
      expensetype: "debit",
      customername: "John Imman",
      amount: "3000",
      date: "2 days ago",
      phone: 9876526262,
    },
    {
      _id: 2,
      expensetype: "credit",
      customername: "John",
      amount: "2000",
      date: "2 mins ago",
      phone: 9736352516,
    },
  ];
  const tabArr = [
    {
      label: "Customers",
      value: "CUSTOMER",
      content: (
        <UserContainer
          type="CUSTOMER"
          handleClick={handleOpenUserDetail}
          Users={customers}
          selectedParty={selectedParty}
        />
      ),
    },
    {
      label: "Supplier",
      value: "SUPPLIER",
      content: (
        <UserContainer
          type="SUPPLIER"
          Users={[]}
          handleClick={handleOpenUserDetail}
          selectedParty={selectedParty}
        />
      ),
    },
  ];

  return (
    <MiniDrawer>
      <Toaster position="top-center" />
      <Stack
        sx={{
          width: "60%",
        }}
      >
        <TabContainer
          tabData={tabArr}
          handleTabName={handleTabName}
          tabName={tabName}
        />
      </Stack>
      <Stack
        sx={{ width: "40%", maxHeight: "100vh", justifyContent: "center" }}
      >
        {PartyData ? (
          <DetailsContainer partyData={PartyData} collections={customers} />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <GroupsRoundedIcon sx={{ color: "gray", fontSize: 200 }} />
              <Typography
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  position: "absolute",
                  bottom: 0,
                }}
              >
                {tabName == "SUPPLIER"
                  ? "No supplier selected"
                  : "No customer selected"}
              </Typography>
            </Box>
          </Box>
        )}
      </Stack>
    </MiniDrawer>
  );
}
