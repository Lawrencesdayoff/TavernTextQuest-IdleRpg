import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProfilePictures from "../assets/ProfilePictures";

const CharacterCreator = () => {
  const { id } = useParams();
  const [PC_firstname, setFirstname] = useState("");
  const [PC_lastname, setLastname] = useState("");
  const [PC_race, setRace] = useState("")
  const [PC_pronouns, setPronouns] = useState("");
  const [PC_bio, setBio] = useState("");
  const [PC_strength, setStrength] = useState(5);
  const [PC_constitution, setConstitution] = useState(5);
  const [PC_agility, setAgility] = useState(5);
  const [PC_perception, setPerception] = useState(5);
  const [PC_intellect, setIntellect] = useState(5);
  const [PC_magick, setMagick] = useState(5);
  const [PC_wisdom, setWisdom] = useState(5);
  const [userPoints, setUserPoints] = useState(25)
  const [portraitIndex, setPortraitIndex] = useState(0)
  const [user_firstnameError, setFirstnameError] = useState("");
  const [user_lastnameError, setLastnameError] = useState("");
  const [userPointsError, setPointsError] = useState("")
  const user_id = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const PortraitList = Array.from(ProfilePictures.map((item) => (item.image)))
  const [PC_image, setImage] = useState(PortraitList[Math.floor(Math.random() * PortraitList.length)])

  const returnToHome = (e) => {
    navigate("/dashboard");
  };

  const movePrevious = (e) => {
    e.preventDefault()
    setPortraitIndex(((portraitIndex - 1) + PortraitList.length) % PortraitList.length)
    setImage(PortraitList[portraitIndex])
    console.log(PC_image)
    
  }
  const moveNext = (e) => {
    e.preventDefault()
    setPortraitIndex((portraitIndex + 1) % PortraitList.length)
    setImage(PortraitList[portraitIndex])
    console.log(PC_image)

  }
  const handleFirstName = (e) => {
    setFirstname(e);
    if (e.length < 4) {
      setFirstnameError("First name must be at least 4 characters long");
    } else {
      setFirstnameError(false);
    }
  };
  const handleLastName = (e) => {
    setLastname(e);
    if (e.length < 4) {
      setLastnameError("Last name must be at least 4 characters long");
    } else {
      setLastnameError(false);
    }
  };

  const onIncrement = (e, value, funcIncrement) => {
    e.preventDefault();
    if (value < 5){
      funcIncrement(5)
    }

    else if (userPoints <= 0){
        console.log("No more points left")
        setUserPoints(0)
    }
    else {    
      setUserPoints(userPoints - 1);
      funcIncrement(value + 1)
    }
  }

  const onDecrement  = (e, value, funcDecrement) => {
    e.preventDefault();
    if (value <= 5){
        console.log("cannot decrease stat further")
        funcDecrement(5)
    }
    else if (userPoints >= 25){
        console.log("Point reserve full")
        setPointsError("You are at the maximum available skill points.")
        setUserPoints(25)
    }
    else{    
      setUserPoints(userPoints + 1);
      funcDecrement(value -1)
      }
  }
  
  const resetStats = (e) => {
    e.preventDefault()
    setUserPoints(25)
    setStrength(5)
    setAgility(5)
    setConstitution(5)
    setPerception(5)
    setIntellect(5)
    setMagick(5)
    setWisdom(5)
  }
  const randomizeStats = (e) => {
    resetStats(e)
    e.preventDefault()
    const stats = [0,0,0,0,0,0,0]
    // const FunctionArray = {setStr: function () {}, setCon: function () {setConstitution(PC_constitution + 1)}, setAgi: function () {setAgility(PC_agility+1)}, 
    //   setPer: function () {setPerception(PC_perception + 1)}, setInt: function () {setIntellect(PC_intellect + 1)}, setMag: function () {setMagick(PC_magick + 1)}, setWis: function () {setWisdom(PC_wisdom + 1)}}
      // const function_list = Object.keys(FunctionArray)
      for(let i = 0; i <= 25; i++){
        // const randomFunction = function_list[Math.floor(Math.random() * function_list.length)]
        // FunctionArray[randomFunction]()
        // console.log(FunctionArray[randomFunction])
        let random_index = Math.floor(Math.random() * stats.length)
        stats[random_index] = stats[random_index] + 1
        console.log(i)
      }
      setUserPoints(0)
      setStrength(5 + stats[0])
      setAgility(5 + stats[1])
      setConstitution(5 + stats[2])
      setPerception(5 + stats[3])
      setIntellect(5 + stats[4])
      setMagick(5 + stats[5])
      setWisdom(5 + stats[6])
      console.log(stats)
  }
  useEffect(()=>{}, )
  const createPC = (e) => {
    e.preventDefault();

    axios.post("http://localhost:9999/api/newCharacter", {
        user_id: user_id,
        PC_image: PC_image,
        PC_firstname: PC_firstname,
        PC_lastname: PC_lastname,
        PC_race: PC_race,
        PC_pronouns: PC_pronouns,
        PC_bio: PC_bio,
        PC_strength: PC_strength,
        PC_constitution: PC_constitution,
        PC_agility: PC_agility,
        PC_perception: PC_perception,
        PC_intellect: PC_intellect,
        PC_magick: PC_magick,
        PC_wisdom: PC_wisdom
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/dashboard");
      });
  };

    return(
    <>

    <div class = "char-screen">
    

    <form onSubmit={createPC}  id = "charactercreation">
      <a><button class="nes-btn is-primary" onClick={(e) => movePrevious(e)}> Arrow Left </button></a>
      <img src = {PC_image} alt = "alternate text"></img>
      <input type = "hidden" name = "PC_image" form = "charactercreator" value= {PC_image}/>
      <a><button class="nes-btn is-primary" onClick={(e) => moveNext(e)}> Arrow Right </button></a>
        <div class = "char-column">
          <div>
            <label> Character Portrait </label>
          </div>
          <div>
          <label> First Name: </label>
          <input type="text" form="charactercreation" value={PC_firstname} onChange={(e) =>
            handleFirstName(e.target.value)}/>
          </div>
        <div>
          <label> Last Name: </label>
          <input type="text" form="charactercreation" value={PC_lastname} onChange={(e) =>
            handleLastName(e.target.value)}/>
        </div>
        <div>
        <label for="Race">Race:</label>
        <select name="PC_race" id="race"  form="charactercreation" onChange={(e) => setRace(e.target.value)}>
          <option value="Grassman"> Grassman</option>
          <option value="High Elf"> High Elf </option>
          <option value="Dwarg"> Dwarg </option>
          <option value="Duende"> Duende </option>
          <option value="Iceman"> Iceman </option>
          <option value="Scorchlander"> Scorchlander </option>
          <option value="Titan"> Titan </option>
        </select>
        </div>
        <div>
        <label for="Pronouns">Pronouns:</label>
        <select name="PC_pronouns" id="pronouns"  form="charactercreation" onChange={(e) => setPronouns(e.target.value)}>
          <option value="she/her">She/ her</option>
          <option value="he/him">He/ him</option>
          <option value="they/them">They/ them</option>
        </select>
        </div>
        <label> Character Bio:</label>
        <textarea name="PC_bio" cols="20" rows="5" onChange={(e) => setBio(e.target.value)}></textarea>
           {/* For errors I think it would be better to have a symbol beside the field change depending on if its valid or not
           once users hover over the symbol the errors can be displayed */}
            </div>
            <div class = "skill-column">
                <p> Availble Points: {userPoints} </p>
              <div class = "skill-field">
                <label>Strength: </label>
                <a><button class= "nes-btn is-primary vertical-center" onClick = {(e) => onDecrement(e, PC_strength, setStrength)}> - </button></a>
                <p>{PC_strength}</p>  <input type = "hidden" name = "PC_strength" form = "charactercreator" value= {PC_strength}/>
                <a><button class= "nes-btn is-primary vertical-center" onClick = {(e) => onIncrement(e, PC_strength, setStrength)}> + </button></a>
              </div>
              <div class = "skill-field">
                <label>Constitution: </label>
                <a><button class= "nes-btn is-primary vertical-center" onClick = {(e) => onDecrement(e, PC_constitution, setConstitution)}> - </button></a>
                <p>{PC_constitution}</p>  <input type = "hidden" name = "PC_constitution" form = "charactercreator" value= {PC_constitution}/>
                <a><button class= "nes-btn is-primary vertical-center" onClick = {(e) => onIncrement(e, PC_constitution, setConstitution)}> + </button></a>
              </div>
              <div class = "skill-field">
                <label>Agility: </label>
                <a><button class= "nes-btn is-primary vertical-center" onClick = {(e) => onDecrement(e, PC_agility, setAgility)}> - </button></a>
                <p>{PC_agility}</p>  <input type = "hidden" name = "PC_agility" form = "charactercreator" value= {PC_agility}/>
                <a><button class= "nes-btn is-primary vertical-center" onClick = {(e) => onIncrement(e, PC_agility, setAgility)}> + </button></a>
              </div>
              <div class = "skill-field">
                <label>Perception: </label>
                <a><button class= "nes-btn is-primary vertical-center" onClick = {(e) => onDecrement(e, PC_perception, setPerception)}> - </button></a>
                <p>{PC_perception}</p>  <input type = "hidden" name = "PC_perception" form = "charactercreator" value= {PC_perception}/>
                <a><button class= "nes-btn is-primary vertical-center" onClick = {(e) => onIncrement(e, PC_perception, setPerception)}> + </button></a>
              </div>
              <div class = "skill-field">
                <label>Intellect: </label>
                <a><button class= "nes-btn is-primary vertical-center" onClick = {(e) => onDecrement(e, PC_intellect, setIntellect)}> - </button></a>
                <p>{PC_intellect}</p>  <input type = "hidden" name = "PC_intellect" form = "charactercreator" value= {PC_intellect}/>
                <a><button class= "nes-btn is-primary vertical-center" onClick = {(e) => onIncrement(e, PC_intellect, setIntellect)}> + </button></a>
              </div>
              <div class = "skill-field">
                <label>Magick: </label>
                <a><button class= "nes-btn is-primary vertical-center" onClick = {(e) => onDecrement(e, PC_magick, setMagick)}> - </button></a>
                <p>{PC_magick}</p>  <input type = "hidden" name = "PC_magick" form = "charactercreator" value= {PC_magick}/>
                <a><button class= "nes-btn is-primary vertical-center" onClick = {(e) => onIncrement(e, PC_magick, setMagick)}> + </button></a>
              </div>
              <div class = "skill-field">
                <label>Wisdom: </label>
                <a><button class= "nes-btn is-primary vertical-center" onClick = {(e) => onDecrement(e, PC_wisdom, setWisdom)}> - </button></a>
                <p>{PC_wisdom}</p> <input type = "hidden" name = "PC_wisdom" form = "charactercreator" value= {PC_wisdom}/>
                <a><button class= "nes-btn is-primary vertical-center" onClick = {(e) => onIncrement(e, PC_wisdom, setWisdom)}> + </button></a>
              </div>
              <button class= "nes-btn is-primary" onClick = {(e) => {resetStats(e)}}>Reset</button>
              <button class= "nes-btn is-primary" onClick = {(e) => {randomizeStats(e)}}>Randomize</button>
            </div>
                <br />
            <div class = "cc-footer">
                <button class="nes-btn is-primary" onClick={returnToHome}>to Dashboard</button>
                <input type="submit" class="nes-btn is-primary" form = "charactercreation" value="Finish" /> 
            </div>
            </form>
    </div>
  </>
)}

export default CharacterCreator;