import HealthBar from "../../components/HealthBar";
import XPBar from "../../components/XPBar";


const CharacterHUD = (props) => {
    const {image, firstname, lastname, health, maxHp, race, gold, 
         pronouns, strength, 
        constitution, agility, perception, 
        intellect, magick, wisdom, currentlevel, currentxp, xptolevelup} = props
    //    const xptolevelup = Math.floor(100 * Math.pow(currentlevel, 1.5))
    return(
        <>
   
        <img className= "character-portrait-activequest" src={image} />
        <p>{firstname} {lastname}</p>
        <p>Gold : {gold}</p>
        <p>Level: {currentlevel}</p>
        <div>
            <img src="\public\UI\pixel-heart-2779422_640.png" height = "40px"></img>
        <HealthBar hp = {health} maxHp = {maxHp}></HealthBar>
        </div>
        
        <XPBar  xp = {currentxp} xpLevel  = {xptolevelup}/>
        
        </>
    )
}

export default CharacterHUD;