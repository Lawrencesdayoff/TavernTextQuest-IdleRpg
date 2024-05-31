import {useState, useEffect} from 'react'
import axios from 'axios'

const DevEventScreen = () => {

    const [eventname, setEventName] = useState("")
    const [eventdescription, setEventDescription] = useState("")
    const [eventsuccess, setEventSuccess] = useState("")
    const [eventfailure, setEventFailure] = useState("")
    const [goldgain, setGoldGain] = useState(0)
    const [healthloss, setHealthLoss] = useState(0)
    const [checkstrength, setCheckStrength] = useState(0)
    const [checkconstitution, setCheckConstitution] = useState(0)
    const [checkagility, setCheckAgility] = useState(0)
    const [checkperception, setCheckPerception] = useState(0)
    const [checkintelligence, setCheckIntelligence] = useState(0)
    const [checkwisdom, setCheckWisdom] = useState(0)
    const [checkmagic, setCheckMagic] = useState(0)

    useEffect(()=>{}, )

    
    const createEvent = () => {
        e.preventDefault();
  
        axios.post("http://localhost:9999/api/newEvent", {
            Event_name: eventname,
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

    return(
    <>
        <form id="eventcreation" method="POST" onSubmit = {createEvent}>
        <label for="eventname"> Event Name: </label>
            <input type ="text" id= "eventname" name="Event_name" value= {eventname} form= "eventcreation"></input>
        <label for="eventdescription"> Event Description: </label>
            <input type ="textarea" id= "eventdescription" name="Event_description" value= {eventdescription} form= "eventcreation"></input>
        <label for="eventsuccess"> Event Success Description: </label>
            <input type ="textarea" id= "eventsuccess" name="Event_description_success" value= {eventsuccess} form= "eventcreation"></input>
        <label for="eventfailure"> Event Failure Description: </label>
            <input type ="textarea" id= "eventfailure" name="Event_description_failure" value= {eventfailure} form= "eventcreation"></input>
        <label for="eventgoldgain"> Gold Gain: </label>
            <input type ="number" id= "eventgoldgain" name="Event_success_gold_gain" value= {goldgain} form= "eventcreation"></input>
        <label for="eventhealthloss"> Health Loss: </label>
            <input type ="number" id= "eventhealthloss" name="Event_failure_health_loss" value= {healthloss} form= "eventcreation"></input>
        <label for="checkstrength"> Strength Check: </label>
            <input type ="number" id= "checkstrength" name="Event_str_check" value= {checkstrength} form= "eventcreation"></input>
        <label for="checkconstitution"> Constitution Check: </label>
            <input type ="number" id= "checkconstitution" name="Event_con_check" value= {checkconstitution} form= "eventcreation"></input>
        <label for="checkagility"> Agility Check: </label>
            <input type ="number" id= "checkagility" name="Event_agi_check" value= {checkagility} form= "eventcreation"></input>
        <label for="checkperception"> Perception Check: </label>
            <input type ="number" id= "checkperception" name="Event_per_check" value= {checkperception} form= "eventcreation"></input>
        <label for="checkintelligence"> Intelligence Check: </label>
            <input type ="number" id= "checkintelligence" name="Event_int_check" value= {checkintelligence} form= "eventcreation"></input>
        <label for="checkwisdom"> Wisdom Check: </label>
            <input type ="number" id= "checkwisdom" name="Event_wis_check" value= {checkwisdom} form= "eventcreation"></input>
        <label for="checkmagic"> Magic Check: </label>
            <input type ="number" id= "checkmagic" name="Event_mag_check" value= {checkmagic} form= "eventcreation"></input>
        <div>
            <button type="submit" form="eventcreation">Create Event</button>
            <button type="reset" form="eventcreation">Reset</button>
        </div>
        </form>
    </>
)
}

export default DevEventScreen;