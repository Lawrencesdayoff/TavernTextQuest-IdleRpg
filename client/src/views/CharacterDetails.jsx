import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const CharacterDetails = (props) => {
    const { charactername, characterage, symptoms } = props;
    const [details, setcharacterDetails] = useState([])
    const navigate = useNavigate();
    const { id } = useParams();
    const [PC_image, setImage] = useState("");
    const [PC_firstname, setFirstname] = useState("");
    const [PC_lastname, setLastname] = useState("");
    const [PC_race, setRace] = useState("")
    const [PC_pronouns, setPronouns] = useState("");
    const [PC_bio, setBio] = useState("");
    const [PC_strength, setStrength] = useState(5);
    const [PC_constitution, setConstitution] = useState(5);
    const [PC_agility, setAgility] = useState(0);
    const [PC_perception, setPerception] = useState();
    const [PC_intellect, setIntellect] = useState(5);
    const [PC_magick, setMagick] = useState(5);
    const [PC_wisdom, setWisdom] = useState(5);
    const [PC_initUserPoints, setInitUserPoints] = useState(25)


    const [PC_initstrength, setInitStrength] = useState(5);
    const [PC_initconstitution, setInitConstitution] = useState(5);
    const [PC_initagility, setInitAgility] = useState(0);
    const [PC_initperception, setInitPerception] = useState();
    const [PC_initintellect, setInitIntellect] = useState(5);
    const [PC_initmagick, setInitMagick] = useState(5);
    const [PC_initwisdom, setInitWisdom] = useState(5);
    const [PC_userPoints, setUserPoints] = useState(25)


    const [userPointsError, setPointsError] = useState("")
    const user_id = sessionStorage.getItem("token");

    const fetchCharacterData = async () => {
        console.log(id)
        try {
            const [characterResponse] = await Promise.all([
            axios.get(`http://localhost:9999/api/getoneCharacter/${id}`)])
            let character = characterResponse.data;
            setImage(character.PC_image);
            setFirstname(character.PC_firstname);
            setLastname(character.PC_lastname);
            setRace(character.PC_race);
            setBio(character.PC_bio);



            setStrength(character.PC_strength);
            setConstitution(character.PC_constitution);
            setAgility(character.PC_agility);
            setPerception(character.PC_perception);
            setIntellect(character.PC_intellect);
            setMagick(character.PC_magick);
            setWisdom(character.PC_wisdom);

            
            setInitStrength(character.PC_strength);
            setInitConstitution(character.PC_constitution);
            setInitAgility(character.PC_agility);
            setInitPerception(character.PC_perception);
            setInitIntellect(character.PC_intellect);
            setInitMagick(character.PC_magick);
            setInitWisdom(character.PC_wisdom);

            setUserPoints(character.PC_levelup_points)

        }


        catch (err) {
            console.error("Error fetching data:", err);
        }
    }


    useEffect(() => {
        fetchCharacterData()
    }, [])



    const returnToHome = (e) => {
        navigate("/dashboard");
    };


    const onIncrement = (e, value, funcIncrement) => {
        e.preventDefault();
        if (PC_userPoints <= 0) {
            console.log("No more points left")
            setUserPoints(0)
        }
        else {
            setUserPoints(PC_userPoints - 1);
            funcIncrement(value + 1)
        }
    }

    const onDecrement = (e, value, statValue, funcDecrement) => {

        e.preventDefault();
        if (value <= statValue) {
            console.log("cannot decrease stat further")
            funcDecrement(statValue)
        }
        else if (PC_userPoints >= PC_initUserPoints) {
            console.log("Point reserve full")
            setPointsError("You are at the maximum available skill points.")
            funcDecrement(statValue)
        }
        else {
            setUserPoints(PC_userPoints + 1);
            funcDecrement(value - 1)
        }
    }

    const levelUp = (e) => {
        e.preventDefault();

        axios.patch("http://localhost:9999/api/", {
            user_id: user_id,
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
                navigate(`/character/${id}`);
            });
    };

    return (
        <>

            <div class="char-screen">


                <div class="char-column">
                    <div>
                        <img src={PC_image} />
                    </div>
                    <div>
                        <label> First Name: </label>
                        <p>{PC_firstname} {PC_lastname}</p>
                    </div>
                    <div>
                        <label for="Race">Race:</label>
                        <p>{PC_race}</p>
                    </div>
                    <div>
                        <label for="Pronouns">Pronouns:</label>
                        <p>{PC_pronouns}</p>
                    </div>
                    <label> Character Bio:</label>
                        <p>{PC_bio}</p>

                </div>
                {PC_initUserPoints > 0 ? (
                    <div class="skill-column">
                        <p> Availble Points: {PC_userPoints} </p>
                        <div class="skill-field">
                            <label>Strength: </label>
                            <a><button class="nes-btn is-primary vertical-center" onClick={(e) => onDecrement(e, PC_strength, PC_initstrength, setStrength)}> - </button></a>
                            { PC_initstrength < PC_strength ? (<p className="changed-stat">{PC_strength}</p>) : (<p>{PC_strength}</p>) }  <input type="hidden" name="PC_strength" form="charactercreator" value={PC_strength} />
                            <a><button class="nes-btn is-primary vertical-center" onClick={(e) => onIncrement(e, PC_strength, setStrength)}> + </button></a>
                        </div>
                        <div class="skill-field">
                            <label>Constitution: </label>
                            <a><button class="nes-btn is-primary vertical-center" onClick={(e) => onDecrement(e, PC_constitution, PC_initconstitution, setConstitution)}> - </button></a>
                            { PC_initconstitution < PC_constitution ? (<p className="changed-stat">{PC_constitution}</p>) : (<p>{PC_constitution}</p>) }  <input type="hidden" name="PC_constitution" form="charactercreator" value={PC_constitution} />
                            <a><button class="nes-btn is-primary vertical-center" onClick={(e) => onIncrement(e, PC_constitution, setConstitution)}> + </button></a>
                        </div>
                        <div class="skill-field">
                            <label>Agility: </label>
                            <a><button class="nes-btn is-primary vertical-center" onClick={(e) => onDecrement(e, PC_agility, PC_initagility, setAgility)}> - </button></a>
                            { PC_initagility < PC_agility ? (<p className="changed-stat">{PC_agility}</p>) : (<p>{PC_agility}</p>) } <input type="hidden" name="PC_agility" form="charactercreator" value={PC_agility} />
                            <a><button class="nes-btn is-primary vertical-center" onClick={(e) => onIncrement(e, PC_agility, setAgility)}> + </button></a>
                        </div>
                        <div class="skill-field">
                            <label>Perception: </label>
                            <a><button class="nes-btn is-primary vertical-center" onClick={(e) => onDecrement(e, PC_perception, PC_initperception, setPerception)}> - </button></a>
                            { PC_initperception < PC_perception ? (<p className="changed-stat">{PC_perception}</p>) : (<p>{PC_perception}</p>) } <input type="hidden" name="PC_perception" form="charactercreator" value={PC_perception} />
                            <a><button class="nes-btn is-primary vertical-center" onClick={(e) => onIncrement(e, PC_perception, setPerception)}> + </button></a>
                        </div>
                        <div class="skill-field">
                            <label>Intellect: </label>
                            <a><button class="nes-btn is-primary vertical-center" onClick={(e) => onDecrement(e, PC_intellect, PC_initintellect, setIntellect)}> - </button></a>
                            { PC_initintellect < PC_intellect ? (<p className="changed-stat">{PC_intellect}</p>) : (<p>{PC_intellect}</p>) }  <input type="hidden" name="PC_intellect" form="charactercreator" value={PC_intellect} />
                            <a><button class="nes-btn is-primary vertical-center" onClick={(e) => onIncrement(e, PC_intellect, setIntellect)}> + </button></a>
                        </div>
                        <div class="skill-field">
                            <label>Magick: </label>
                            <a><button class="nes-btn is-primary vertical-center" onClick={(e) => onDecrement(e, PC_magick, PC_initmagick, setMagick)}> - </button></a>
                            { PC_initmagick < PC_magick ? (<p className="changed-stat">{PC_magick}</p>) : (<p>{PC_magick}</p>) }  <input type="hidden" name="PC_magick" form="charactercreator" value={PC_magick} />
                            <a><button class="nes-btn is-primary vertical-center" onClick={(e) => onIncrement(e, PC_magick, setMagick)}> + </button></a>
                        </div>
                        <div class="skill-field">
                            <label>Wisdom: </label>
                            <a><button class="nes-btn is-primary vertical-center" onClick={(e) => onDecrement(e, PC_wisdom, PC_initwisdom, setWisdom)}> - </button></a>
                            { PC_initwisdom < PC_wisdom ? (<p className="changed-stat">{PC_wisdom}</p>) : (<p>{PC_wisdom}</p>) } <input type="hidden" name="PC_wisdom" form="charactercreator" value={PC_wisdom} />
                            <a><button class="nes-btn is-primary vertical-center" onClick={(e) => onIncrement(e, PC_wisdom, setWisdom)}> + </button></a>
                        </div>
                        <button class="nes-btn is-primary" onClick={(e) => { levelUp(e) }}>Submit Level Up</button>
                    </div>)
                    : (
                        <div class="skill-column">
                            <div class="skill-field">
                                <label>Strength: </label>
                                <p>{PC_strength}</p>
                            </div>
                            <div class="skill-field">
                                <label>Constitution: </label>
                                <p>{PC_constitution}</p>
                            </div>
                            <div class="skill-field">
                                <label>Agility: </label>
                                <p>{PC_agility}</p>
                            </div>
                            <div class="skill-field">
                                <label>Perception: </label>
                                <p>{PC_perception}</p>
                            </div>
                            <div class="skill-field">
                                <label>Intellect: </label>
                                <p>{PC_intellect}</p>
                            </div>
                            <div class="skill-field">
                                <label>Magick: </label>
                                <p>{PC_magick}</p>
                            </div>
                            <div class="skill-field">
                                <label>Wisdom: </label>
                                <p>{PC_wisdom}</p>
                            </div>
                        </div>
                    )
                }

                <br />
                <div class="cc-footer">
                    <button class="nes-btn is-primary" onClick={returnToHome}>to Dashboard</button>
                    <input type="submit" class="nes-btn is-primary" form="charactercreation" value="Finish" />
                </div>
            </div>
        </>
    )
}

export default CharacterDetails;