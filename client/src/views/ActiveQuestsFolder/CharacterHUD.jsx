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
        <div id="parchment">
            <div className="parchment-filter"></div>
        <img className= "character-portrait" src={image} />
        <p>{firstname} {lastname}</p>
        <p>Gold : {gold}</p>
        <p>Level: {currentlevel}</p>
        <HealthBar hp = {health} maxHp = {maxHp}></HealthBar>
        <XPBar  xp = {currentxp} xpLevel  = {xptolevelup}/>
        </div>
        </>
    )
}

export default CharacterHUD;