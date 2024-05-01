import { Box, Button, Link, Stack, Typography } from "@mui/material";
import React from "react";
import { Toaster } from "react-hot-toast";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/router";

export default function AuthLayout({
  children,
  handleSubmit,
  isProcessing,
  isLogin,
  routeHandler,
}) {
  const router = useRouter();
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
        onSubmit={
          isProcessing
            ? (e) => {
                e.preventDefault();
              }
            : handleSubmit
        }
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
            transition: ".5s",
            "&:hover": {
              backgroundColor: "#4646ed",
            },
            borderRadius: "20px",
            minWidth: "unset",
            width: isProcessing ? "37px !important" : "auto",
          }}
        >
          {isProcessing ? (
            <RefreshIcon className="loadingBtn" />
          ) : isLogin ? (
            "Login"
          ) : (
            "Create Account"
          )}
        </Button>
        <Typography
          onClick={() => {
            router.push(routeHandler);
          }}
          sx={{
            color: "#0575ff",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {isLogin ? " Create your account" : "Already have account"}
          <ArrowForwardIcon />
        </Typography>
      </Box>
    </Box>
  );
}
