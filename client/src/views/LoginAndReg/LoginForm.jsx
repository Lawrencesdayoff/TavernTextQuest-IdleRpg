import { useEffect, useState, useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { validEmail } from "./Regex";
import AuthContext from "./AuthProvider";
import { useAuth } from "./AuthProvider";

const LoginForm = () => {
    const { id } = useParams();
    const [user_email, setEmail] = useState("");
    const [user_password, setPassword] = useState("");
    const [invalidform, setSubmitState] = useState(true);
  
    const [user_emailError, setEmailError] = useState("");
    const [user_passwordError, setPasswordError] = useState("")
  
    const [Emails, checkEmails] = useState([])
    const auth = useAuth();
    const navigate = useNavigate();

    const handleUserEmail = (e) => {
      setEmail(e);
      if (e.length < 4){
        setEmailError("Email must be at least 4 characters long")
      }
      }
  
  
    const handleUserPassword = (e) => {
      setPassword(e)
      if (e.length < 8){
        setPasswordError("password must be longer than 8 characters")
      }
    }
 
    // const isFormValid = () => {
    //   if ( user_emailError || user_passwordError ) {
    //     console.log(invalidform);
    //     return setSubmitState(true);
    //   } else if ((user_emailError || user_passwordError ) === "") {
    //     console.log(invalidform);
    //     return setSubmitState(true);
    //   } else if (
    //     user_emailError == (false || "") &&
    //     user_passwordError == (false || "")
    //   ) {
    //     console.log(invalidform);
    //     return setSubmitState(false);
    //   } 
    // };

    const loginUser = (e) => {
        e.preventDefault();
        const input = {user_email, user_password} 
        auth.loginAction(input);
        return;
      
       
      };
    

    return (
        <>
          <form onSubmit={loginUser}>
           
    
              <div>
                <label> Email: </label>
                <input type="email" value={user_email} onChange={(e) => {
                  handleUserEmail(e.target.value);
                }}/>
                
              </div>

              <div>
                <label> Password: </label>
                <input type="password" value={user_password} onChange={(e) => {
                  handleUserPassword(e.target.value);
                }}/>
              </div>
              {user_emailError? user_emailError: ""}
              <br />
              {user_passwordError? user_passwordError: ""}
              <br/>
             <input type="submit" class="nes-btn is-primary" value="Login"  /> 

          </form>
        </>
      );
}

export default LoginForm