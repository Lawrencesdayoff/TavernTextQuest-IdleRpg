import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import QuestContainer from "../components/QuestContainer";
import CharacterContainer from "../components/CharacterContainer";
import Header from "./Header";
import LogoutButton from "../components/LogoutButton";
import CharacterItem from "../components/CharacterItem";
const Dashboard = (props) => {
  const {user} = props
  const navigate = useNavigate();
  const [CharacterList, setCharacterList] = useState([]);
  const user_id = sessionStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:9999/api/getusercharacters/"+ user_id)
      .then((res) => {
        console.log(res.data);
        setCharacterList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="dashboard-area">
      
          <div className= "dashboard-header">
            <div class = "col"><Header message={"Welcome"} username={user}/></div>
            <div class = "col"><LogoutButton /></div>

          </div>
        <div className = "dashboard-content">
        
        <div class = "col">   
        <div class = "row">
          <QuestContainer Heading = "Active Quests" Content = "Content would go here" />
        </div>,
        <div class = "row">
          <QuestContainer Heading = "Availble Quests" Content = "Content would go here" />
        </div>
        </div>
        <div class = "col">
          <div class = "row">
            <CharacterContainer Heading= "Characters" Content =  {CharacterList.map((item, index) => (<CharacterItem key = {index} _id = {item._id} firstname = {item.PC_firstname} lastname = {item.PC_lastname} />))}
            />
          </div>

        </div>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
