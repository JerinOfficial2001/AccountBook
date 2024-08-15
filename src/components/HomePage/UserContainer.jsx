import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ExpenseCard from "./ExpenseCard";
import UserCard from "./UserCard";
import { Add } from "@mui/icons-material";
import MyModal from "./MyModal";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { CreateParty } from "@/src/controllers/party";

export default function UserContainer({
  Users,
  handleClick,
  type,
  selectedParty,
  staticsDetails,
  cachedData,
  fetchData,
  isLoading,
}) {
  const [openModal, setopenModal] = useState(false);
  const [isProcessing, setisProcessing] = useState(false);
  const [inputDatas, setinputDatas] = useState({
    modelTitle: "Add New Party",
    partyname: "",
    phone: "",
    // amount: "",
    // expensetype: "CREDIT",
    type: "",
    staticsID: staticsDetails ? staticsDetails._id : "",
  });
  const handleCloseModal = () => {
    setopenModal(false);
  };
  const handleOpenModal = () => {
    setopenModal(true);
  };
  const handleFormData = (name, value) => {
    setinputDatas((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (staticsDetails) {
      handleFormData("staticsID", staticsDetails._id);
    }
  }, []);

  const handleSubmit = (e) => {
    setisProcessing(true);
    e.preventDefault();
    const keys = Object.keys(inputDatas);
    const requiredFields = keys.every((key) => {
      if (key === "phone") {
        return true;
      }
      return inputDatas[key] !== "";
    });
    if (requiredFields && staticsDetails && staticsDetails?._id) {
      const newDatas = {
        userID: cachedData._id,
        token: cachedData.accessToken,
        data: inputDatas,
      };
      CreateParty(newDatas).then((data) => {
        if (data && data?.status == "ok") {
          handleCloseModal();
          fetchData();
          setisProcessing(false);
        } else {
          setisProcessing(false);
        }
      });
    } else {
      if (inputDatas.staticsID == "") {
        toast.error("Statistic ID is mandatory");
        setisProcessing(false);
      } else {
        toast.error("All fields are mandatory");
        setisProcessing(false);
      }
    }
  };
  const handleOnchange = (event) => {
    const { name, value } = event.target;
    handleFormData(name, value);
  };
  return (
    <Stack
      sx={{ width: "100%", justifyContent: "space-between", height: "90vh" }}
    >
      <Box
        sx={{
          width: "100%",
          height: "7%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
          padding: 1,
          borderBottom: "1px solid #686868",
        }}
      >
        <ExpenseCard
          amount={staticsDetails?.totalcredit}
          condition="CREDIT"
          type="statics"
          isLoading={isLoading}
        />
        <ExpenseCard
          amount={staticsDetails?.totaldebit}
          condition="DEBIT"
          type="statics"
          isLoading={isLoading}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "6%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingX: 5,
          background: "#272727",
          color: "#ffffff99",
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
          height: Users?.length > 0 ? "77%" : "87%",
          "&:hover": {
            overflowY: "auto",
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
                  flexDirection: "row",
                  gap: 1,
                }}
              >
                <Skeleton
                  variant="circular"
                  sx={{
                    height: "50px",
                    width: "50px",
                    background: "#6264669c",
                  }}
                />
                <Skeleton sx={{ width: "100px", background: "#6264669c" }} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {" "}
                <Skeleton sx={{ width: "100px", background: "#6264669c" }} />
                <Skeleton sx={{ width: "100px", background: "#6264669c" }} />
              </Box>
            </Box>
          ))
        ) : Users?.length > 0 ? (
          Users?.map((data, index) => (
            <UserCard
              selectedParty={selectedParty}
              key={index}
              data={data}
              handleClick={handleClick}
            />
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
              No party data available
            </Typography>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          height: "10%",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "row",
          padding: 2,
          boxShadow: "0 -1px 0 0 #686868",
          gap: 2,
        }}
      >
        <Button
          onClick={isLoading ? undefined : handleOpenModal}
          variant="contained"
          sx={{
            background: "#1f1f9d",
            color: "white",
            fontWeight: "bold",
            width: { xs: "100%", sm: "100%", md: "40%", lg: "40%", xl: "40%" },
            "&:hover": {
              backgroundColor: "#4646ed",
            },
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
          startIcon={<Add />}
        >
          {type == "CUSTOMER" ? " Add Customer" : "Add Supplier"}
        </Button>
      </Box>

      <MyModal
        isProcessing={isProcessing}
        open={openModal}
        handleClose={handleCloseModal}
        data={inputDatas}
        type="party"
        handleOnchange={handleOnchange}
        handleSubmit={handleSubmit}
      />
    </Stack>
  );
}
