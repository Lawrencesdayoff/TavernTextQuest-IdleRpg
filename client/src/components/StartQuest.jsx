import { useParams, useNavigate, useLocation } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

const StartQuest = (props) => {
    const {token} = props;
    const [character, setCharacter] = useState("")
    const [quest, setQuest] = useState("")
    const {characterid, questid} = useParams()
    const navigate = useNavigate();
    console.log(characterid)
    console.log(questid)
        
        useEffect(()=>{
        //     console.log(questid)
        //    const getQuest = async () => { 
        //     axios.get(`http://localhost:9999/api/getoneQuest/${questid}`)
        //     .then((res) => {
        //         setQuest([res.data])
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // }
        //     const getCharacter = async () => {axios.get(`http://localhost:9999/api/getoneCharacter/${characterid}`)
        //     .then((res) => {
        //         setCharacter(res.data)
        //     }).catch((err) => {
        //         console.log(err)
        //     }
        //     )

        //     getQuest();
        //     getCharacter();

            const updateActiveQuests = async() => {
                axios.patch(`http://localhost:9999/api/updateCharacterfield/${characterid}`,{ 
                        On_Quest: true,
                        Current_Quest: questid
                    }
                ).then((res) => {
                    console.log("navigating to dashboard")
                   navigate('/dashboard');
                })
            } 

            updateActiveQuests();
        }
        , [])
        return(
        <>
        <p>{questid}</p>
        <p>{characterid}</p>
        </>
    )
}

export default StartQuest; 