import axios from "axios";
import { useNavigate} from "react-router-dom";

const AbandonQuestButton = (props) => {
    const {id} = props;
    const navigate = useNavigate();
    const toDashboard = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:9999/api/updateCharacterfield/${id}`, {
                On_Quest: false,
                Current_Quest: "",
                Active_Quest_Log: "",
                Quest_Start_Time: "" ,
                Quest_event_queue: ""
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