const LogItem = (props) => {
    const {logtext} = props
    return(
        <tr>
            <td>
            {logtext}
            </td>

        </tr>
    )
}

export default LogItem;