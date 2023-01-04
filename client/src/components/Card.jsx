import React from "react";
import {Link} from "react-router-dom";
import styles from "./styles/Card.module.css";

export default function Card({name, image, id, dietType}){
    return(
        <Link to={`/recipes/${id}`}>
            <div className={styles.container}>
                <img src={image} alt={"RECIPE"} className={styles.imgCard} />
                <div className={styles.card}>
                    <h2 className={styles.title}>{name}</h2>
                    <div>
                        {dietType.map(e=>{
                            return <h4 key={e} className={styles.diets}>{e}</h4>
                        })}
                    </div>
                </div>
            </div>
        </Link>
    )
}