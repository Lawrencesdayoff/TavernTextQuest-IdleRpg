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
import LogItem from "./LogItem";
import AbandonQuestButton from "../../components/AbandonQuestButton";

const ActiveQuest = (props) => {
    const {user, token} = props;
    const {questid: questid, characterid: characterid} = useParams();
    const [characterdata, setCharacterData] = useState([]);
    const [questdata, setQuestData] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [starttime, setStartTime] = useState("");
    const [questtime, setQuestTime] = useState("");
    const [questtime_miliseconds, setQuestTimeMiliseconds] = useState(0);
    const [questspecificevents, setQuestSpecificEvents] = useState([])
    const [newevent, setNewEvent] = useState([]);
    const [questbiomes, setQuestBiomes] = useState([]);
    const [eventlog, setEventLog] = useState([]);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);


    const [hasdied, setCharacterDied] = useState(false)
    const [questRunning, setQuestRunning] = useState(false)

    const [questgold, setGoldGain] = useState(0);
    const [characterhealth, setCharacterHealth] = useState(0);
    const [characterxp, setCurrentXP] = useState(0);
    const [characterxpThreshold, setThresholdXP] = useState(0);
    const [characterlevel, setCharacterLevel] = useState(0);


    const handleQuestChatTabs = (change) => {
        setActiveTab(change);
    }

    const tabData = [
        {
            label:"QuestName",
            content: <QuestEventLog user = {user} token = {token}
                                    questid = {questid} eventlog = {eventlog} />
        },
        {
            label:"Quest Chat",
            content: < QuestChat user = {user} token = {token}/>
        }
    ]

    function getCurrentTime() {
        const now = new Date();
        const isoString = now.toISOString(); // Generates 2024-05-19T09:02:32.496Z
        const timeZoneOffset = -now.getTimezoneOffset(); // Get the timezone offset in minutes
    
        // Format timezone offset as ±HH:mm
        const sign = timeZoneOffset >= 0 ? "+" : "-";
        const hours = String(Math.floor(Math.abs(timeZoneOffset) / 60)).padStart(2, "0");
        const minutes = String(Math.abs(timeZoneOffset) % 60).padStart(2, "0");
        
        return `${isoString.slice(0, -1)}${sign}${hours}:${minutes}`; 
    }
    
    const getTime = (start) => {
        const startTime = Date.parse(start); 
        console.log(start)
        console.log(startTime)
        const currentTimeString = getCurrentTime()
        const currentTime = Date.parse(currentTimeString)
        console.log()
        console.log("currenttime:",currentTime)
        const timeDifference = Math.abs(currentTime - startTime); 
    
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
    };

    const formatDate = (dateString) => {
        const options = { hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" , second: "2-digit"}
        return new Date(dateString).toLocaleDateString([], options)
    };

    const formatQuestTime = (timestring) => {
        const [hours, minutes] = timestring.split(':')
        const questhours  = hours * 3600 * 1000
        const questminutes = minutes * 60 * 1000
        return questhours + questminutes
    };

    const getQuestTerrain = (array) => {
        const questbiomelist = array.map((item) => item)
        setQuestBiomes(questbiomelist)
        return questbiomes
    };

    const getRandomElement = (array) =>{
        const randomelement = array[Math.floor(Math.random()* array.length)];
        return randomelement      
    };

    const addExperience = async (additionalXP) => {
        try {
          await axios.patch(`http://localhost:9999/api/updateCharacterXP/${characterid}`, {
            additionalXP,
          });
        //   setCharacterData(response.data); // Update state with the new character data
        } catch (error) {
          console.error("Error adding experience:", error);
        }
      };

    const fetchRandomEvent = async (eventbiomes) => {
      const randomBiome = getRandomElement(eventbiomes);
      try{
      await axios.get(`http://localhost:9999/api/getrandomEvent/${randomBiome}`).then((res) => {
          setNewEvent(res.data);
          setEventLog((prevEventLog) => [...prevEventLog, res.data.Event_description]);
          runEventChecks(characterdata, res.data);
      })}
      catch (error){
        console.error(" Error fetching random event", error)
      }
        }

    const handleQuestEvent = (eventAtTime) => {
        setNewEvent(eventAtTime);
        setEventLog((prevEventLog) => [...prevEventLog, eventAtTime.Event_description]);
        runEventChecks(characterdata, eventAtTime);
    }

    const updateActiveQuestLog = async (currentEvent, eventOutcome) => {
        try{
        await axios.patch(`http://localhost:9999/api/updateCharacterActiveQuestLog/${characterid}`, 
        {
            eventId: currentEvent._id,
            eventDescription: currentEvent.Event_description,
            eventConsequence:  eventOutcome? currentEvent.Event_description_success : currentEvent.Event_description_failure ,
            eventGold: currentEvent.Event_success_gold_gain,
            eventLoot: eventOutcome? currentEvent.Event_loot_success : currentEvent.Event_XP_loot_failure ,
            eventXp: eventOutcome? currentEvent.Event_XP_gain_success : currentEvent.Event_XP_gain_failure 
        }
        ).then(() => {
        })
        }
        catch(error){
            console.log("Error updating character active quest log", error)
        }
    }
    const runEventChecks = (character, eventchecks) => {
        if(
        character.PC_strength >= eventchecks.Event_str_check &&
        character.PC_constitution >= eventchecks.Event_con_check &&
        character.PC_agility >= eventchecks.Event_agi_check &&
        character.PC_perception >= eventchecks.Event_per_check &&
        character.PC_intellect >= eventchecks.Event_int_check &&
        character.PC_wisdom >= eventchecks.Event_wis_check &&
        character.PC_magick >= eventchecks.Event_mag_check
        )
            return(
                setGoldGain( questgold + eventchecks.Event_success_gold_gain), 
                setCurrentXP(characterxp + eventchecks.Event_XP_gain_success),
                setEventLog((prevEventLog) => [...prevEventLog, eventchecks.Event_description_success]),
                addExperience(eventchecks.Event_XP_gain_success),
                updateActiveQuestLog(eventchecks, true)
            )
        else
            return(
                setCharacterHealth(characterhealth - eventchecks.Event_failure_health_loss),
                setCurrentXP(characterxp + eventchecks.Event_XP_gain_failure),
                setEventLog((prevEventLog) => [...prevEventLog, eventchecks.Event_description_failure]),
                addExperience(eventchecks.Event_XP_gain_failure),
                updateActiveQuestLog(eventchecks, false)
            )

    }

    const checkCharacterStatus = (healthstatus) => {
        if (healthstatus <= 0 ) {
            setQuestRunning(false)
            setCharacterHealth(0)
            setCharacterDied(true)
        }
        else{
            setQuestRunning(true)
        }
    }


    useEffect(()=> {   
        const getCharacterOnQuest = async() => {
            await axios.get(`http://localhost:9999/api/getoneCharacter/${characterid}`)
            .then((res) => {
                setCharacterData(res.data)
                setStartTime(res.data.Quest_Start_Time)
                setCharacterLevel(res.data.PC_level)
                setCharacterHealth(res.data.PC_constitution)
                setCurrentXP(res.data.PC_experience)
                setThresholdXP(Math.floor(100 * Math.pow(res.data.PC_level, 1.5)))
            }).catch((err) => {
                console.log(err);
            })
        }
        const getQuest = async() => {
            await axios.get(`http://localhost:9999/api/getoneQuest/${questid}`)
            .then((res) =>{
                setQuestData(res.data);
                getQuestTerrain(res.data.Quest_biome);
                setQuestTime("0" + res.data.Quest_time_hours + ":" + res.data.Quest_time_minutes)
                setQuestTimeMiliseconds(formatQuestTime("0" + res.data.Quest_time_hours + ":" + res.data.Quest_time_minutes))
            }).catch((err) => {
                console.log(err);
            })
        }
        const getQuestSpecificEvents = async() => {
            await axios.get(`http://localhost:9999/api/getallQuestSpecificEvents/${questid}`)
            .then(
                (res) => {
                    setQuestSpecificEvents(res.data)
                    return questspecificevents
                }).catch((err) => {
                console.log(err);
                })
        }
        getCharacterOnQuest().then( getQuest()).then(getQuestSpecificEvents()).then( setQuestRunning(true))
    }, [])

    useEffect(() => {
        const updateCharacterData = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/api/getoneCharacter/${characterid}`);
                const { PC_experience, PC_level } = response.data;
                setCurrentXP(PC_experience);
                setCharacterLevel(PC_level);
                
                setThresholdXP(Math.floor(100 * Math.pow(PC_level, 1.5)))
            } catch (error) {
                console.error("Error updating character data:", error);
            }
            try{

            }
            catch(error){
                console.log("Error updating character log")
            }
        };

        const interval = setInterval(updateCharacterData, 10000); // Update every 10 seconds
        return () => clearInterval(interval);
    }, [characterid]);
    

    return(

    <>
    <div className="dashboard-area">
          <div className= "dashboard-header">
            <div class = "col"><Header message={"Welcome"} username={user}/></div>
            <div class = "col"><LogoutButton /></div>
            <div class = "col"><AbandonQuestButton id = {characterid} /></div>
          </div>
        <div className = "dashboard-content">
            <div class = "active-quest-HUD">
                <Timer hours = {hours} minutes = {minutes} seconds = {seconds}/>

                <CharacterHUD image = {characterdata.PC_image} firstname = {characterdata.PC_firstname} lastname = {characterdata.PC_lastname}
                                gold = {questgold} race = {characterdata.PC_race}  health = {characterhealth}
                                pronouns = {characterdata.PC_pronouns} strength = {characterdata.PC_strength} 
                                constitution = {characterdata.PC_constitution} agility = {characterdata.PC_agility} perception = {characterdata.PC_perception}
                                intellect = {characterdata.PC_intellect} magick = {characterdata.PC_magick}
                                wisdom = {characterdata.PC_wisdom}  currentlevel = {characterlevel} currentxp = {characterxp} xptolevelup = {characterxpThreshold} />
                
                <ButtonToDashboard/>
                {hasdied? <p>{characterdata.PC_firstname} has died!</p>:<></> }
            </div>
            <div class = "active-quest-ticker">
                <Tabs tabs = {tabData} content = {tabData.content} onChangeTab={handleQuestChatTabs} activeTab={activeTab}/>
            </div>
      </div>
      </div>
    </>

)
}

export default ActiveQuest;