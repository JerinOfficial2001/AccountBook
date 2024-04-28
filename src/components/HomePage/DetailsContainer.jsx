import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpenseCard from "./ExpenseCard";
import CollectionCard, { stringAvatar } from "./CollectionCard";
import MyModal from "./MyModal";
import toast from "react-hot-toast";
import { CreateCollection } from "@/src/controllers/collections";

export default function DetailsContainer({
  cachedData,
  partyData,
  fetchData,
  allCollections,
  fetchCollection,
}) {
  const [openModal, setopenModal] = useState(false);
  const [inputDatas, setinputDatas] = useState({
    modelTitle: "Add Entry",
    details: "",
    amount: "",
    expensetype: "",
    date: "",
    partyID: "",
  });

  const handleFormData = (name, value) => {
    setinputDatas((prev) => ({ ...prev, [name]: value }));
  };
  const handleCloseModal = () => {
    setopenModal(false);
  };
  const handleOpenModal = (type) => {
    setopenModal(true);
    handleFormData("expensetype", type);
  };
  useEffect(() => {
    if (partyData) {
      handleFormData("partyID", partyData._id);
    }
  }, [partyData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const keys = Object.keys(inputDatas);
    const requiredFields = keys.every((key) => inputDatas[key] !== "");
    if (requiredFields && partyData && partyData?._id) {
      const newDatas = {
        userID: cachedData._id,
        token: cachedData.accessToken,
        data: inputDatas,
      };
      CreateCollection(newDatas).then((data) => {
        if (data?.status == "ok") {
          handleCloseModal();
          fetchData();
          fetchCollection(partyData?._id);
        }
      });
    } else {
      if (inputDatas.partyID == "") {
        toast.error("PartyID is mandatory");
      } else {
        toast.error("All fields are mandatory");
      }
    }
  };
  const handleOnchange = (event) => {
    const { name, value } = event.target;
    handleFormData(name, value);
  };
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
        <Avatar {...stringAvatar(partyData?.partyname)} />
        <Stack>
          <Typography sx={{ fontWeight: "bold", color: "black" }}>
            {partyData?.partyname}
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
          amount={partyData?.amount ? partyData?.amount : 0}
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
          height: "469px",

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
        {allCollections.map((data, index) => (
          <CollectionCard key={index} data={data} />
        ))}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          padding: 2,
          boxShadow: "0 -1px 0 0 #e3e3e3",
          gap: 2,
        }}
      >
        <Button
          onClick={() => {
            handleOpenModal("DEBIT");
          }}
          size="small"
          variant="contained"
          sx={{
            background: "#ffadad",
            color: "red",
            fontWeight: "bold",
            width: "50%",
            "&:hover": {
              backgroundColor: "#e79a9a",
            },
          }}
        >
          You gave
        </Button>
        <Button
          onClick={() => {
            handleOpenModal("CREDIT");
          }}
          size="small"
          variant="contained"
          sx={{
            background: "#90d8a8",
            color: "green",
            fontWeight: "bold",
            width: "50%",
            "&:hover": {
              backgroundColor: "#a2deb6",
            },
          }}
        >
          You got
        </Button>
      </Box>
      <MyModal
        open={openModal}
        handleClose={handleCloseModal}
        data={inputDatas}
        type="entry"
        handleOnchange={handleOnchange}
        handleSubmit={handleSubmit}
      />
    </Stack>
  );
}
