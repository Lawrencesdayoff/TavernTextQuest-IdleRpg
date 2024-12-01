import LogItem from "./LogItem"


const QuestEventLog = (props) => {
    const { questid, questterrain, race,
        pronouns, strength,
        constitution, agility, perception,
        intellect, magick, wisdom, encounterlog } = props

    
        return (
        <>
            <div className="scrollable-div">

                {encounterlog.map((item, index) => (<LogItem key={index} logtext={item} />))}

            </div>

        </>
    )
}

export default QuestEventLog;