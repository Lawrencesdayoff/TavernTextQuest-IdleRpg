import { Link } from "react-router-dom";


const QuestListItem = (props) => {


    const {_id , questname} = props;
    
    return(
        <tr>
        <td> {questname} </td>
        <td> <Link to={"/availablequests/" + _id }> Details </Link></td>
        </tr>
    )

}
    export default CharacterItem;