import { useParams, useNavigate, useLocation } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

const StartQuest = (props) => {
    const {token} = props;
    const [character, setCharacter] = useState("")
    const [quest, setQuest] = useState("")
    const {characterid, questid} = useParams()
    const navigate = useNavigate();
    console.log(characterid)
    console.log(questid)
        
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
    
    // Usage

    useEffect(()=>{
        const questStart = getCurrentTime();
        const updateActiveQuests = async() => {
            await axios.patch(`http://localhost:9999/api/updateUserActiveQuests/${token}`,{
                    Quest_id: questid,
                    Character_id: characterid,
                    Start_time: questStart
                }
            )
            .then((res) => axios.patch(`http://localhost:9999/api/updateCharacterfield/${characterid}`,{ 
                    On_Quest: true,
                    Current_Quest: questid,
                    Quest_Start_Time: questStart
                })
            ).then((res) => {
                axios.patch(`http://localhost:9999/api/updateStartQuest/${characterid}`, {questid: questid})
                console.log("navigating to dashboard")
                navigate('/dashboard')

            })
        } 

        updateActiveQuests();
        }
        , [])
        return(
        <>
        </>
    )
}

export default StartQuest; 