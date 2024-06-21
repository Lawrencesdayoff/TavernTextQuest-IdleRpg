
const CharacterContainer = ({Heading, Content, Actions}) => {

    return(
        <>
        <div className="scrollable-div-container">
        <div className = "scrollable-div-header">
            {Heading}
        </div>
        <div className="scrollable-div">
        <table>
            <th>Portrait</th>
            <th> Name </th>
            <tbody>
              {Content}
            </tbody>
          </table>
        </div>
        <div>
           {Actions}
        </div>
        </div>
        </>
    )
}

export default CharacterContainer;

