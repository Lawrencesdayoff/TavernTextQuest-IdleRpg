import LogItem from "./LogItem"


const QuestEventLog = (props) => {
    const {questid, questterrain, race, 
        pronouns, strength, 
       constitution, agility, perception, 
       intellect, magick, wisdom, eventlog} = props
    return(
        <>
            <div className = "scrollable-div">

                {eventlog.map((item, index) => ( <LogItem key = {index} logtext = {item} />))}

                </div>

        </>
    )
}

export default QuestEventLog;