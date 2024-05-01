import { RegisterController, UserDataController } from "@/src/controllers/auth";
import AuthLayout from "@/src/layouts/AuthLayout";
import { setEncryptedCookie } from "@/src/utils/EncryptCookie";
import { TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [inputDatas, setinputDatas] = useState({
    phone: "",
    password: "",
    shopname: "",
    username: "",
  });
  const [isProcessing, setisProcessing] = useState(false);

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setinputDatas((prev) => ({ ...prev, [name]: value }));
  };
  const authInput = [
    {
      name: "username",
      label: "Name",
      onchange: handleOnchange,
      value: inputDatas.username,
      type: "text",
      err: "",
      errMsg: "",
    },
    {
      name: "shopname",
      label: "Shop name",
      onchange: handleOnchange,
      value: inputDatas.shopname,
      type: "text",
      err: "",
      errMsg: "",
    },
    {
      name: "phone",
      label: "Phone Number",
      onchange: handleOnchange,
      value: inputDatas.phone,
      type: "number",
      err: "",
      errMsg: "",
    },
    {
      name: "password",
      label: "Password",
      onchange: handleOnchange,
      value: inputDatas.password,
      type: "text",
      err: "",
      errMsg: "",
    },
  ];
  const handleSubmit = (e) => {
    setisProcessing(true);
    e.preventDefault();
    const keys = Object.keys(inputDatas);
    const required = keys.every((key) => inputDatas[key] !== "");
    if (required) {
      RegisterController(inputDatas).then((data) => {
        if (data) {
          if (data.status == "ok") {
            if (data.token) {
              UserDataController(data.token).then((res) => {
                if (res.status == "ok") {
                  setEncryptedCookie("userData", JSON.stringify(res.data));
                  toast.success("Logged in successfully");
                  window.location.href = "/";
                  setisProcessing(false);
                } else {
                  setisProcessing(false);
                  toast.error(res.message);
                }
              });
            } else {
              toast.success(data.message);
              router.push("/auth/login");
            }
            setisProcessing(false);
          } else {
            toast.error(data.message);
            setisProcessing(false);
          }
        }
      });
    } else {
      toast.error("All fields are mandatory");
      setisProcessing(false);
    }
  };
  return (
    <AuthLayout
      handleSubmit={handleSubmit}
      isProcessing={isProcessing}
      isLogin={false}
      routeHandler="/auth/login"
    >
      <Typography
        id="keep-mounted-modal-title"
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "gray",
          textTransform: "uppercase",
        }}
      >
        Sign Up
      </Typography>
      {authInput.map((inputData, index) => (
        <TextField
          fullWidth
          name={inputData.name}
          key={index}
          label={inputData.label}
          type={inputData.type}
          value={inputData.value}
          onChange={inputData.onchange}
          sx={{
            "& .MuiFormLabel-root": {
              color: "#5d5d5d",
            },
            "& label.Mui-focused": {
              color: "#5d5d5d",
            },
            "& .MuiInputBase-root": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "gray !important",
              },
            },
          }}
        />
      ))}
    </AuthLayout>
  );
}
