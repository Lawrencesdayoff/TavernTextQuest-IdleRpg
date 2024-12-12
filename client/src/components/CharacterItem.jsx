import { useState } from "react";
import { Link } from "react-router-dom";

const CharacterItem = (props) => {
    const {_id , image, firstname, lastname, levelup} = props;

    return(
        <>
        <tr>
        <td><img src = {image} /></td>
        <td> {firstname} {lastname} </td>
        <td> <Link to={"/character/" + _id }> {levelup > 0 ? "Level Up!" : "Details" }</Link>  </td>
        <td> <Link to={"/character/" + _id + "/update"}> Update </Link></td>
        <td> <Link to={"/character/" + _id + "/delete"}> Delete </Link></td>
        </tr>
        </>
    )
}

export default CharacterItem;