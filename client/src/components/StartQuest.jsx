import { useParams, useNavigate, useLocation } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

const StartQuest = (props) => {
    const {token} = props;
    const [character, setCharacter] = useState("")
    const [quest, setQuest] = useState("")
        const {characterid, questid} = useParams()
        console.log(characterid)
        console.log(questid)
        
        useEffect(()=>{
            console.log(questid)
           const getQuest = async () => { 
            axios.get(`http://localhost:9999/api/getoneQuest/${questid}`)
            .then((res) => {
                setQuestDetails([res.data])
            }).catch((err) => {
                console.log(err)
            })
        }
            const getCharacter = async () => {axios.get(`http://localhost:9999/api/getoneCharacter/${characterid}`)
            .then((res) => {
                setQuest(res.data)
            }).catch((err) => {
                console.log(err)
            }
            )

            getQuest();
            getCharacter();

            const updateActiveQuests = async() => {
                axios.get(`http://localhost:9999/api//${token}`).then((res) => {
                    
                })
            } 
        }
        }, [])
        console.log()
        return(
        <>
        <p>{questid}</p>
        <p>{characterid}</p>
        </>
    )
}

export default StartQuest;