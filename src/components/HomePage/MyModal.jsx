import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, IconButton, MenuItem, Stack, TextField } from "@mui/material";
import { Close, Delete, Timer } from "@mui/icons-material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RefreshIcon from "@mui/icons-material/Refresh";
import { stringAvatar } from "./CollectionCard";
import KeyboardArrowLeftTwoToneIcon from "@mui/icons-material/KeyboardArrowLeftTwoTone";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import SouthWestRoundedIcon from "@mui/icons-material/SouthWestRounded";
import SubjectIcon from "@mui/icons-material/Subject";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
const style = {
  width: 400,
  bgcolor: "#262626",
  boxShadow: 24,
  float: "right",
  height: "100%",
  color: "whitesmoke",
};

export default function MyModal({
  open,
  handleClose,
  type,
  data,
  handleOnchange,
  handleSubmit,
  isProcessing,
  partyData,
  handleFormData,
}) {
  const partyInputs = [
    {
      name: "partyname",
      label: "Party Name",
      onchange: handleOnchange,
      value: data.partyname,
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

    // {
    //   name: "expensetype",
    //   label: "",
    //   onchange: handleOnchange,
    //   value: data.expensetype ? data.expensetype : "CREDIT",
    //   type: "multiInput",
    //   err: "",
    //   errMsg: "",
    //   inputArr: [
    //     {
    //       name: "CREDIT",
    //       label: "You Got",
    //       value: "CREDIT",
    //       color: "green",
    //     },
    //     {
    //       name: "DEBIT",
    //       label: "You Gave",
    //       value: "DEBIT",
    //       color: "red",
    //     },
    //   ],
    // },
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
                  data.modelTitle == "Party Details"
                    ? ""
                    : data.expensetype == "CREDIT"
                    ? "green"
                    : data.expensetype == "DEBIT"
                    ? "red"
                    : "",
                display: "flex",
                alignItems: "center",
              }}
            >
              {data.modelTitle == "Edit Entry" && (
                <IconButton
                  onClick={() => {
                    handleFormData("modelTitle", "Entry Details");
                  }}
                  sx={{
                    color:
                      data.expensetype == "CREDIT"
                        ? "green"
                        : data.expensetype == "DEBIT"
                        ? "red"
                        : "",
                  }}
                >
                  <KeyboardArrowLeftTwoToneIcon />
                </IconButton>
              )}
              {data?.modelTitle}
            </Typography>
            <IconButton sx={{ color: "whitesmoke" }} onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <Box
            component="form"
            onSubmit={
              data.modelTitle == "Entry Details"
                ? (e) => {
                    handleSubmit(e, data.partyID);
                  }
                : handleSubmit
            }
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
                            "& .MuiInputBase-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "gray !important",
                              },
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
                            "& .MuiInputBase-root": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "gray !important",
                              },
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
                      <FormControl sx={{ color: "#ffffff99" }} key={index}>
                        <FormLabel
                          sx={{ color: "#ffffff99" }}
                          id="demo-row-radio-buttons-group-label"
                        >
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
                            color: "#ffffff99",
                          },
                          "& label.Mui-focused": {
                            color: "#ffffff99",
                          },
                          "& .MuiInputBase-root": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "gray !important",
                            },
                            color: "whitesmoke",
                          },
                        }}
                      />
                    );
                  }
                })}
              </Stack>
            ) : data.modelTitle == "Add Entry" ||
              data.modelTitle == "Edit Entry" ? (
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
                            color: "#ffffff99",
                          },
                          "& label.Mui-focused": {
                            color: "#ffffff99",
                          },
                          "& .MuiInputBase-root": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "gray !important",
                            },
                            color: "whitesmoke",
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
                            color: "#ffffff99",
                          },
                          "& label.Mui-focused": {
                            color: "#ffffff99",
                          },
                          "& .MuiInputBase-root": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "gray !important",
                            },
                            color: "whitesmoke",
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
                            color: "#ffffff99",
                          },
                          "& label.Mui-focused": {
                            color: "#ffffff99",
                          },
                          "& .MuiInputBase-root": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "gray !important",
                            },
                            color: "whitesmoke",
                          },
                        }}
                      />
                    );
                  }
                })}
              </Stack>
            ) : data.modelTitle == "Entry Details" ? (
              <Stack gap={2}>
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
                <Button
                  onClick={() => {
                    handleFormData("modelTitle", "Edit Entry");
                  }}
                  sx={{
                    width: "80%",
                    color: "#ffffff99",
                    borderColor: "gray",
                    "&:hover": {
                      borderColor: "gray",
                    },
                  }}
                  variant="outlined"
                  startIcon={<BorderColorTwoToneIcon />}
                >
                  Edit Entry
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 1,
                    color: "slategray",
                  }}
                >
                  {data.expensetype == "DEBIT" ? (
                    <SouthWestRoundedIcon sx={{ color: "red" }} />
                  ) : (
                    <NorthEastRoundedIcon
                      sx={{
                        color: "green",
                      }}
                    />
                  )}
                  <Stack>
                    <Typography
                      sx={{
                        color: "lightcyan",
                      }}
                    >
                      {data.expensetype == "DEBIT" ? "You Gave" : "You Got"}
                    </Typography>
                    <Typography
                      sx={{
                        color: data.expensetype == "DEBIT" ? "red" : "green",
                        fontWeight: "bold",
                      }}
                    >
                      ₹ {data?.amount}
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 1,
                    color: "slategray",
                  }}
                >
                  <SubjectIcon />
                  <Stack>
                    <Typography
                      sx={{
                        color: "lightcyan",
                      }}
                    >
                      Description
                    </Typography>
                    <Typography>
                      {data?.details ? data?.details : "-"}
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 1,
                    color: "slategray",
                  }}
                >
                  <CurrencyRupeeIcon
                    sx={{ border: "2px solid slategray", borderRadius: "50%" }}
                  />
                  <Stack>
                    <Typography
                      sx={{
                        color: "lightcyan",
                      }}
                    >
                      Running Balance
                    </Typography>
                    <Typography
                      sx={{
                        color:
                          partyData.expensetype == "DEBIT" ? "red" : "green",
                        fontWeight: "bold",
                      }}
                    >
                      ₹ {partyData?.amount}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            ) : data.modelTitle == "Party Details" ? (
              <Stack gap={2}>
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
                <Button
                  onClick={() => {
                    handleFormData("modelTitle", "Edit Entry");
                  }}
                  sx={{
                    width: "80%",
                    color: "#ffffff99",
                    borderColor: "gray",
                    "&:hover": {
                      borderColor: "gray",
                    },
                  }}
                  variant="outlined"
                  startIcon={<BorderColorTwoToneIcon />}
                >
                  Edit Entry
                </Button>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 1,
                    color: "slategray",
                  }}
                >
                  <Timer />
                  <Stack>
                    <Typography
                      sx={{
                        color: "lightcyan",
                      }}
                    >
                      Date
                    </Typography>
                    <Typography>{partyData?.date}</Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 1,
                    color: "slategray",
                  }}
                >
                  <CurrencyRupeeIcon
                    sx={{ border: "2px solid slategray", borderRadius: "50%" }}
                  />
                  <Stack>
                    <Typography
                      sx={{
                        color: "lightcyan",
                      }}
                    >
                      Running Balance
                    </Typography>
                    <Typography
                      sx={{
                        color:
                          partyData.expensetype == "DEBIT" ? "red" : "green",
                        fontWeight: "bold",
                      }}
                    >
                      ₹ {partyData?.amount}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            ) : null}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                startIcon={
                  data.modelTitle == "Entry Details" && !isProcessing ? (
                    <Delete />
                  ) : (
                    ""
                  )
                }
                sx={{
                  borderRadius: "20px",
                  background:
                    data.modelTitle == "Entry Details" ||
                    data.modelTitle == "Party Details"
                      ? "red"
                      : "#1f1f9d",
                  color: "white",
                  fontWeight: "bold",
                  width: isProcessing ? "37px !important" : "100%",
                  "&:hover": {
                    backgroundColor:
                      data.modelTitle == "Party Details" ||
                      data.modelTitle == "Entry Details"
                        ? "#de5d5d"
                        : "#4646ed",
                  },
                  minWidth: "unset",
                }}
              >
                {isProcessing ? (
                  <RefreshIcon className="loadingBtn" />
                ) : type == "party" ? (
                  "Add Party"
                ) : type == "entry" ? (
                  data.modelTitle == "Entry Details" ||
                  data.modelTitle == "Party Details" ? (
                    "Delete"
                  ) : data.modelTitle == "Edit Entry" ? (
                    "Edit Entry"
                  ) : (
                    "Add Entry"
                  )
                ) : (
                  ""
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
