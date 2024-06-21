import { useNavigate} from "react-router-dom";



const ButtonToDashboard = () => {
    const navigate = useNavigate();

    const returnToHome = (e) => {
        navigate("/dashboard");
      };

    return(
        <button class = "nes-btn is-primary" onClick = {returnToHome}> to Dashboard</button>
    )
}
export default ButtonToDashboard;