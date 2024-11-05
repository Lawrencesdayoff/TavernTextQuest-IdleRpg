import HealthBar from "../../components/HealthBar";
import XPBar from "../../components/XPBar";


const CharacterHUD = (props) => {
    const {image, firstname, lastname, health, race, gold, 
         pronouns, strength, 
        constitution, agility, perception, 
        intellect, magick, wisdom, currentlevel, currentxp} = props
       const xptolevelup = Math.floor(100 * Math.pow(currentlevel, 1.5))
    return(
        <>
        <img src={image} width= "200px" height = "200px"/>
        <p>{firstname} {lastname}</p>
        <p>Gold : {gold}</p>
        <p>Level: {currentlevel}</p>
        <HealthBar hp = {health} maxHp = {constitution}></HealthBar>
        <XPBar  xp = {currentxp} xpLevel  = {xptolevelup}/>
        </>
    )
}

export default CharacterHUD;