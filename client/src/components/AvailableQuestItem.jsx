import { Link } from "react-router-dom";


const AvailableQuestItem = (props) => {
    const {_id, questname, questlevel} = props
    return(
        <>
        <tr>
            <td>
                <Link to={"/availablequests/" + _id }>{questname}</Link>
            </td>
            <td>
                {questlevel}
            </td>
        </tr>
        </>
    )
}

export default AvailableQuestItem;