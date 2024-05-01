import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Stack, Tab, useMediaQuery } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TabContainer from "../components/HomePage/TabContainer";
import { Logout } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ children }) {
  const router = useRouter();

  const theme = useTheme();

  const isxs = useMediaQuery(theme.breakpoints.only("xs"));
  const issm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  const [open, setOpen] = useState(false);
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleLogout = () => {
    Cookies.remove("userData");
    router.push("/auth/login");
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerClose}>
      <List>
        <DrawerHeader
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            background: "#262626",
            borderBottom: "2px solid #686868",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: "#6DCCDD",
            }}
          >
            <Box component="img" src="/LOGO.png" sx={{ height: "30px" }} />
            ACCOUNT BOOK
          </Typography>
          <IconButton
            sx={{
              color: "#f2eeee",
            }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "#f2eeee",
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: "#686868" }} />
      <List>
        {["All mail", "Trash", "Logout"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                text == "Logout" ? handleLogout() : undefined;
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "#f2eeee",
                  color: "#f2eeee",
                }}
              >
                {index % 2 === 0 ? <Logout /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <CssBaseline />
      <IconButton
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          ...((isXl || isLg || isMd || open) && { display: "none" }),
          position: "absolute",
          left: 20,
          top: 10,
          zIndex: 2,
          color: "whitesmoke",
        }}
      >
        <MenuIcon />
      </IconButton>
      {isXl || isLg || isMd ? (
        <Drawer
          variant={"permanent"}
          open={open}
          sx={{
            "& .MuiPaper-root:hover": {
              overflowY: "auto",
            },
            "& .MuiPaper-root": {
              background: "#262626",
              color: "#f2eeee",
              overflow: "hidden",
              "&::-webkit-scrollbar": {
                width: open ? "8px" : "3px",
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
            },
          }}
          onClose={handleDrawerClose}
        >
          {open ? (
            <DrawerHeader
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                background: "#262626",
                borderBottom: "2px solid #686868",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  color: "#6DCCDD",
                }}
              >
                <Box component="img" src="/LOGO.png" sx={{ height: "30px" }} />
                ACCOUNT BOOK
              </Typography>
              <IconButton
                sx={{
                  color: "#f2eeee",
                }}
                onClick={handleDrawerClose}
              >
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
          ) : (
            <DrawerHeader
              sx={{
                justifyContent: "center",
                position: "sticky",
                top: 0,
                zIndex: 1,
                background: "#262626",
                borderBottom: "2px solid #686868",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  ...(open && { display: "none" }),
                  margin: 0,
                }}
              >
                <MenuIcon />
              </IconButton>
            </DrawerHeader>
          )}
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#f2eeee",
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ borderColor: "#686868" }} />
          <List>
            {["All mail", "Trash", "Logout"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => {
                    text == "Logout" ? handleLogout() : undefined;
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      color: "#f2eeee",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <Logout /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      ) : (
        <MuiDrawer
          sx={{
            "& .MuiPaper-root:hover": {
              overflowY: "auto",
            },
            "& .MuiPaper-root": {
              background: "#262626",
              color: "#f2eeee",
              overflow: "hidden",
              "&::-webkit-scrollbar": {
                width: open ? "8px" : "3px",
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
            },
          }}
          open={open}
          onClose={handleDrawerClose}
        >
          {DrawerList}
        </MuiDrawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
          },
          alignItems: "center",
          background: "#020202d1",
          height: issm || isxs ? "100%" : "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
