import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../Header";
import LogoutButton from "../../components/LogoutButton";
import Tab from "../Tab";
import Tabs from "../Tabs";
import QuestEventLog from "./QuestEventLog";
import QuestChat from "./QuestChat";
import CharacterHUD from "./CharacterHUD";
import ButtonToDashboard from "../../components/ButtonToDashboard";
import Timer from "../../components/Timer";
import AbandonQuestButton from "../../components/AbandonQuestButton";

const ActiveQuest = (props) => {
    const { user, token } = props;
    const { questid, characterid } = useParams();

    const [characterdata, setCharacterData] = useState({});
    const [questdata, setQuestData] = useState({});
    const [eventlog, setEventLog] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [questRunning, setQuestRunning] = useState(false);
    const [hasDied, setCharacterDied] = useState(false);
    const [questgold, setGoldGain] = useState(0);
    const [characterhealth, setCharacterHealth] = useState(0);

    const handleQuestChatTabs = (change) => setActiveTab(change);

    const tabData = [
        {
            label: "Quest Log",
            content: <QuestEventLog user={user} token={token} questid={questid} eventlog={eventlog} />,
        },
        {
            label: "Quest Chat",
            content: <QuestChat user={user} token={token} />,
        },
    ];

    const getCurrentTime = () => {
        const now = new Date();
        const isoString = now.toISOString();
        const timeZoneOffset = -now.getTimezoneOffset();
        const sign = timeZoneOffset >= 0 ? "+" : "-";
        const hours = String(Math.floor(Math.abs(timeZoneOffset) / 60)).padStart(2, "0");
        const minutes = String(Math.abs(timeZoneOffset) % 60).padStart(2, "0");
        return `${isoString.slice(0, -1)}${sign}${hours}:${minutes}`;
    };

    const calculateElapsedTime = (start) => {
        const startTime = Date.parse(start);
        const currentTime = Date.parse(getCurrentTime());
        const timeDifference = Math.abs(currentTime - startTime);

        setDays(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((timeDifference % (1000 * 60)) / 1000));
    };

    useEffect(() => {
        const fetchCharacterAndQuestData = async () => {
            try {
                const [characterResponse, questResponse] = await Promise.all([
                    axios.get(`http://localhost:9999/api/getoneCharacter/${characterid}`),
                    axios.get(`http://localhost:9999/api/getoneQuest/${questid}`),
                ]);
                const character = characterResponse.data;
                const quest = questResponse.data;

                setCharacterData(character);
                setQuestData(quest);
                setCharacterHealth(character.PC_constitution * 2);
                setGoldGain(0); // Reset gold gain at the start
                calculateElapsedTime(character.Quest_Start_Time);
                setQuestRunning(true);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchCharacterAndQuestData();
    }, [characterid, questid]);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            if (questRunning) calculateElapsedTime(characterdata.Quest_Start_Time);
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [questRunning, characterdata.Quest_Start_Time]);

    return (
        <div className="dashboard-area">
            <div className="dashboard-header">
                <div className="col">
                    <Header message="Welcome" username={user} />
                </div>
                <div className="col">
                    <LogoutButton />
                </div>
                <div className="col">
                    <AbandonQuestButton characterid={characterid} questid={questid} userid={token} />
                </div>
            </div>
            <div className="dashboard-content">
                <div className="active-quest-HUD">
                    <Timer hours={hours} minutes={minutes} seconds={seconds} />

                    <CharacterHUD
                        image={characterdata.PC_image}
                        firstname={characterdata.PC_firstname}
                        lastname={characterdata.PC_lastname}
                        gold={questgold}
                        race={characterdata.PC_race}
                        health={characterhealth}
                        pronouns={characterdata.PC_pronouns}
                        strength={characterdata.PC_strength}
                        constitution={characterdata.PC_constitution}
                        agility={characterdata.PC_agility}
                        perception={characterdata.PC_perception}
                        intellect={characterdata.PC_intellect}
                        magick={characterdata.PC_magick}
                        wisdom={characterdata.PC_wisdom}
                        currentlevel={characterdata.PC_level}
                        currentxp={characterdata.PC_experience}
                        xptolevelup={Math.floor(100 * Math.pow(characterdata.PC_level || 1, 1.5))}
                    />

                    <ButtonToDashboard />
                    {hasDied && <p>{characterdata.PC_firstname} has died!</p>}
                </div>
                <div className="active-quest-ticker">
                    <Tabs tabs={tabData} content={tabData.content} onChangeTab={handleQuestChatTabs} activeTab={activeTab} />
                </div>
            </div>
        </div>
    );
};

export default ActiveQuest;
