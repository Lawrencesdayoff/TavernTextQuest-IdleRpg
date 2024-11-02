import { useNavigate } from "react-router-dom";
const QuestContainer = ({Heading, Content}) => {
    const navigate = useNavigate();


    return(
        <>
        <div className="scrollable-div-container-quests">
        <div className = "scrollable-div-Header">
            {Heading}
        </div>
        <div className="scrollable-div">
            {Content}
        </div>

        </div>
        </>
    )
}

export default QuestContainer;

