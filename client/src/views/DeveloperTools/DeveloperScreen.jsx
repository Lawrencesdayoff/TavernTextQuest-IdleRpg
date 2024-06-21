import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Tabs from "../Tabs"
import DevEventScreen from "./DevEventScreen";
import DevQuestScreen from "./DevQuestScreen";

const DeveloperScreen = () => {
  
  const [activeTab, setActiveTab] = useState(0);
  const handleDevScreenTabs = (change) => {
    setActiveTab(change)
  }

  const tabData = [
    {label: "Quest Development",
    content: <DevQuestScreen /> },
    { label: "Event Development",
    content: <DevEventScreen /> }
];
    return(
    <>
      <div class = "dev-screen">
      <Tabs tabs={tabData} content = {tabData.content} 
        onChangeTab = {handleDevScreenTabs} activeTab={activeTab}/>
      </div>
    </>
)}

export default DeveloperScreen;