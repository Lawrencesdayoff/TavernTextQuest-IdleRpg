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
import Timer from "../../components/Timer";
import HealthBar from "../../components/HealthBar";


const ActiveQuest = (props) => {
    const {user, token} = props;
    const {questid: questid, characterid: characterid} = useParams();
    const [characterdata, setCharacterData] = useState([])
    const [questdata, setQuestData] = useState([])
    const [activeTab, setActiveTab] = useState(0);
    const [starttime, setStartTime] = useState("")
    const [questtime, setQuestTime] = useState("")
    const [newevent, setNewEvent] = useState([])
    const [questbiomes, setQuestBiomes] = useState([])
    const [eventlog, setEventLog] = useState([])
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const handleQuestChatTabs = (change) => {
        setActiveTab(change);
    }
    const tabData = [
        {
            label:"QuestName",
            content: <QuestEventLog user = {user} token = {token}
                                    questid = {questid} />
        },
        {
            label:"Quest Chat",
            content: < QuestChat user = {user} token = {token}/>
        }
    ]

    const getTime = (start) => {
        const time = Math.abs(Date.parse(formatDate(start)) - Date.now());
        setDays((Math.floor((time / (1000 * 60 * 60 * 24)))));
        setHours((Math.floor((time / (1000 * 60 * 60)) % 24)));
        setMinutes((Math.floor((time / 1000 / 60) % 60)));
        setSeconds((Math.floor((time / 1000) % 60)));
    };
    const formatDate = (dateString) => {
        // const universalString =  Date.UTC(dateString)
        const options = { hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" , second: "2-digit"}
        return new Date(dateString).toLocaleDateString([], options)
    }

    const handleQuestTime = () => {
    
    }
    const getQuestTerrain = (array) => {
        const questbiomelist = array.map((item) => item)
        console.log(questbiomelist)
        setQuestBiomes(questbiomelist)
    }

    const getRandomElement = (array) =>{
        const randomelement = array[Math.floor(Math.random()* array.length)];
        return randomelement      
    }

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
                setStartTime(res.data.createdAt)
                console.log(res.data);
                console.log(starttime)
                getQuestTerrain(res.data.Quest_biome);
            }).catch((err) => {
                console.log(err);
            })
        }

        const updateQuest = async (eventbiomes) => {
            //get time
            //check time to see if scripted event is coming up
            // maybe use an if statement here to differentiate between whether or no the current time calls a quest specific event
            const randombiome = eventbiomes[Math.floor(Math.random() * eventbiomes.length)]
            await axios.get(`http://localhost:9999/api/getrandomEvent/${randombiome}`).then(
                (res) => {
                    setNewEvent(res.data)
                    setEventLog(res.data.Event_description)
                }).catch((err) => {
                    console.log(err);
                })
        }

        const runQuestLogic = async() => {

        }

        getCharacterOnQuest();
        getQuest();
        
        console.log(starttime)
        const interval = setInterval( () => getTime(starttime), 1000);
        const nextevent = setInterval (() => updateQuest(questbiomes, eventlog), 20000)
        return () => { 
        
          clearInterval(interval);
          clearInterval(nextevent);
        }
    }, [starttime], [questbiomes, eventlog])
    return(
    <>
    <div className="dashboard-area">
          <div className= "dashboard-header">
            <div class = "col"><Header message={"Welcome"} username={user}/></div>
            <div class = "col"><LogoutButton /></div>
          </div>
        <div className = "dashboard-content">
            <div class = "dashboard-quest-column">
                <Timer days = {days} hours = {hours} minutes = {minutes} seconds = {seconds}/>   
                <CharacterHUD image = {characterdata.PC_image} firstname = {characterdata.PC_firstname} lastname = {characterdata.PC_lastname} race = {characterdata.PC_race} 
                                pronouns = {characterdata.PC_pronouns} strength = {characterdata.PC_strength} 
                                constitution = {characterdata.PC_constitution} agility = {characterdata.PC_agility} perception = {characterdata.PC_perception}
                                intellect = {characterdata.PC_intellect} magick = {characterdata.PC_magick} wisdom = {characterdata.PC_wisdom}  />
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