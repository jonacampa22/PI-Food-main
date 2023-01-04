import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import {getRecipes} from "../actions";
import styles from "./styles/SearchBar.module.css";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getRecipes(name))
        setName("")
    }

    return(
        <form className={styles.searchbar}>
            <input type="text" placeholder="Buscar recipientes" value={name} onChange={e => handleInputChange(e)} />
            <button className={styles.btn} type="submit" onClick={e => handleSubmit(e)} >Buscar</button>
        </form>
    )
}