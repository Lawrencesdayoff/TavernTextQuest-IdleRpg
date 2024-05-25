import {useState, useEffect} from 'react'
import axios from 'axios'
import QuestPictures from '../../assets/QuestPictures';


const DevQuestScreen = () => {
    const [questname, setQuestName] = useState("");
    const [questdescription, setQuestDescription] = useState("");
    const [questlevel, setQuestLevel] = useState(0);
    const [questimages, setQuestImages] = useState([]);
    const [questbiome, setQuestBiome] = useState([]);
    const [questtimeminutes, setTimeMinutes] = useState(0);
    const [questtimehours, setTimeHours] = useState(0);
    const questbackgrounds = Array.from( QuestPictures.map((item) => (item.image)))
    const articbackgrounds = questbackgrounds.filter((item) => item.includes("christmas"))
    const desertbackgrounds = questbackgrounds.filter((item) => item.includes("desert"))
    const dungeonbackgrounds = questbackgrounds.filter((item) => item.includes("dungeon"))
    const forestbackgrounds = questbackgrounds.filter((item) => item.includes("forest"))
    const mountainbackgrounds = questbackgrounds.filter((item) => item.includes("Mountain"))
    const coastbackgrounds = questbackgrounds.filter((item)=> item.includes("sea&ocean") )
    const grasslandbackgrounds = questbackgrounds.filter((item)=> item.includes("Sky"))
    const urbanbackgrounds = questbackgrounds.filter((item) => item.includes("castle"))
    const handleQuestName = (e) => {
        setQuestName(e)
    };

    const findBiomeImages = () => {

    }

   const addQuestImages = (biome) => {
        switch(biome){
        case "Artic":     
            setQuestImages([... questimages, {Background_Type: "Artic", images: articbackgrounds}])
        break;
        case "Desert":
            setQuestImages([... questimages, {Background_Type: "Desert", images: desertbackgrounds}])
        break;
        case "Urban":
            setQuestImages([... questimages, {Background_Type: "Urban", images: urbanbackgrounds}])
        break;
        case "Dungeon":
            setQuestImages([... questimages, {Background_Type: "Dungeon", images: dungeonbackgrounds}])
        break;
        case "Forest":
            setQuestImages([... questimages, {Background_Type: "Forest", images: forestbackgrounds}])
        break;
        case "Mountains":
            setQuestImages([... questimages, {Background_Type: "Mountains", images: mountainbackgrounds}])
        break;
        case "Coastlands":
            setQuestImages([... questimages, {Background_Type: "Coastlands", images: coastbackgrounds}])
        break;
        case "Grasslands":
            setQuestImages([... questimages, {Background_Type: "Grasslands", images: grasslandbackgrounds}])
        break;
        default:
            console.log("something went wrong")
        }
    };

    const removeQuestImages = (biome) => {
        switch(biome){
        case "Artic":     
            setQuestImages(questimages.filter(item => item.Background_Type !== biome ))
        break;
        case "Desert":
            setQuestImages(questimages.filter(item => item.Background_Type !== biome ))
        break;
        case "Urban":
            setQuestImages(questimages.filter(item => item.Background_Type !== biome ))
        break;
        case "Dungeon":
            setQuestImages(questimages.filter(item => item.Background_Type !== biome ))
        break;
        case "Forest":
            setQuestImages(questimages.filter(item => item.Background_Type !== biome ))
        break;
        case "Mountains":
            setQuestImages(questimages.filter(item => item.Background_Type !== biome ))
        break;
        case "Coastlands":
            setQuestImages(questimages.filter(item => item.Background_Type !== biome ))
        break;
        case "Grasslands":
            setQuestImages(questimages.filter(item => item.Background_Type !== biome ))
        break;
        default:
            console.log("something went wrong")
        }
    };

   const handleQuestBiomes = (e) => {
        if(e.target.checked == true){
            setQuestBiome([...questbiome, e.target.value])
            addQuestImages(e.target.value)
        }
        else if(e.target.checked == false){
            setQuestBiome(questbiome.filter(item => item !== e.target.value));
            removeQuestImages(e.target.value)
        }
        console.log(questimages)
    };
   const handleQuestLevel = (e) => {
        setQuestLevel(e)
    };
   const handleQuestDescription = (e) => {
        setQuestDescription(e)
    };
   const handleQuestHours = (e) => {
        setTimeHours(e)
    }
   const handleQuestMinutes = (e) => {
        setTimeMinutes(e)
    }
   const adjustQuestTime = (e) => {
        const QuestTime = {questtimehours, questtimeminutes}
    };

    useEffect(()=>{}, )
    const createQuest = (e) => {
      e.preventDefault();
  
      axios.post("http://localhost:9999/api/newQuest", {
        Quest_name: questname, 
        Quest_images: questimages, 
        Quest_description: questdescription, 
        Quest_time_minutes: questtimeminutes, 
        Quest_time_hours: questtimehours, 
        Quest_biome: questbiome, 
        Quest_level: questlevel

        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          navigate("/dashboard");
        });
    };
    return(
    <>
    <form id= "questcreation" onSubmit={createQuest}>
        <label for = "questname"> Quest Name: </label>
        <input type= "text" id= "questname" name= "Quest_name" form= "questcreation" value = {questname} onChange={(e)=>handleQuestName(e.target.value)} />
        <label for= "questlevel"> Quest Level: </label>
        <input type= "number" id= "questlevel" min= "1" max= "20" name= "Quest_level" form = "questcreation" value = {questlevel} onChange={(e)=> handleQuestLevel(e.target.value)} />
        <label for = "questdescription"> Quest Description: </label>
        <input type= "textbox" id="questdescription" name= "Quest_description" form= "questcreation" value = {questdescription} onChange={(e)=>handleQuestDescription(e.target.value)} />
        <label for = "questtimehours"> Hours: </label>
        <input type= "number" min= "0" max="8" id= "questtimehours" name="Quest_time_hours" form= "questcreation" value = {questtimehours} onChange = {(e)=>handleQuestHours(e.target.value)} />
        <label for = "questtimeminutes"> Minutes: </label>
        <input type= "number" min= "0" max="59" id="questtimeminutes" name="Quest_time_minutes" form= "questcreation" value = {questtimeminutes} onChange = {(e)=>handleQuestMinutes(e.target.value)} />
        <div>
            <input type="checkbox" id= "biome1" form = "questcreation" value ="Artic" onChange={(e) => handleQuestBiomes(e)}/>
            <label for= "biome1">Artic</label>
            <input type="checkbox" id= "biome2" form = "questcreation" value ="Desert" onChange={(e) => handleQuestBiomes(e)}/>
            <label for= "biome2">Desert</label>
            <input type="checkbox" id= "biome3" form = "questcreation" value ="Urban" onChange={(e) => handleQuestBiomes(e)}/>
            <label for= "biome3">Urban</label>
            <input type="checkbox" id= "biome4" form = "questcreation" value ="Dungeon" onChange={(e) => handleQuestBiomes(e)}/>
            <label for= "biome4">Dungeon</label>
            <input type="checkbox" id= "biome5" form = "questcreation" value ="Forest" onChange={(e) => handleQuestBiomes(e)}/>
            <label for= "biome5">Forest</label>
            <input type="checkbox" id= "biome6" form = "questcreation" value ="Grasslands" onChange={(e) => handleQuestBiomes(e)}/>
            <label for= "biome6">Grasslands</label>
            <input type="checkbox" id= "biome7" form = "questcreation" value ="Mountains" onChange={(e) => handleQuestBiomes(e)}/>
            <label for= "biome7">Mountains</label>
            <input type="checkbox" id= "biome8" form = "questcreation" value ="Coastlands" onChange={(e) => handleQuestBiomes(e)}/>
            <label for = "biome8">Coastlands</label>
        </div>
        <button type="submit" form = "questcreation"> Finalize </button>
        <button type="reset" form = "questcreation"> Reset </button>

    </form>
    </>
)
}

export default DevQuestScreen;