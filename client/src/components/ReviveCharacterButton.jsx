import axios from "axios";


const ButtonReviveCharacter = (props) => {
    const {characterid} = props
    const reviveCharacter = async (characterid) => {
        await axios.patch(`http://localhost:9999/api/updateCharacterHealth/${characterid}`)
    } 
    return(
        <>
        <button>
        <button class= "nes-btn is-primary" onClick={(e)=> reviveCharacter(e)}>Abandon Quest</button>

        </button>
        </>
    )
}