import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, MenuItem, Stack, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const style = {
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  float: "right",
  height: "100%",
  color: "#5d5d5d",
};

export default function MyModal({
  open,
  handleClose,
  type,
  data,
  handleOnchange,
  handleSubmit,
}) {
  const partyInputs = [
    {
      name: "customername",
      label: "Party Name",
      onchange: handleOnchange,
      value: data.customername,
      type: "text",
      err: "",
      errMsg: "",
    },
    {
      name: "phone",
      label: "Phone Number",
      onchange: handleOnchange,
      value: data.phone,
      type: "number",
      err: "",
      errMsg: "",
    },

    {
      name: "expensetype",
      label: "",
      onchange: handleOnchange,
      value: data.expensetype ? data.expensetype : "CREDIT",
      type: "multiInput",
      err: "",
      errMsg: "",
      inputArr: [
        {
          name: "CREDIT",
          label: "You Got",
          value: "CREDIT",
          color: "green",
        },
        {
          name: "DEBIT",
          label: "You Gave",
          value: "DEBIT",
          color: "red",
        },
      ],
    },
    {
      name: "type",
      label: "who are they?",
      onchange: handleOnchange,
      value: data.type,
      type: "radio",
      err: "",
      errMsg: "",
      inputArr: [
        {
          name: "CUSTOMER",
          label: "Customer",
          value: "CUSTOMER",
        },
        {
          name: "SUPPLIER",
          label: "Supplier",
          value: "SUPPLIER",
        },
      ],
    },
  ];
  const entryInputs = [
    {
      name: "amount",
      label: "Amount",
      onchange: handleOnchange,
      value: data.amount,
      type: "number",
      err: "",
      errMsg: "",
    },

    {
      name: "details",
      label: "Description",
      onchange: handleOnchange,
      value: data.details,
      type: "multiline",
      err: "",
      errMsg: "",
      placeholder: "Enter Details (item Name, Bill No, Quantity, etc)",
    },
    {
      name: "date",
      label: "Date",
      onchange: handleOnchange,
      value: data.date,
      type: "date",
      err: "",
      errMsg: "",
    },
  ];
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              width: "100%",
              paddingX: 2,
              paddingY: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #b1b1b1b0",
            }}
          >
            <Typography
              id="keep-mounted-modal-title"
              sx={{
                fontWeight: "bold",
                color:
                  data.expensetype == "CREDIT"
                    ? "green"
                    : data.expensetype == "DEBIT"
                    ? "red"
                    : "",
              }}
            >
              {data?.modelTitle}
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              height: "90%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 1,
              p: 2,
              overflowY: "auto",
            }}
          >
            {type == "party" ? (
              <Stack gap={2}>
                {partyInputs.map((inputData, index) => {
                  if (inputData.type == "multiInput") {
                    return (
                      <Box
                        key={index}
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <TextField
                          name="amount"
                          label="Opening Balance"
                          type="number"
                          value={data.amount}
                          onChange={handleOnchange}
                          sx={{
                            width: "67%",
                            "& .MuiFormLabel-root": {
                              color: "#5d5d5d",
                            },
                            "& label.Mui-focused": {
                              color: "#5d5d5d",
                            },
                            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "gray",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderRadius: "5px 0 0 5px",
                            },
                          }}
                        />

                        <TextField
                          name={inputData.name}
                          label={inputData.label}
                          value={inputData.value}
                          onChange={inputData.onchange}
                          sx={{
                            "& .MuiInputBase-root .MuiSelect-select": {
                              color:
                                inputData.value == "CREDIT" ? "green" : "red",
                            },
                            "& .MuiFormLabel-root": {
                              color: "#5d5d5d",
                            },
                            "& .MuiFormLabel-root label.Mui-focused": {
                              color: "#5d5d5d",
                            },
                            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "gray",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderLeft: 0,
                              borderRadius: "0 5px 5px 0",
                            },
                            width: "33%",
                          }}
                          select
                        >
                          {inputData.inputArr?.map((elem, elemIndex) => (
                            <MenuItem
                              sx={{ color: elem.color }}
                              value={elem.value}
                              key={elemIndex}
                            >
                              {elem.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Box>
                    );
                  } else if (inputData.type == "radio") {
                    return (
                      <FormControl key={index}>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          {inputData.label}
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name={inputData.name}
                          value={inputData.value}
                          onChange={inputData.onchange}
                        >
                          {inputData.inputArr.map((elem, elemIndex) => (
                            <FormControlLabel
                              value={elem.value}
                              control={<Radio />}
                              label={elem.label}
                              key={elemIndex}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    );
                  } else {
                    return (
                      <TextField
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
                          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "gray",
                          },
                        }}
                      />
                    );
                  }
                })}
              </Stack>
            ) : type == "entry" ? (
              <Stack gap={2}>
                {entryInputs.map((inputData, index) => {
                  if (inputData.type == "multiline") {
                    return (
                      <TextField
                        name={inputData.name}
                        key={index}
                        label={inputData.label}
                        type={inputData.type}
                        value={inputData.value}
                        onChange={inputData.onchange}
                        multiline
                        rows={5}
                        placeholder={inputData.placeholder}
                        sx={{
                          "& .MuiFormLabel-root": {
                            color: "#5d5d5d",
                          },
                          "& label.Mui-focused": {
                            color: "#5d5d5d",
                          },
                          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "gray",
                          },
                        }}
                      />
                    );
                  } else if (inputData.type == "date") {
                    return (
                      <TextField
                        name={inputData.name}
                        key={index}
                        label={inputData.label}
                        type={inputData.type}
                        value={inputData.value}
                        onChange={inputData.onchange}
                        InputLabelProps={{
                          shrink: inputData.type == "date" ? true : "",
                        }}
                        sx={{
                          "& .MuiFormLabel-root": {
                            color: "#5d5d5d",
                          },
                          "& label.Mui-focused": {
                            color: "#5d5d5d",
                          },
                          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "gray",
                          },
                        }}
                      />
                    );
                  } else {
                    return (
                      <TextField
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
                          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "gray",
                          },
                        }}
                      />
                    );
                  }
                })}
              </Stack>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "blue",
                color: "white",
                fontWeight: "bold",
                width: "100%",
                "&:hover": {
                  backgroundColor: "#4646ed",
                },
              }}
            >
              {type == "party"
                ? "Add customer"
                : type == "entry"
                ? "Add Entry"
                : ""}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
