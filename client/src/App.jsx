import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./App.css";
import LoginAndReg from "./views/LoginAndReg/LoginAndReg";
import Dashboard from "./views/Dashboard";
import "nes.css/css/nes.min.css";
// import "bootstrap/dist/css/bootstrap-grid.css"
import AuthProvider from "./views/LoginAndReg/AuthProvider";
import CharacterCreator from "./views/CharacterCreator";
import CharacterUpdate from "./views/CharacterUpdate";
import CharacterDelete from "./views/CharacterDelete";
import CharacterDetails from "./views/CharacterDetails";
import QuestLog from "./views/QuestLog";
import ActiveQuest from "./views/ActiveQuest";
// import PatientList from "./views/PatientList";
// import PatientDetails from "./views/PatientDetails";
// import PatientDelete from "./components/PatientDelete";
// import UpdatePatientForm from "./views/UpdatePatientForm"
function App() {
  const UserInfo = sessionStorage.getItem("user")
  return (
    <>
      <BrowserRouter>
 
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginAndReg /> } />
          <Route path="/dashboard" element={<Dashboard user= {UserInfo}/>} />
          <Route path= "/newcharacter" element={<CharacterCreator/>}/>
          <Route path= "/character/:id/update" element = {<CharacterUpdate/>}/>
          <Route path= "/character/:id/delete" element = {<CharacterDelete />}/>
          <Route path= "/character/:id" element = {<CharacterDetails/>} />
          <Route path= "/availablequests/:id" element= {<QuestLog user = {UserInfo}/>} />
          <Route path= "/activequests/:id" element= {<ActiveQuest user = {UserInfo}/>} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
