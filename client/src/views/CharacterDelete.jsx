import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const CharacterDelete = () => {
    const navigate = useNavigate();
    const {id} = useParams()
      axios
      .delete(`http://localhost:9999/api/deleteCharacter/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log("character Deleted");
        navigate("/dashboard");
      });
}

export default CharacterDelete;