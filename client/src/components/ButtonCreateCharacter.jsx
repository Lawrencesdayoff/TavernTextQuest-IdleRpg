import { useNavigate } from "react-router-dom";

const ButtonCreateCharacter = () => {
    const navigate = useNavigate();
    const toCharacterCreate = (e) => {
        e.preventDefault();
        navigate('/newcharacter');
    }
    return(
        <button class= "nes-btn is-primary" onClick={(e)=> toCharacterCreate(e)}>New Character</button>
    )
}

export default ButtonCreateCharacter;