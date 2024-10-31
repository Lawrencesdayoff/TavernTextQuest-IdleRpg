import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./App.css";
import LoginAndReg from "./views/LoginAndReg/LoginAndReg";
import Dashboard from "./views/Dashboard";
import "nes.css/css/nes.min.css";
// import "bootstrap/dist/css/bootstrap-grid.css"
import AuthProvider from "./views/LoginAndReg/AuthProvider";
import CharacterCreator from "./views/CharacterCreationFolder/CharacterCreator";
import CharacterUpdate from "./views/CharacterCreationFolder/CharacterUpdate";
import CharacterDelete from "./views/CharacterDelete";
import CharacterDetails from "./views/CharacterDetails";
import QuestLog from "./views/QuestLog";
import ActiveQuest from "./views/ActiveQuestsFolder/ActiveQuest";
import AvailableQuests from "./views/AvailableQuestFolder/AvailableQuests";
import DeveloperScreen from "./views/DeveloperTools/DeveloperScreen";
// import PatientList from "./views/PatientList";
// import PatientDetails from "./views/PatientDetails";
// import PatientDelete from "./components/PatientDelete";
// import UpdatePatientForm from "./views/UpdatePatientForm"
import StartQuest from "./components/StartQuest";
function App() {
  const UserName = sessionStorage.getItem("user")
  const UserToken = sessionStorage.getItem("token")

  return (
    <>
      <BrowserRouter>
 
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginAndReg /> } />
          <Route path="/dashboard" element={<Dashboard user= {UserName} token = {UserToken}/>} />
          <Route path= "/newcharacter" element={<CharacterCreator/>}/>
          <Route path= "/character/:id/update" element = {<CharacterUpdate/>}/>
          <Route path= "/character/:id/delete" element = {<CharacterDelete />}/>
          <Route path= "/character/:id" element = {<CharacterDetails/>} />
          <Route path= "/availablequests/:questid" element= {<AvailableQuests user = {UserName} token = {UserToken}/>} />
          <Route path= "/activequests/:questid/:characterid" element= {<ActiveQuest user = {UserName} token = {UserToken}/>} />
          <Route path= "/developertools" element={<DeveloperScreen/>} />
          <Route path= "/embarkadventurer/:characterid/:questid" element={<StartQuest token = {UserToken}/>} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
