import { Box, Button, Link, Stack, Typography } from "@mui/material";
import React from "react";
import { Toaster } from "react-hot-toast";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/router";
import { Autorenew } from "@mui/icons-material";

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
        backgroundImage: "url(/bg.jpg)",
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
          background: "#00000073",
          p: 2,
          borderRadius: 3,
          boxShadow: "0 0 3px 2px #e1e1e1",
          width: { xs: "90%", md: "500px" },
          gap: 2,
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          paddingTop: 7,
        }}
      >
        <Box
          sx={{
            height: "100px",
            width: "100px",
            position: "absolute",
            background: "#262626",
            borderRadius: "50%",
            top: -50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component={"img"}
            src="/LOGO.png"
            sx={{ objectFit: "contain", height: "70%", width: "50%" }}
          />
        </Box>

        {children}
        <Button
          type="submit"
          variant="contained"
          sx={{
            background: "#2599d6",
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
            <Autorenew className="loadingBtn" />
          ) : isLogin ? (
            "Login"
          ) : (
            "Create Account"
          )}
        </Button>

        {isLogin ? (
          <Stack direction={"row"} sx={{ alignItems: "center", gap: 1 }}>
            <Typography
              sx={{
                color: "#b3b3b3",
                display: "flex",
                alignItems: "center",
              }}
            >
              Don't have account?
            </Typography>
            <Typography
              onClick={() => {
                router.push(routeHandler);
              }}
              sx={{
                color: "#3c8aff",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              sign up
            </Typography>
          </Stack>
        ) : (
          <Stack direction={"row"} sx={{ alignItems: "center", gap: 1 }}>
            <Typography
              sx={{
                color: "#b3b3b3",
                display: "flex",
                alignItems: "center",
              }}
            >
              Already have account?
            </Typography>
            <Typography
              onClick={() => {
                router.push(routeHandler);
              }}
              sx={{
                color: "#3c8aff",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              sign in
            </Typography>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
