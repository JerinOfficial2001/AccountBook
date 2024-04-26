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
        TabIndicatorProps={{ style: { backgroundColor: "#015578" } }}
        sx={{
          background: "#E3E3E3",
          "& .MuiTab-root.Mui-selected": {
            color: "#015578",
            // backgroundColor: "#e1f3f6",
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
            borderTop: "1px solid #d4c9c9",
            borderRight: "1px solid #d4c9c9",
            minHeight: "90vh",
          }}
        >
          {elem.content}
        </TabPanel>
      ))}
    </TabContext>
  );
}
