import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children, handleSubmit }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage: "url(/BG.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Toaster position="top-center" />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          background: "white",
          p: 2,
          borderRadius: 3,
          boxShadow: "0 0 3px 2px #e1e1e1",
          width: "500px",
          gap: 2,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
        <Button
          type="submit"
          variant="contained"
          sx={{
            background: "blue",
            color: "white",
            fontWeight: "bold",
            width: "40%",
            "&:hover": {
              backgroundColor: "#4646ed",
            },
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
