import { Link } from "react-router-dom";

const CharacterItem = (props) => {
    const {_id , firstname, lastname} = props;
    
    return(
        <tr>
        <td> {firstname} {lastname} </td>
        <td> <Link to={"/character/" + _id }> Details </Link></td>
        <td> <Link to={"/character/" + _id + "/update"}> Update </Link></td>
        <td> <Link to={"/character/" + _id + "/delete"}> Delete </Link></td>
        </tr>
    )
}

export default CharacterItem;