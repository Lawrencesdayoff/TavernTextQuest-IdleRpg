import { createContext, useState, useContext } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(sessionStorage.getItem("user") || "");
    const [token, setToken] = useState(sessionStorage.getItem("token") || "");
    const navigate = useNavigate();
    
    const getCurrentTime= () => {
      const now = new Date();
      const isoString = now.toISOString(); // Generates 2024-05-19T09:02:32.496Z
      const timeZoneOffset = -now.getTimezoneOffset(); // Get the timezone offset in minutes
  
      // Format timezone offset as ±HH:mm
      const sign = timeZoneOffset >= 0 ? "+" : "-";
      const hours = String(Math.floor(Math.abs(timeZoneOffset) / 60)).padStart(2, "0");
      const minutes = String(Math.abs(timeZoneOffset) % 60).padStart(2, "0");
      
      return `${isoString.slice(0, -1)}${sign}${hours}:${minutes}`; 
    }

    const loginAction = async (data) => {
        console.log(data)
      try {
        await axios
        .post("http://localhost:9999/api/checkLogin", {
         user_email: data.user_email,
         user_password: data.user_password,
         Logged_in: true
        }).then((res) => {
            console.log(res);
            console.log(res.data);
        if (res.data) {
          setUser(res.data.user_username);
          setToken(res.data._id);
          sessionStorage.setItem("user", 
            res.data.user_username
          )
          sessionStorage.setItem("token", res.data._id);
          console.log("Redirecting to dashboard...");
          navigate("/dashboard");
          return;
        }
        throw new Error(res.message);

    });

      } catch (err) {
        console.error(err);
      }
    };
  
    const logOut = async () => {
      await axios.patch(`http://localhost:9999/api/logout/${token}`, { last_logout: getCurrentTime(), Logged_in: false}).then(() => {
        
      setUser(null);
      setToken("");
      sessionStorage.clear()
      navigate("/");
      })
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