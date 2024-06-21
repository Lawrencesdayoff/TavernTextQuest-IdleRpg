import { Link } from "react-router-dom";

const CharacterItemAvailableQuest = (props) => {
    const {_id , image, firstname, lastname, questid} = props;
    return(
        <>
            <tr>
                <td><img src = {image} /></td>
                <td> {firstname} {lastname} </td>
                <td> <Link to={"/embarkadventurer/" + _id + "/" + questid}> 
                    <button class="nes-btn is-primary" >Embark</button> 
                    </Link></td>
            </tr>
        </>
    )
}

export default CharacterItemAvailableQuest;