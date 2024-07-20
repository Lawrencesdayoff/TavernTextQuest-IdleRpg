import HealthBar from "../../components/HealthBar";


const CharacterHUD = (props) => {
    const {image, firstname, lastname, race, 
         pronouns, strength, 
        constitution, agility, perception, 
        intellect, magick, wisdom } = props
    return(
        <>
        <img src={image} width= "200px" height = "200px"/>
        <p>{firstname} {lastname}</p>
        <HealthBar maxHp = {constitution}></HealthBar>
        
        </>
    )
}

export default CharacterHUD;