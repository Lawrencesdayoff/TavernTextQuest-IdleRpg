import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const DevEventScreen = () => {
    const navigate = useNavigate();
    const [questlist, setQuestList] = useState([])
    const [questinfo, setQuestInfo] = useState([])
    const [eventname, setEventName] = useState("")
    const [eventdescription, setEventDescription] = useState("")
    const [eventbiome, setEventBiome] = useState([]);
    const [eventsuccess, setEventSuccess] = useState("")
    const [eventfailure, setEventFailure] = useState("")
    const [questspecific, setQuestSpecific] = useState("")
    const [eventtimehour, setEventTimeHour] = useState(0)
    const [eventtimeminute, setEventTimeMinute] = useState(0)
    const [eventtimesecond, setEventTimeSecond] = useState(0)
    const [goldgain, setGoldGain] = useState(0)
    const [healthloss, setHealthLoss] = useState(0)
    const [checkstrength, setCheckStrength] = useState(0)
    const [checkconstitution, setCheckConstitution] = useState(0)
    const [checkagility, setCheckAgility] = useState(0)
    const [checkperception, setCheckPerception] = useState(0)
    const [checkintelligence, setCheckIntelligence] = useState(0)
    const [checkwisdom, setCheckWisdom] = useState(0)
    const [checkmagic, setCheckMagic] = useState(0)

    useEffect(()=>{
        axios.get(`http://localhost:9999/api/getallQuests`)
            .then((res) => {
                setQuestList(res.data)
            })
        
    }, [])

    
    const createEvent = (e) => {
        e.preventDefault();
  
        axios.post("http://localhost:9999/api/newEvent", {
            Event_name: eventname,
            Event_terrain: eventbiome,
            Quest_specific: questspecific,
            Quest_specific_hour: eventtimehour,
            Quest_specific_minute: eventtimeminute,
            Quest_specific_second: eventtimesecond,
            Event_description: eventdescription,
            Event_description_success: eventsuccess,
            Event_description_failure: eventfailure,
            Event_success_gold_gain: goldgain,
            Event_failure_health_loss: healthloss,
            Event_str_check: checkstrength,
            Event_con_check: checkconstitution,
            Event_agi_check: checkagility,
            Event_per_check: checkperception,
            Event_int_check: checkintelligence,
            Event_wis_check: checkwisdom,
            Event_mag_check: checkmagic
          })
          .then((res) => {
            console.log(res);
            console.log(res.data);
            navigate("/dashboard");
          });
    }

    const updateEventTimeMinutes = () => {
        setEventTimeMinute()
    }
    
    const getQuest = (questid) => {

        if(questid == ""){
            console.log("No value")
            setQuestInfo(false)
            setQuestSpecific(false)
            console.log(questinfo)
            console.log(questinfo.Quest_time_hours)
        }
        else if( questid != ""){
            setQuestSpecific(questid)
            console.log(questid)
            axios.get(`http://localhost:9999/api/getoneQuest/${questid}`)
            .then((res) => {
                setQuestInfo(res.data)
                console.log(questinfo)
                console.log(questinfo.Quest_time_hours)
                setEventBiome("")
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }


    const handleEventName = (e) => {
        setEventName(e);
    }
    const handleEventDescription = (e) => {
        setEventDescription(e);
    }
    const handleEventDescriptionSuccess = (e) => {
        setEventSuccess(e);
    }
    const handleEventDescriptionFailure = (e) => {
        setEventFailure(e);
    }
    const handleEventSuccessGoldGain = (e) => {
        setGoldGain(e);
    }
    const handleEventFailureHealthLoss = (e) => {
        setHealthLoss(e);
    }
    const handleStrCheck = (e) => {
        setCheckStrength(e);
    }
    const handleConCheck = (e) => {
        setCheckConstitution(e);
    }
    const handleAgiCheck = (e) => {
        setCheckAgility(e);
    }
    const handlePerCheck = (e) => {
        setCheckPerception(e);
    }
    const handleIntCheck = (e) => {
        setCheckIntelligence(e);
    }
    const handleWisCheck = (e) => {
        setCheckWisdom(e);
    }
    const handleMagCheck = (e) => {
        setCheckMagic(e);
    }
 
    const handleEventBiome = (e) => {
        if(e.target.checked == true){
            setEventBiome([...eventbiome, e.target.value])
        }
        else if(e.target.checked == false){
            setEventBiome(eventbiome.filter(item => item !== e.target.value));

        }
        console.log(eventbiome)
    }
        
    return(
    <>
        <form id="eventcreation" method="POST" onSubmit = {createEvent}>
        <label for="eventname"> Event Name: </label>
            <input type ="text" id= "eventname" name="Event_name" value= {eventname} form= "eventcreation" onChange = {(e) => handleEventName(e.target.value)}></input>
        <label for="eventdescription"> Event Description: </label>
            <input type ="textarea" id= "eventdescription" name="Event_description" value= {eventdescription} form= "eventcreation" onChange = {(e) => handleEventDescription(e.target.value)}></input>
        <label for="eventsuccess"> Event Success Description: </label>
            <input type ="textarea" id= "eventsuccess" name="Event_description_success" value= {eventsuccess} form= "eventcreation" onChange = {(e) => handleEventDescriptionSuccess(e.target.value)}></input>
        <label for="eventfailure"> Event Failure Description: </label>
            <input type ="textarea" id= "eventfailure" name="Event_description_failure" value= {eventfailure} form= "eventcreation" onChange = {(e) => handleEventDescriptionFailure(e.target.value)}></input>
        <label for = "eventquest">Quest Specific</label>
            <select name = "questspecific" form = "eventcreation" onChange = {(e) => getQuest(e.target.value) }>
                <option value = "">Not quest specific</option>
                {questlist.map((item) => (<option value = {item._id}>{item.Quest_name}</option>))}
            </ select>
            {questspecific ? <> {}
                <div class="slidecontainer">
                <p>{eventtimehour} hours</p>
                    <input type="range" min="0" max= {questinfo.Quest_time_hours} value={eventtimehour} class="slider" id="myRange" onChange={(e) => setEventTimeHour(e.target.value)}/> 
                </div>
                 <div class="slidecontainer">
                    <p>{eventtimeminute} minutes</p>
                    <input type="range" min="0" max= {questinfo.Quest_time_minutes} value={eventtimeminute} class="slider" id="myRange" onChange={(e) => setEventTimeMinute(e.target.value)}/> 
                </div>
                <div class="slidecontainer">
                    <p>{eventtimesecond} seconds</p>
                    <input type="range" min="0" max= "59" value={eventtimeminute} class="slider" id="myRange" onChange={(e) => setEventTimeMinute(e.target.value)}/> 
                </div>
                </>
                 : <></> }
        {questspecific ? <></>:<> <div>
            <p>Event Biomes:</p>
            <input type="checkbox" id= "biome1" form = "eventcreation" value ="Artic" onChange={(e) => handleEventBiome(e)}/>
            <label for= "biome1">Artic</label>
            <input type="checkbox" id= "biome2" form = "eventcreation" value ="Desert" onChange={(e) => handleEventBiome(e)}/>
            <label for= "biome2">Desert</label>
            <input type="checkbox" id= "biome3" form = "eventcreation" value ="Urban" onChange={(e) => handleEventBiome(e)}/>
            <label for= "biome3">Urban</label>
            <input type="checkbox" id= "biome4" form = "eventcreation" value ="Dungeon" onChange={(e) => handleEventBiome(e)}/>
            <label for= "biome4">Dungeon</label>
            <input type="checkbox" id= "biome5" form = "eventcreation" value ="Forest" onChange={(e) => handleEventBiome(e)}/>
            <label for= "biome5">Forest</label>
            <input type="checkbox" id= "biome6" form = "eventcreation" value ="Grasslands" onChange={(e) => handleEventBiome(e)}/>
            <label for= "biome6">Grasslands</label>
            <input type="checkbox" id= "biome7" form = "eventcreation" value ="Mountains" onChange={(e) => handleEventBiome(e)}/>
            <label for= "biome7">Mountains</label>
            <input type="checkbox" id= "biome8" form = "eventcreation" value ="Coastlands" onChange={(e) => handleEventBiome(e)}/>
            <label for = "biome8">Coastlands</label>
        </div></>}
        <label for="eventgoldgain"> Gold Gain: </label>
            <input type ="number" id= "eventgoldgain" name="Event_success_gold_gain" value= {goldgain} form= "eventcreation" onChange = {(e) => handleEventSuccessGoldGain(e.target.value)}></input>
        <label for="eventhealthloss"> Health Loss: </label>
            <input type ="number" id= "eventhealthloss" name="Event_failure_health_loss" value= {healthloss} form= "eventcreation" onChange = {(e) => handleEventFailureHealthLoss(e.target.value)}></input>
        <label for="checkstrength"> Strength Check: </label>
            <input type ="number" id= "checkstrength" name="Event_str_check" value= {checkstrength} form= "eventcreation" onChange = {(e) => handleStrCheck(e.target.value)}></input>
        <label for="checkconstitution"> Constitution Check: </label>
            <input type ="number" id= "checkconstitution" name="Event_con_check" value= {checkconstitution} form= "eventcreation" onChange = {(e) => handleConCheck(e.target.value)}></input>
        <label for="checkagility"> Agility Check: </label>
            <input type ="number" id= "checkagility" name="Event_agi_check" value= {checkagility} form= "eventcreation" onChange = {(e) => handleAgiCheck(e.target.value)}></input>
        <label for="checkperception"> Perception Check: </label>
            <input type ="number" id= "checkperception" name="Event_per_check" value= {checkperception} form= "eventcreation" onChange = {(e) => handlePerCheck(e.target.value)}></input>
        <label for="checkintelligence"> Intelligence Check: </label>
            <input type ="number" id= "checkintelligence" name="Event_int_check" value= {checkintelligence} form= "eventcreation" onChange = {(e) => handleIntCheck(e.target.value)}></input>
        <label for="checkwisdom"> Wisdom Check: </label>
            <input type ="number" id= "checkwisdom" name="Event_wis_check" value= {checkwisdom} form= "eventcreation" onChange = {(e) => handleWisCheck(e.target.value)}></input>
        <label for="checkmagic"> Magic Check: </label>
            <input type ="number" id= "checkmagic" name="Event_mag_check" value= {checkmagic} form= "eventcreation" onChange = {(e) => handleMagCheck(e.target.value)}></input>
        <div>
            <button type="submit" form="eventcreation">Create Event</button>
            <button type="reset" form="eventcreation">Reset</button>
        </div>
        </form>
    </>
)
}

export default DevEventScreen;