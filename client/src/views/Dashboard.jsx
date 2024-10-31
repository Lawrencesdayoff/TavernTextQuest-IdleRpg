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
import ActiveQuestItem from "../components/ActiveQuestItem";
import ButtonCreateCharacter from "../components/ButtonCreateCharacter";
import AudioPlayer from "../components/AudioPlayer";
const Dashboard = (props) => {
  const {user} = props
  const navigate = useNavigate();
  const [usercharacterlist, setCharacterList] = useState([]);
  const [availablequests, setAvailableQuests] = useState([])
  const [activecharacters, setActiveCharacters] = useState([])
  const [activequests, setActiveQuests] = useState([])
  const user_id = sessionStorage.getItem("token");
  // const [activequestinfo, setActiveQuestInfo] = useState([])
  const activequestinfo = [
    activequests,
    activecharacters
  ]


  useEffect(() => {
    const getUserQuests = async (ActiveQuestsList) => { await Promise.all(ActiveQuestsList.map((item) => 
      { axios.get(`http://localhost:9999/api/getoneQuest/${item}`)
      .then((res) => {
            setActiveQuests([res.data])
            console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })})
      );}
    const getUserCharacters = async () => {
      await axios.get(`http://localhost:9999/api/getusercharacters/${user_id}`)
      .then((res) => {
        console.log(res.data);
        setCharacterList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }

    const getCharactersQuesting = async () => {
      await axios.get(`http://localhost:9999/api/getcharactersonquests/${user_id}`).then((res) => {
      console.log(res.data);
      setActiveCharacters(res.data)
      const ActiveQuestIDList = res.data.map((item) => item.Current_Quest)
      console.log(ActiveQuestIDList)
      getUserQuests(ActiveQuestIDList)
      })
    }

    const getAllQuests = async () => {
     await axios.get("http://localhost:9999/api/getallQuests")
      .then((res) => {
        console.log(res.data);
        setAvailableQuests(res.data)
      }).catch((err)=> {
        console.log(err)
      })
    }
    getAllQuests();
    getUserCharacters();
    getCharactersQuesting();
    // setActiveQuestInfo([...activequests, activecharacters])

  }, []);


    console.log("Active Quests:" ,activequests)
    console.log("Characters Questing:" , activecharacters)
    console.log(activequestinfo)
  return (
    <>
    {}
      <div className="dashboard-area">
          <div className= "dashboard-header">
            <div class = "col"><Header message={"Welcome"} username={user}/></div>
            <div class = "col"><LogoutButton /></div>

          </div>
        <div className = "dashboard-content">
        
        <div class = "dashboard-quest-column">   
          <QuestContainer Heading = "Active Quests" Content = {activequests.map((item, index) => (
              <ActiveQuestItem key = {index} questid = {item._id} characterid = {activecharacters[index]._id} questname = {item.Quest_name} characterportrait = {activecharacters[index].PC_image}/>))} />

          <QuestContainer Heading = "Availble Quests" Content = {availablequests.map((item, index) => (
              <AvailableQuestItem key = {index} _id = {item._id} questname = {item.Quest_name} questlevel ={item.Quest_level}/>))} />
        </div>
        <div class = "dashboard-char-column">
            <CharacterContainer Actions = {<ButtonCreateCharacter/>} Heading= "Characters" Content =  {usercharacterlist.map((item, index) => (<CharacterItem key = {index} _id = {item._id} image = {item.PC_image} firstname = {item.PC_firstname} lastname = {item.PC_lastname} />))}
            />
            <AudioPlayer/>

        </div>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
