import { createContext, useState, useContext } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(sessionStorage.getItem("token") || "");
    const navigate = useNavigate();
    const loginAction = async (data) => {
        console.log(data)
      try {
        axios
        .post("http://localhost:9999/api/login", {
         user_email: data.user_email,
         user_password: data.user_password
        }) .then((res) => {
            console.log(res);
            console.log(res.data);
        if (res.data) {
          setUser(res.data);
          setToken(res.data._id);
          sessionStorage.setItem("user", 
            res.data.user_username
          )
          sessionStorage.setItem("token", res.data._id);
          navigate("/dashboard");
          return;
        }
        throw new Error(res.message);

    });

      } catch (err) {
        console.error(err);
      }
    };
  
    const logOut = () => {
      setUser(null);
      setToken("");
      sessionStorage.clear()
      navigate("/");
    };
  
    return (
      <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
        {children}
      </AuthContext.Provider>
    );
  
  };
  
  export default AuthProvider;
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };