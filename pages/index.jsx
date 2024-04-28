import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MiniDrawer from "@/src/layouts/MiniDrawer";
import { Box, Stack, Typography } from "@mui/material";
import TabContainer from "@/src/components/HomePage/TabContainer";
import { useEffect, useState } from "react";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import UserContainer from "@/src/components/HomePage/UserContainer";
import DetailsContainer from "@/src/components/HomePage/DetailsContainer";
import { Toaster } from "react-hot-toast";
import { GetStaticsByType } from "@/src/controllers/statics";
import { getDecryptedCookie } from "@/src/utils/EncryptCookie";
import { GetPartyByStaticsID } from "@/src/controllers/party";
import { GetCollectionByPartyID } from "@/src/controllers/collections";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [tabName, settabName] = useState("CUSTOMER");
  const [PartyData, setPartyData] = useState(null);
  const [selectedParty, setselectedParty] = useState("");
  const [staticsDetails, setstaticsDetails] = useState(null);
  const [allParties, setallParties] = useState([]);
  const [allCollections, setallCollections] = useState([]);
  const cookie = getDecryptedCookie("userData");
  const cachedData = cookie ? JSON.parse(cookie) : false;
  const fetchData = () => {
    if (cachedData) {
      GetStaticsByType({
        id: cachedData._id,
        token: cachedData.accessToken,
        type: tabName,
      }).then((data) => {
        setstaticsDetails(data);
        GetPartyByStaticsID({
          staticID: data?._id,
          userID: cachedData._id,
          token: cachedData.accessToken,
        }).then((data) => {
          setallParties(data);
        });
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, [tabName]);
  const fetchCollection = (id) => {
    GetCollectionByPartyID({
      partyID: id,
      userID: cachedData._id,
      token: cachedData.accessToken,
    }).then((data) => {
      setallCollections(data);
    });
  };
  const handleTabName = (e, name) => {
    settabName(name);
  };
  const handleOpenUserDetail = (id) => {
    const particularPartyData = allParties.find((item) => item._id == id);
    if (particularPartyData) {
      setPartyData(particularPartyData);
      setselectedParty(particularPartyData.partyname);
    }
    fetchCollection(id);
  };

  const tabArr = [
    {
      label: "Customers",
      value: "CUSTOMER",
      content: (
        <UserContainer
          type="CUSTOMER"
          handleClick={handleOpenUserDetail}
          Users={allParties}
          selectedParty={selectedParty}
          staticsDetails={staticsDetails}
          cachedData={cachedData}
          fetchData={fetchData}
        />
      ),
    },
    {
      label: "Supplier",
      value: "SUPPLIER",
      content: (
        <UserContainer
          type="SUPPLIER"
          Users={allParties}
          handleClick={handleOpenUserDetail}
          selectedParty={selectedParty}
          staticsDetails={staticsDetails}
          cachedData={cachedData}
          fetchData={fetchData}
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
          <DetailsContainer
            allCollections={allCollections}
            cachedData={cachedData}
            partyData={PartyData}
            fetchData={fetchData}
            fetchCollection={fetchCollection}
          />
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
