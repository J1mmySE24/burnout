import React from "react";
import Router from "./Router";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ChatbotComponent from './chatbot'; 

function App(props) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router />
        <ChatbotComponent/>
      </LocalizationProvider>
    </>
  );
}

export default App;
