import LogItem from "./LogItem"


const QuestEventLog = (props) => {
    const { questid, questterrain, race,
        pronouns, strength,
        constitution, agility, perception,
        intellect, magick, wisdom, encounterlog = [] } = props


    return (

        <div className="quest-log">
                      {/* <svg>
                <filter id="wavy2">
                    <feTurbulence x="0" y="0" baseFrequency="0.01" numOctaves="5" seed="1" />
                    <feDisplacementMap in="SourceGraphic" scale="20" />
                </filter>
            </svg> */}
            <div id="parchment">
                <div class="parchment-filter"></div>
                <div class="parchment-text">
                    {encounterlog.length > 0 ? (
                        encounterlog.map((item, index) => <LogItem key={index} logtext={item} />)
                    ) : (
                        <p>Every adventure begins with a single step...</p>
                    )}
                </div>
            </div>
  
        </div>
    );
};
export default QuestEventLog;