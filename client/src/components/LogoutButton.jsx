import { useAuth } from "../views/LoginAndReg/AuthProvider";

const LogoutButton = () => {
    const auth = useAuth();

    const logOut = (e) => {
        e.preventDefault()
        auth.logOut()
    }
    return(
        <>
        <button class = "nes-btn is-primary" onClick={(e) =>logOut(e)} >Log Out</button>
        </>
    )
}

export default LogoutButton