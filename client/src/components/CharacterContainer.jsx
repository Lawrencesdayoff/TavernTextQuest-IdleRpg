import { useNavigate } from "react-router-dom";

const CharacterContainer = ({Heading, Content}) => {
    const navigate = useNavigate();
    const toCharacterCreate = (e) => {
        e.preventDefault();
        navigate('/newcharacter');
    }
    return(
        <>
        <div className="scrollable-div-container">
        <div className = "scrollable-div-header">
            {Heading}
        </div>
        <div className="scrollable-div">
        <table>
            <th> Name </th>
            <tbody>
              {Content}
            </tbody>
          </table>
        </div>
        <div>
            <button class= "nes-btn is-primary" onClick={(e)=> toCharacterCreate(e)}>New Character</button>
        </div>
        </div>
        </>
    )
}

export default CharacterContainer;

