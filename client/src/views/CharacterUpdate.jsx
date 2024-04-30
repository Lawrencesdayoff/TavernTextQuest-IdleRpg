import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const CharacterUpdate = () => {
    const [PC_firstname, setFirstname] = useState("");
    const [PC_lastname, setLastname] = useState("");
    const [PC_race, setRace] = useState("")
    const [PC_pronouns, setPronouns] = useState("");
    const [PC_bio, setBio] = useState("");
    const {id} = useParams()
    const navigate = useNavigate();
    const returnToHome = (e) => {
        navigate("/dashboard");
      };
    useEffect(() => {
        axios
          .get(`http://localhost:9999/api/getoneCharacter/${id}`)
          .then((res) => {
            console.log(res.data);
            console.log("recovered book for update");
            setFirstname(res.data.PC_firstname);
            setLastname(res.data.PC_lastname);
            setRace(res.data.PC_race);
            setPronouns(res.data.PC_pronouns);
            setBio(res.data.PC_bio)
          })
          .catch((err) => {
            console.log(err);
          });
      }, [id]);
    
      const UpdateCharacter = (e) => {
        e.preventDefault();
          axios
            .put("http://localhost:9999/api/updateCharacter/" + id, {
              patientname,
              age,
              symptoms,
            })
            .then((res) => {
              console.log(res);
              console.log(res.data);
            });
          navigate("/patient/" + id + "/details");
          
          

        
      };
      return(
        <>
        <form onSubmit={UpdateCharacter}  id = "charactercreation">
         
            <div class = "col">
            
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
            <label for="Race">Race:</label>
               <p>{PC_race}</p>     
              <label for="Pronouns">Choose pronouns:</label>
    <select name="PC_pronouns" id="pronouns"  form="charactercreation" value = {PC_pronouns} onChange={(e) => setPronouns(e.target.value)}>
      <option value="she/her">She/ her</option>
      <option value="he/him">He/ him</option>
      <option value="they/them">They/ them</option>
    </select>
    <br />
    <textarea name="PC_bio" cols="40" rows="5" value= {PC_bio} onChange={(e) => setBio(e.target.value)}></textarea>
        </div>
            <br />
          <input type="submit" class="nes-btn is-primary" value="Register" />

        </form>

        <button class = "nes-btn is-primary" onClick={(e) => returnToHome(e)}> to Dashboard</button>
        
      </>
    )
}

export default CharacterUpdate