import {useState} from "react";
const getRandomPicture = (array) => {
    const randompic = array[Math.floor(Math.random()* array.length)];
    return randompic
}
const AvailableQuest = (props) => {
    const {Quest_name, Quest_images, Quest_description, Quest_level} = props;
        const [randompicture, setRandomPicture] = useState(() => getRandomPicture(Quest_images[0]))
        console.log(randompicture)


    
    return(
        <>
            <p>{Quest_name}</p>
            <img src={randompicture}></img>
            <p>{Quest_description}</p>
            <p>{Quest_level}</p>
        </>
    )
}

export default AvailableQuest;