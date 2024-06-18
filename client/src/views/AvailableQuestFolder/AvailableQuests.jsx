import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import AvailableQuest from "./AvailableQuest";
import AvailableCharacters from "./AvailableCharacters";
import CharacterContainer from "../../components/CharacterContainer";
import CharacterItem from "../../components/CharacterItem";
const AvailableQuests = (props) => {
    const [details, setQuestDetails] = useState([])
    const [characterlist, setCharacterList] = useState([])
    const [selectedCharacter, setCharacter] = useState("")
    const {user, token} = props;
    const {questid} = useParams();
    useEffect(()=>{
        console.log(questid)
       const getQuestInfo = async () => { 
        axios.get(`http://localhost:9999/api/getoneQuest/${questid}`)
        .then((res) => {
            setQuestDetails([res.data])
        }).catch((err) => {
            console.log(err)
        })
    }
        const getCharacterInfos = async () => {axios.get(`http://localhost:9999/api/getcharactersoffquests/${token}`)
        .then((res) => {
            setCharacterList(res.data)
        }).catch((err) => {
            console.log(err)
        }
        )
    }
    getQuestInfo();
    getCharacterInfos();
    }, [])
    console.log(details)
    console.log(characterlist)

    return(
        <>
        <div>
        {details.map((item) => (
            <AvailableQuest Quest_name = {item.Quest_name} 
            Quest_description = {item.Quest_description} 
            Quest_images = {item.Quest_images.map((item) => item.images).filter((item) => item)}
            />
            ))}
        </div>
        <div>
            <AvailableCharacters characterlist = {characterlist.map((item) => item)} questid = {details.filter((item) => item._id)} quest = {questid}/>
        </div>
        </>
    )
}

export default AvailableQuests;