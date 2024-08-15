import {
  Avatar,
  Box,
  Button,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpenseCard from "./ExpenseCard";
import CollectionCard, { stringAvatar } from "./CollectionCard";
import MyModal from "./MyModal";
import toast from "react-hot-toast";
import {
  CreateCollection,
  DeleteCollection,
  GetInitCollection,
} from "@/src/controllers/collections";
import SettingsIcon from "@mui/icons-material/Settings";
import { DeleteParty } from "@/src/controllers/party";

export default function DetailsContainer({
  cachedData,
  partyData,
  fetchData,
  allCollections,
  fetchCollection,
  isLoading,
  setPartyData,
}) {
  const [openModal, setopenModal] = useState(false);
  const [isProcessing, setisProcessing] = useState(false);
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
    setisProcessing(false);
  };
  const handleOpenModal = (type) => {
    setopenModal(true);
    if (type == "Party Details") {
      handleFormData("modelTitle", type);
    } else {
      handleFormData("expensetype", type);
      handleFormData("modelTitle", "Add Entry");
    }
  };
  useEffect(() => {
    if (partyData) {
      handleFormData("partyID", partyData._id);
    }
  }, [partyData]);
  const handleSubmit = (e, id) => {
    setisProcessing(true);
    e.preventDefault();
    const keys = Object.keys(inputDatas);
    if (
      inputDatas.modelTitle == "Add Entry"
      // ||
      // inputDatas.modelTitle == "Edit Entry"
    ) {
      const requiredFields = keys.every((key) => {
        if (key === "details") {
          return true;
        }
        return inputDatas[key] !== "";
      });

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
            setisProcessing(false);
          } else {
            setisProcessing(false);
          }
        });
      } else {
        setisProcessing(false);
        if (inputDatas.partyID == "") {
          toast.error("PartyID is mandatory");
        } else {
          toast.error("All fields are mandatory");
        }
      }
    } else if (inputDatas.modelTitle == "Entry Details") {
      const newDatas = {
        userID: cachedData._id,
        token: cachedData.accessToken,
        id,
        partyID: partyData._id,
      };
      DeleteCollection(newDatas).then((data) => {
        if (data) {
          if (data.status == "ok") {
            toast.success(data.message);
            handleCloseModal();
            fetchData();
            fetchCollection(partyData?._id);
            setisProcessing(false);
          } else {
            toast.error(data.message);
            setisProcessing(false);
          }
        } else {
          setisProcessing(false);
        }
      });
    } else if (inputDatas.modelTitle == "Edit Entry") {
      return null;
    } else if (inputDatas.modelTitle == "Party Details") {
      const newDatas = {
        userID: cachedData._id,
        token: cachedData.accessToken,
        id: partyData._id,
      };
      DeleteParty(newDatas).then((data) => {
        if (data) {
          if (data.status == "ok") {
            toast.success(data.message);
            handleCloseModal();
            fetchData();
            fetchCollection(partyData?._id);
            setisProcessing(false);
            setPartyData(null);
          } else {
            toast.error(data.message);
            setisProcessing(false);
          }
        } else {
          setisProcessing(false);
        }
      });
    }
  };
  const handleOnchange = (event) => {
    const { name, value } = event.target;
    handleFormData(name, value);
  };
  const getInitData = (id) => {
    const newDatas = {
      userID: cachedData._id,
      token: cachedData.accessToken,
      id,
    };
    GetInitCollection(newDatas).then((data) => {
      setinputDatas({
        modelTitle: "Entry Details",
        details: data.details,
        amount: data.amount,
        expensetype: data.expensetype,
        date: data.date,
        partyID: data._id,
      });
      setopenModal(true);
    });
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
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "48px",
            flexDirection: "row",
            padding: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 1,
            }}
          >
            <Skeleton
              variant="circular"
              sx={{
                height: "40px",
                width: "40px",
                background: "#6264669c",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Skeleton sx={{ width: "80px", background: "#6264669c" }} />
              <Skeleton sx={{ width: "100px", background: "#6264669c" }} />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            color: "slategray",
            p: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 1,
              color: "slategray",
            }}
          >
            <Avatar {...stringAvatar(partyData?.partyname)} />
            <Stack>
              <Typography sx={{ fontWeight: "bold", color: "white" }}>
                {partyData?.partyname}
              </Typography>
              <Typography>{partyData?.phone}</Typography>
            </Stack>
          </Box>
          <IconButton
            onClick={() => {
              handleOpenModal("Party Details");
            }}
            sx={{ color: "slategray" }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      )}
      <Box
        sx={{
          width: "100%",
          height: "50px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          flexDirection: "column",
          paddingX: 2,
          color: "whitesmoke",
        }}
      >
        <Typography sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
          Net balance :
        </Typography>
        <ExpenseCard
          amount={partyData?.amount ? partyData?.amount : 0}
          condition={partyData?.expensetype}
          type="collection"
          isLoading={isLoading}
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
          borderBottom: "1px solid #686868",
          color: "whitesmoke",
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
        {isLoading ? (
          [1, 2, 3].map((elem) => (
            <Box
              key={elem}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100px",
                flexDirection: "row",
                paddingX: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Skeleton sx={{ width: "100px", background: "#6264669c" }} />
                <Skeleton sx={{ width: "100px", background: "#6264669c" }} />
              </Box>
              <Skeleton sx={{ width: "100px", background: "#6264669c" }} />
              <Skeleton sx={{ width: "100px", background: "#6264669c" }} />
            </Box>
          ))
        ) : allCollections.length > 0 ? (
          allCollections.map((data, index) => (
            <CollectionCard key={index} data={data} handleClick={getInitData} />
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
                color: "gray",
                fontWeight: "bold",
              }}
            >
              No data available
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          padding: 2,
          boxShadow: "0 -1px 0 0 #686868",
          gap: 2,
        }}
      >
        <Button
          onClick={() => {
            isLoading ? undefined : handleOpenModal("DEBIT");
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
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          You gave
        </Button>
        <Button
          onClick={() => {
            isLoading ? undefined : handleOpenModal("CREDIT");
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
            cursor: isLoading ? "not-allowed" : "pointer",
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
        isProcessing={isProcessing}
        partyData={partyData}
        handleFormData={handleFormData}
      />
    </Stack>
  );
}
