import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const CharacterDetails = (props) => {
    const {charactername, characterage, symptoms} = props;
    const [details, setcharacterDetails] = useState([])
    const navigate = useNavigate();
    const {id} = useParams()
useEffect(() => {
    console.log(id)
    axios.get(`http://localhost:9999/api/getoneCharacter/${id}`)
        .then((res) => {
            console.log(res.data);
            setcharacterDetails(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}, [])

const returnToHome = (e) => {
    navigate("/dashboard");
  };

return(
    <>
    <div>
    <button class = "nes-btn is-primary" onClick={returnToHome}> Return to Dashboard </button>
    </div>
    
    <p>Name : {details.PC_firstname} {details.PC_lastname}</p>
     <p>Race: {details.PC_race}</p>
     <p>Pronouns: {details.PC_pronouns}</p>
     <p>Bio: {details.PC_bio}</p>
    </>
)

}
export default CharacterDetails;