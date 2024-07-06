
import {useState, useEffect} from "react"
import Header from "../Header";
import LogoutButton from "../../components/LogoutButton";
import Tab from "../Tab";
import Tabs from "../Tabs";
import QuestEventLog from "./QuestEventLog";
import QuestChat from "./QuestChat";
import CharacterHUD from "./CharacterHUD";
import ButtonToDashboard from "../../components/ButtonToDashboard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Timer from "./components/Timer.jsx"

const ActiveQuest = (props) => {
    const {user, token} = props;
    const {questid, characterid} = useParams();

    const [characterdata, setCharacterData] = useState([])
    const [questdata, setQuestData] = useState([])
    const [activeTab, setActiveTab] = useState(0);
    const handleQuestChatTabs = (change) => {
        setActiveTab(change);
    }
    const tabData = [
        {
            label:"QuestName",
            content: <QuestEventLog user = {user} token = {token}/>
        },
        {
            label:"Quest Chat",
            content: < QuestChat user = {user} token = {token}/>
        }
    ]

    useEffect(() => {
        const getCharacterOnQuest = async() => {
            await axios.get(`http://localhost:9999/api/getoneCharacter/${characterid}`)
            .then((res) => {
                setCharacterData(res.data)
                console.log(res.data)
            }).catch((err) => {
                console.log(err);
            })
        }
    
        const getQuest = async() => {
            await axios.get(`http://localhost:9999/api/getoneQuest/${questid}`)
            .then((res) =>{
                setQuestData(res.data);
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }

        getCharacterOnQuest();
        getQuest();
    }, [])
    return(
    <>
    <div className="dashboard-area">
          <div className= "dashboard-header">
            <div class = "col"><Header message={"Welcome"} username={user}/></div>
            <div class = "col"><LogoutButton /></div>
          </div>
        <div className = "dashboard-content">
            <div class = "dashboard-quest-column">   
                <CharacterHUD image = {characterdata.PC_image} firstname = {characterdata.PC_firstname} lastname = {characterdata.PC_lastname} race = {characterdata.PC_race} 
                                pronouns = {characterdata.PC_pronouns} strength = {characterdata.PC_strength} 
                                constitution = {characterdata.constitution} agility = {characterdata.agility} perception = {characterdata.perception}
                                intellect = {characterdata.intellect} magick = {characterdata.magick} wisdom = {characterdata.wisdom}  />
                <ButtonToDashboard/>
            </div>
            <div class = "dashboard-char-column">
                <Tabs tabs = {tabData} content = {tabData.content} onChangeTab={handleQuestChatTabs} activeTab={activeTab}/>
            </div>
      </div>
      </div>
    </>

)
}

export default ActiveQuest;