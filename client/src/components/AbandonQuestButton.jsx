import axios from "axios";
import { useNavigate} from "react-router-dom";

const AbandonQuestButton = (props) => {
    const {characterid, questid, userid} = props;
    const navigate = useNavigate();
    const toDashboard = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:9999/api/updateCharacterfield/${characterid}`, {
                On_Quest: false,
                Current_Quest: "",
                Active_Quest_Log: "",
                Quest_Start_Time: "" ,
                Quest_event_queue: ""
            }).then((res) => {
                axios.patch(`http://localhost:9999/api/removeUserActiveQuests/${userid}`, {
                    Quest_id: questid,
                    Character_id: characterid
                })
            })

        navigate('/dashboard');
    }
    return(
        <>
        <button class= "nes-btn is-primary" onClick={(e)=> toDashboard(e)}>Abandon Quest</button>
        </>
    )
}

export default AbandonQuestButton;