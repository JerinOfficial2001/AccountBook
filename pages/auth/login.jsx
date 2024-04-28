import { LoginController, UserDataController } from "@/src/controllers/auth";
import AuthLayout from "@/src/layouts/AuthLayout";
import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [inputDatas, setinputDatas] = useState({
    phone: "",
    password: "",
  });
  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setinputDatas((prev) => ({ ...prev, [name]: value }));
  };
  const authInput = [
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
    e.preventDefault();
    const keys = Object.keys(inputDatas);
    const required = keys.every((key) => inputDatas[key] !== "");
    if (required) {
      LoginController(inputDatas).then((data) => {
        UserDataController(data);
      });
    } else {
      toast.error("All fields are mandatory");
    }
  };
  return (
    <AuthLayout handleSubmit={handleSubmit}>
      <Typography
        id="keep-mounted-modal-title"
        sx={{
          fontWeight: "bold",
          color: "gray",
        }}
      >
        Login
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
