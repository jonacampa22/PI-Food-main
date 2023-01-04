import React from "react";
import {Link} from "react-router-dom";
import styles from "./styles/LandingPage.module.css"

export default function LandingPage(){
    return (
        <div className={styles.background}>
            <div className={styles.titleContainer}>
                <div>
                    <h1 className={styles.title}>Food App</h1>
                </div>
            </div>
            <div className={styles.btnContainer}>
                <Link to={"/home"}>
                    <button className={styles.btn}>Inicio</button>
                </Link>
            </div>
        </div>
    )
}