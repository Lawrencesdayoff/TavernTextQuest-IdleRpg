import axios from "axios";


const ButtonReviveCharacter = (props) => {
    const {characterid, onReviveCharacterClick} = props;
    const onReviveCharacter = async () => {
        await axios.patch(`http://localhost:9999/api/reviveCharacter/${characterid}`)
    } 
    return(
        <>
        <button class= "nes-btn is-primary" onClick={(e) => onReviveCharacter(e)}> Revive Character </button>

        </>
    )
}

export default ButtonReviveCharacter;