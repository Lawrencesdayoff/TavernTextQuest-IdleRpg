import { useState, useEffect } from "react"
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
import AbandonQuestButton from "../../components/AbandonQuestButton";

const ActiveQuest = (props) => {
    const { user, token } = props;
    const { questid: questid, characterid: characterid } = useParams();
    const [characterdata, setCharacterData] = useState([]);
    const [questdata, setQuestData] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [starttime, setStartTime] = useState("");
    const [questspecificevents, setQuestSpecificEvents] = useState([])
    const [questbiomes, setQuestBiomes] = useState([]);
    const [eventhistory, setEventHistory] = useState([]);
    const [encounterlog, setEncounterLog] = useState([]);

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);


    const [hasdied, setCharacterDied] = useState(false)
    const [questRunning, setQuestRunning] = useState(false)

    const [questgold, setGoldGain] = useState(0);
    const [characterhealthMax, setCharacterMaxHealth] = useState(0);
    const [characterhealth, setCharacterHealth] = useState(0);
    const [characterxp, setCurrentXP] = useState(0);
    const [characterxpThreshold, setThresholdXP] = useState(0);
    const [characterlevel, setCharacterLevel] = useState(0);

    const baseExp = 100;
    const levelExponent = 1.5;
    
    
    const handleQuestChatTabs = (change) => {
        setActiveTab(change);
    }
    const checkCharacterStatus = () => {
        if(characterdata.PC_incapacitated === true){
            setCharacterDied(true);
        }
    }
    const tabData = [
        {
            label: questdata.Quest_name,
            content: <QuestEventLog user={user} token={token}
                questid={questid} encounterlog={encounterlog} />
        },
        {
            label: "Quest Chat",
            content: < QuestChat user={user} token={token} />
        }
    ]
    const handleEncounterLog = () => {
        const newEncounterLog = eventhistory.flatMap((item) => [item.Description, item.Consequence]);
        setEncounterLog(newEncounterLog);
    };

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
        console.log("currenttime:", currentTime)
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

    const fetchCharacterAndQuestData = async () => {
        try {
            const [characterResponse, questResponse] = await Promise.all([
                axios.get(`http://localhost:9999/api/getoneCharacter/${characterid}`),
                axios.get(`http://localhost:9999/api/getoneQuest/${questid}`),
            ]);
            let character = characterResponse.data;
            let quest = questResponse.data;
            setCharacterData(character);
            setQuestData(quest);
            setStartTime(character.Quest_Start_Time)
            setCharacterHealth(character.PC_health)
            setCharacterMaxHealth(character.PC_constitution * 2);
            setGoldGain(0); // Reset gold gain at the start
            setQuestRunning(true);
            setEventHistory(character.Active_Quest_Log)
            setCharacterLevel(character.PC_level)
            setCurrentXP(character.PC_experience)
            setThresholdXP(Math.floor(baseExp * Math.pow(character.PC_level, levelExponent)))
            checkCharacterStatus()
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    }

    useEffect(() => {
        fetchCharacterAndQuestData()
    }, [characterid, questid])

    useEffect(() => {
        if (eventhistory.length > 0) {
            const newEncounterLog = eventhistory.flatMap((item) => [item.Description, item.Consequence]);
            setEncounterLog(newEncounterLog);
        }
    }, [eventhistory]);

    useEffect(() => {
        const updateView = async (currenttime) => {
            if (!questRunning) return
            else {
                getTime(currenttime)
                fetchCharacterAndQuestData()
                checkCharacterStatus()
            }

        };

        const nextevent = setInterval(() => updateView(starttime), 1000)
        return () => {
            //   clearInterval(interval);
            clearInterval(nextevent);
        }
    }, [starttime, hours, minutes, seconds])

    return (

        <>
            <div className="dashboard-area">
                <div className="dashboard-header">
                    <div class="col"><Header message={"Welcome"} username={user} /></div>
                    <div class="col"><LogoutButton /></div>
                    <div class="col"><AbandonQuestButton characterid={characterid} questid={questid} userid={token} /></div>
                </div>
                <div className="dashboard-content">
                    <div class="active-quest-HUD">
                        <Timer hours={hours} minutes={minutes} seconds={seconds} />

                        <CharacterHUD image={characterdata.PC_image} firstname={characterdata.PC_firstname} lastname={characterdata.PC_lastname}
                            gold={questgold} race={characterdata.PC_race} health={characterhealth} maxHp = {characterhealth}
                            pronouns={characterdata.PC_pronouns} strength={characterdata.PC_strength}
                            constitution={characterdata.PC_constitution} agility={characterdata.PC_agility} perception={characterdata.PC_perception}
                            intellect={characterdata.PC_intellect} magick={characterdata.PC_magick}
                            wisdom={characterdata.PC_wisdom} currentlevel={characterlevel} currentxp={characterxp} xptolevelup={characterxpThreshold} />
                        
                        {hasdied ? <p>{characterdata.PC_firstname} is incapacitated!</p> : <></>}

                        <ButtonToDashboard />
 
                    </div>
                    <div class="active-quest-ticker">
                        <Tabs tabs={tabData} content={tabData.content} onChangeTab={handleQuestChatTabs} activeTab={activeTab} />
                    </div>
                </div>
            </div>
        </>

    )
}


export default ActiveQuest;