const ButtonReviveCharacter = (props) => {
    const {characterid} = props
    const reviveCharacter = (characterid) => {
        
    } 
    return(
        <>
        <button>
        <button class= "nes-btn is-primary" onClick={(e)=> reviveCharacter(e)}>Abandon Quest</button>

        </button>
        </>
    )
}