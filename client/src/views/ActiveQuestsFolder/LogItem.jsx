const LogItem = (props) => {
    const {logtext} = props
    return(
        <div className = "log-item-activequest">
        <tr>
            <td>
            {logtext}
            </td>
        </tr>
        </div>
    )
}

export default LogItem;