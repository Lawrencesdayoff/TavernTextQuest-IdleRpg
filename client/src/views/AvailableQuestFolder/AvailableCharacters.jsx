import CharacterContainer from "../../components/CharacterContainer";
import CharacterItem from "../../components/CharacterItem";
import {useState, useEffect} from "react";

const AvailableCharacters = (props) => {
    const {characterlist} = props

    return (
    <> 
        <CharacterContainer 
            Heading = "Available Characters" 
            Content = {characterlist.map((item, index) => (
                <CharacterItem key = {index} _id = {item._id} image = {item.PC_image} 
                    firstname = {item.PC_firstname} lastname = {item.PC_lastname} />))} 
                Actions = "placeholder"
                />
    </>
)
}

export default AvailableCharacters;