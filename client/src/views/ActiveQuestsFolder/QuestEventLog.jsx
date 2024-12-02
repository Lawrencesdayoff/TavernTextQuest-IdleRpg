import LogItem from "./LogItem"


const QuestEventLog = (props) => {
    const { questid, questterrain, race,
        pronouns, strength,
        constitution, agility, perception,
        intellect, magick, wisdom, encounterlog = [] } = props


    return (
        <div className="scrollable-div">
            {encounterlog.length > 0 ? (
                encounterlog.map((item, index) => <LogItem key={index} logtext={item} />)
            ) : (
                <p>Every adventure begins with a single step...</p> // Use <p> for non-table content
            )}
        </div>
    );
};
export default QuestEventLog;