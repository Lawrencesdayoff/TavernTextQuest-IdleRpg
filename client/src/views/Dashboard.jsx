import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import QuestContainer from "../components/QuestContainer";
import CharacterContainer from "../components/CharacterContainer";
import Header from "./Header";
import LogoutButton from "../components/LogoutButton";
import CharacterItem from "../components/CharacterItem";
import AvailableQuestItem from "../components/AvailableQuestItem";
import ButtonCreateCharacter from "../components/ButtonCreateCharacter";
const Dashboard = (props) => {
  const {user} = props
  const navigate = useNavigate();
  const [CharacterList, setCharacterList] = useState([]);
  const [availablequests, setAvailQuests] = useState([])
  const [userquests, setUserQuests] = useState([])
  const user_id = sessionStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`http://localhost:9999/api/getusercharacters/${user_id}`)
      .then((res) => {
        console.log(res.data);
        setCharacterList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get(`http://localhost:9999/api/getcharactersonquests/${user_id}`).then((res) => {
      console.log(res.data);
      setUserQuests(res.data.map())
    })
    axios.get("http://localhost:9999/api/getallQuests")
    .then((res) => {
      console.log(res.data);
      setAvailQuests(res.data)
    }).catch((err)=> {
      console.log(err)
    })
  }, []);
  return (
    <>
      <div className="dashboard-area">
      
          <div className= "dashboard-header">
            <div class = "col"><Header message={"Welcome"} username={user}/></div>
            <div class = "col"><LogoutButton /></div>

          </div>
        <div className = "dashboard-content">
        
        <div class = "dashboard-quest-column">   
          <QuestContainer Heading = "Active Quests" Content = "Content would go here" />
          <QuestContainer Heading = "Availble Quests" Content = {availablequests.map((item, index) => (<AvailableQuestItem key = {index} _id = {item._id} questname = {item.Quest_name} questlevel ={item.Quest_level}/>))} />
        </div>
        <div class = "dashboard-char-column">
            <CharacterContainer Actions = {<ButtonCreateCharacter/>} Heading= "Characters" Content =  {CharacterList.map((item, index) => (<CharacterItem key = {index} _id = {item._id} image = {item.PC_image} firstname = {item.PC_firstname} lastname = {item.PC_lastname} />))}
            />


        </div>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
