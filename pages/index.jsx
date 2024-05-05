import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MiniDrawer from "@/src/layouts/MiniDrawer";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import TabContainer from "@/src/components/HomePage/TabContainer";
import { useEffect, useState } from "react";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import UserContainer from "@/src/components/HomePage/UserContainer";
import DetailsContainer from "@/src/components/HomePage/DetailsContainer";
import { Toaster } from "react-hot-toast";
import { GetStaticsByType } from "@/src/controllers/statics";
import { getDecryptedCookie } from "@/src/utils/EncryptCookie";
import { GetInitPartyID, GetPartyByStaticsID } from "@/src/controllers/party";
import { GetCollectionByPartyID } from "@/src/controllers/collections";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [tabName, settabName] = useState("CUSTOMER");
  const [PartyData, setPartyData] = useState(null);
  const [selectedParty, setselectedParty] = useState("");
  const [staticsDetails, setstaticsDetails] = useState(null);
  const [allParties, setallParties] = useState([]);
  const [allCollections, setallCollections] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isDetailLoading, setisDetailLoading] = useState(false);
  const cookie = getDecryptedCookie("userData");
  const cachedData = cookie ? JSON.parse(cookie) : false;
  const [initiation, setinitiation] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setinitiation(false);
    }, 3000);
    () => clearTimeout(timer);
  }, [cookie]);
  const fetchData = () => {
    setisLoading(true);

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
          setisLoading(false);
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
      GetInitPartyID({
        id,
        userID: cachedData._id,
        token: cachedData.accessToken,
      }).then((data) => {
        if (data) {
          setPartyData(data);
          setselectedParty(data._id);
        }
      });
      setallCollections(data);
      setisDetailLoading(false);
    });
  };
  const handleTabName = (e, name) => {
    settabName(name);
    setPartyData(null);
    setselectedParty("");
  };
  const handleOpenUserDetail = (id) => {
    setisDetailLoading(true);
    fetchCollection(id);
  };

  const tabArr = [
    {
      label: "Customers",
      value: "CUSTOMER",
      content: (
        <UserContainer
          isLoading={isDetailLoading}
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
          isLoading={isDetailLoading}
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
    <>
      {initiation ? (
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#161616",
          }}
        >
          <Box
            component="img"
            src="/LoadingLogo.png"
            sx={{ height: "150px", width: "150px" }}
          />
        </Box>
      ) : (
        <MiniDrawer>
          <Toaster position="top-center" />
          <Stack
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "60%",
                lg: "60%",
                xl: "60%",
              },
            }}
          >
            <TabContainer
              tabData={tabArr}
              handleTabName={handleTabName}
              tabName={tabName}
            />
          </Stack>
          <Stack
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "40%",
                lg: "40%",
                xl: "40%",
              },
              height: "100%",
              justifyContent: "center",
            }}
          >
            {PartyData ? (
              <DetailsContainer
                isLoading={isDetailLoading}
                allCollections={allCollections}
                cachedData={cachedData}
                partyData={PartyData}
                fetchData={fetchData}
                fetchCollection={fetchCollection}
                setPartyData={setPartyData}
              />
            ) : isDetailLoading ? (
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
                <CircularProgress />
              </Box>
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
                      color: "gray",
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
      )}
    </>
  );
}
