const ActiveQuestItem = (props) => {
    const {questname, questlevel} = props
    return(
        <>
        <tr>
            <td>
                <Link to={"/activequests/" + _id }>{questname}</Link>
            </td>
            <td>
                {questlevel}
            </td>
        </tr>
        </>
    )
}