import ButtonToDashboard from "../../components/ButtonToDashboard";
import CharacterContainer from "../../components/CharacterContainer";
import CharacterItemAvailableQuest from "../../components/CharacterItemAvailableQuest"
import {useState, useEffect} from "react";

const AvailableCharacters = (props) => {
    const {characterlist, quest} = props
    return (
    <> 
        <CharacterContainer 
            Heading = "Available Characters" 
            Content = {characterlist.map((item, index) => (
                <CharacterItemAvailableQuest key = {index} _id = {item._id} image = {item.PC_image} 
                    firstname = {item.PC_firstname} lastname = {item.PC_lastname} questid = {quest} />))} 
                Actions = {<ButtonToDashboard />}
                />
    </>
)
}

export default AvailableCharacters;