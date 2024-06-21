import { Link } from "react-router-dom";


const ActiveQuestItem = (props) => {
    const {questid, characterid, questname, characterportrait, health, elapsedtime} = props
    return(
        <tr>
            <td>
                <Link to={`/activequests/${questid}/${characterid}`}>{questname}</Link>
            </td>
            <td>elapsed time</td>
            <td>
                <img src = {characterportrait}/>
            </td>
        </tr>
    )
}

export default ActiveQuestItem;