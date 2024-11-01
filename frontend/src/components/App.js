import React from "react";
import Router from "./Router";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import calendarComponent from "./calendarComponent";

function App(props) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router />
        <calendarComponent />
      </LocalizationProvider>
    </>
  );
}

export default App;
