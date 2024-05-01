import React, { useState } from "react";
import { Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export default function TabContainer({ tabName, handleTabName, tabData }) {
  return (
    <TabContext value={tabName}>
      <TabList
        variant="fullWidth"
        onChange={handleTabName}
        aria-label="simple tabs 
                        example"
        TabIndicatorProps={{ style: { backgroundColor: "#009b07" } }}
        sx={{
          background: "#3b3b3b",
          "& .MuiTab-root.Mui-selected": {
            color: "#6DCCDD",
            fontWeight: "550",
            height: "65px",
          },
          "& .MuiTabs-scroller": {
            overflow: "auto !important",
          },
          "*::-webkit-scrollbar": {
            width: "0px",
            height: "0px",
          },
          "& .MuiTab-root": {
            color: "#ffffff99",
          },
        }}
      >
        {tabData.map((elem, index) => (
          <Tab
            key={index}
            value={elem.value}
            label={elem.label}
            sx={{
              fontSize: { lg: "16px", sm: "16px", xs: "13px", md: "16px" },
              textTransform: "capitalize",
              minWidth: {
                xs: "max-content",
                sm: "max-content",
                md: "max-content",
                lg: "max-content",
                xl: "max-content",
              },
            }}
          />
        ))}
      </TabList>
      {tabData.map((elem, index) => (
        <TabPanel
          value={elem.value}
          key={index}
          sx={{
            p: 0,
            borderRight: "1px solid #686868",
            minHeight: "100%",
          }}
        >
          {elem.content}
        </TabPanel>
      ))}
    </TabContext>
  );
}
