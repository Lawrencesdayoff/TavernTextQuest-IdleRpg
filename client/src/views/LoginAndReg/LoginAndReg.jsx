import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {useState} from "react"
import RegisterForm from "./RegisterForm.jsx";
import Tabs from "../Tabs.jsx";
import LoginForm from "./LoginForm.jsx";
const LoginAndReg = () =>
{
    const [activeTab, setActiveTab] = useState(0);
    const handleLoginRegTabs = (change) => {
        setActiveTab(change);
    }
    const tabData = [
        {label: "Login",
        content: <LoginForm /> },
        { label: "Registration",
        content: <RegisterForm /> }
    ];
    return(
        <>
            <Tabs tabs={tabData} content = {tabData.content} 
            onChangeTab = {handleLoginRegTabs} activeTab={activeTab}/>
        </>
    )
}

export default LoginAndReg;