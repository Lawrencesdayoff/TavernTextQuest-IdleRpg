const Header = ({message, username, crystals}) => {
return (
    <>
    <div><p>{message} {username}</p></div>
    <div> {crystals} </div>
    </>
)
}

export default Header;