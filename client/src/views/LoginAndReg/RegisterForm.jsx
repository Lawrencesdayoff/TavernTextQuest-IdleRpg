import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { validEmail } from "./Regex";

const RegisterForm = (props) => {
  const { id } = useParams();
  const [user_firstname, setFirstname] = useState("");
  const [user_lastname, setLastname] = useState("");
  const [user_username, setUsername] = useState("")
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [invalidform, setSubmitState] = useState(true);

  const [user_firstnameError, setFirstnameError] = useState("");
  const [user_lastnameError, setLastnameError] = useState("");
  const [user_usernameError, setUsernameError] = useState("");
  const [user_emailError, setEmailError] = useState("");
  const [user_passwordError, setPasswordError] = useState("")

  const [Emails, checkEmails] = useState([])

  const navigate = useNavigate();

  const handleUserName = (e) => {
    setUsername(e);
    if (!e) {
      setUsernameError("User name must be at least 1 characters long");
    } else if (e.length < 1) {
      setUsernameError("User name must be at least 1 characters long");
    } else {
      setUsernameError(false);
    }
  };
  const handleUserFirstName = (e) => {
    console.log(e.length);
    setFirstname(e);
    if (e.length < 4) {
      setFirstnameError("first name must be at least 4 characters long");
    } else {
      setFirstnameError(false);
    }
  };
  const handleUserLastName = (e) => {
    console.log(e.length);
    setLastname(e);
    if (e.length < 4) {
      setLastnameError("last name must be at least 4 characters long");
    } else {
      setLastnameError(false);
    }
  };
  const handleUserEmail = (e) => {
    setEmail(e);
    if (!validEmail.test(e)) {

      setEmailError(true);
   }
    else {
      setEmailError(false);
    }
    }


  const handleUserPassword = (e) => {
    setPassword(e)
    if (e.length < 8){
      setPasswordError("password must be longer than 8 characters")
    }
    else {
      setPasswordError(false);
    }
  }

  const isFormValid = () => {
    if ((user_usernameError || user_emailError || user_lastnameError || user_passwordError || user_firstnameError) == true) {
      console.log("There exists an error");
      return setSubmitState(true);
    } else if ((user_usernameError || user_emailError || user_lastnameError || user_passwordError || user_firstnameError) === "") {
      console.log("There is a field missing");
      return setSubmitState(true);
    } else if (
      user_emailError == (false || "") &&
      user_firstnameError == (false || "") &&
      user_lastnameError == (false || "") &&
      user_passwordError == (false || "") &&
      user_usernameError == (false || "")
    ) {
      console.log(invalidform);
      return setSubmitState(false);
    } else console.log(invalidform);
    return setSubmitState(true);
  };
  const checkEmail = () => {
    axios.get("http://localhost:9999/api/getallUsers").then((response)=>{ 
    const listofemails = response.data.map(res => res.user_email) 
    checkEmails(listofemails)}
  ) 
  }
  const createUser = (e) => {
    e.preventDefault();
    if (invalidform == true) {
      navigate("/");
    }
    checkEmail()
    if(Emails.includes(user_email.trim())) {
      alert(`Email is already taken, please enter another email address into the field.`)
      return
  }
    axios.post("http://localhost:9999/api/newUser", {
        user_username,
        user_firstname,
        user_lastname,
        user_email,
        user_password
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/dashboard");
      });
  };

  return (
    <>
      <form onSubmit={createUser} onChange={isFormValid}>
       
          <div>
            <label> First Name: </label>
            <input type="text" value={user_firstname} onChange={(e) => {
              handleUserFirstName(e.target.value);
              isFormValid();
            }}/>
          </div>
          <div>
            <label> Last Name: </label>
            <input type="text" value={user_lastname} onChange={(e) => {
              handleUserLastName(e.target.value);
              isFormValid();
            }}/>
          </div>
          <div>
            <label> Email: </label>
            <input type="text" value={user_email} onChange={(e) => {
              handleUserEmail(e.target.value);
              isFormValid();
            }}/>
            {user_emailError && <p>Your email is invalid</p>}
          </div>
          <div>
            <label> User Name: </label>
            <input type="text" value={user_username}
              onChange={(e) => {
                handleUserName(e.target.value);
                isFormValid();
              }}/>
          </div>
          {user_usernameError ? <p>{user_usernameError}</p> : ""}
          <div>
            <label> Password: </label>
            <input type="password" value={user_password} onChange={(e) => {
              handleUserPassword(e.target.value);
              isFormValid();
            }}/>
          </div>
          <br />
          {user_usernameError? user_usernameError: ""}
              <br />
              {user_firstnameError? user_firstnameError: ""}
              <br />
              {user_lastnameError? user_lastnameError: ""}
              <br />
              {user_emailError? user_emailError: ""}
              <br />
              {user_passwordError? user_passwordError: ""}
        <input type="submit" class="nes-btn is-primary" value="Register" disabled={invalidform} />
      </form>
    </>
  );
};
export default RegisterForm;
