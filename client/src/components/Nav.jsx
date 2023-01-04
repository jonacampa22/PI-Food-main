import React from "react";
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar";
import styles from "./styles/Nav.module.css";

export default function Nav(){
    return (
        <div className={styles.nav}>
            <Link to={"/home"}>
                <button className={styles.home}>Home</button>
            </Link>
            <SearchBar />
            <Link to={"/form"}>
                <button className={styles.form}>Crear Recipiente</button>
            </Link>
        </div>
    )
}
