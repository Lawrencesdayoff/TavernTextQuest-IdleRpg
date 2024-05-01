import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


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

  const [user_firstnameError, setFirstnameError] = useState("");
  const [user_lastnameError, setLastnameError] = useState("");
  const user_id = sessionStorage.getItem("token");

  const navigate = useNavigate();
  const returnToHome = (e) => {
    navigate("/dashboard");
  };


  const handleFirstName = (e) => {
    console.log(e.length);
    setFirstname(e);
    if (e.length < 4) {
      setFirstnameError("First name must be at least 4 characters long");
    } else {
      setFirstnameError(false);
    }
  };
  const handleLastName = (e) => {
    console.log(e.length);
    setLastname(e);
    if (e.length < 4) {
      setLastnameError("Last name must be at least 4 characters long");
    } else {
      setLastnameError(false);
    }
  };

//   const onIncrement = (e) => {
//     if (userPoints == 0){
//         console.log("No more points left")
//     }
//     else
//     setUserPoints(userPoints - 1);
//   }

//   const onDecrement  = (e, fun) => {
//     if (e <= 5){
//         console.log("cannot decrease stat further")
//     }
//     if (userPoints == 25){
//         console.log("Point reserve full")
//     }
//     else
//     setUserPoints(userPoints + 1);

//   }



  const isFormValid = () => {
    if (( user_lastnameError ||  user_firstnameError) == true) {
      console.log("There exists an error");
      return setSubmitState(true);
    } else if (( user_lastnameError ||user_firstnameError) === "") {
      console.log("There is a field missing");
      return setSubmitState(true);
    } else if (
      user_firstnameError == (false || "") &&
      user_lastnameError == (false || "") 
    ) {
      console.log(invalidform);
      return setSubmitState(false);
    } else console.log(invalidform);
    return setSubmitState(true);
  };

  const createPC = (e) => {
    e.preventDefault();

    axios.post("http://localhost:9999/api/newCharacter", {
        user_id: user_id,
        PC_firstname,
        PC_lastname,
        PC_race,
        PC_pronouns,
        PC_bio
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/dashboard");
      });
  };

    return(
    <>
    <form onSubmit={createPC} onChange={isFormValid} id = "charactercreation">
     
        <div class = "col">
        {user_firstnameError? user_firstnameError: ""}
              <br />
              {user_lastnameError? user_lastnameError: ""}
              <br />
          <label> First Name: </label>
          <input type="text" value={PC_firstname} onChange={(e) => {
            handleFirstName(e.target.value);
            isFormValid();
          }}/>
       
        <div>
          <label> Last Name: </label>
          <input type="text" value={PC_lastname} onChange={(e) => {
            handleLastName(e.target.value);
            isFormValid();
          }}/>
        </div>
        <label for="Race">Choose race:</label>
<select name="PC_race" id="race"  form="charactercreation" onChange={(e) => setRace(e.target.value)}>
  <option value="Grassman"> Grassman</option>
  <option value="High Elf"> High Elf </option>
  <option value="Dwarg"> Dwarg </option>
  <option value="Duende"> Duende </option>
  <option value="Iceman"> Iceman </option>
  <option value="Scorchlander"> Scorchlander </option>
  <option value="Titan"> Titan </option>


</select>

          <label for="Pronouns">Choose pronouns:</label>
<select name="PC_pronouns" id="pronouns"  form="charactercreation" onChange={(e) => setPronouns(e.target.value)}>
  <option value="she/her">She/ her</option>
  <option value="he/him">He/ him</option>
  <option value="they/them">They/ them</option>
</select>
<bn />
<textarea name="PC_bio" cols="40" rows="5" onChange={(e) => setBio(e.target.value)}></textarea>
    </div>
        <br />
        <div class = "col">
      <input type="submit" class="nes-btn is-primary" value="Register" />
      </div>
    </form>
          <br></br>
    <button class="nes-btn is-primary" onClick={returnToHome}>to Dashboard</button>
  </>
)}

export default CharacterCreator;