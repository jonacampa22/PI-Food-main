import React from "react";
import {Link, useParams} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, cleanDetail } from "../actions";
import styles from "./styles/RecipeDetail.module.css";

export default function RecipeDetail(props){
    // const {id} = useParams()
    // console.log(id);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getDetail(props.match.params.id));
        dispatch(cleanDetail([]))
    },[dispatch])

    const myRecipe = useSelector((state)=> state.detail)
    console.log(myRecipe, "recipe")
    return (
        <div className={styles.contenedor}>
            <div className={styles.contenedorNav}>
                <Link to={"/home"}>
                    <button className={styles.btn}>Volver</button>
                </Link>
                <Link to={"/form"}>
                    <button className={styles.btn}>Crear Recipiente</button>
                </Link>
            </div>
                {myRecipe.length > 0 ? 
                <div className={styles.contenedorCard}>
                    <div>
                        <h2 className={styles.title}>{myRecipe[0].name}({myRecipe[0].healthScore}/100)</h2>
                        <h5 className={styles.diet}>{!myRecipe[0].createInDb? myRecipe[0].dietName + " ": myRecipe[0].diets.map(d=> d.dietName + (" "))}</h5>
                    </div>
                    <div>
                        <img src={myRecipe[0].img} alt={`RECIPE:${myRecipe.id}`} className={styles.img}/>
                    </div>
                    <div className={styles.info}>
                        <h4>Informacion del recipiente</h4>
                        <div dangerouslySetInnerHTML={{
                            __html: myRecipe[0].infoRecipe
                        }}/>
                    </div>
                    <div className={styles.info}>
                        <h4>Paso a paso</h4>
                        <div>{myRecipe[0].stepByStep || "NOT FOUND"}</div>
                    </div>
                </div>: <div><img src="https://acegif.com/wp-content/uploads/loading-5.gif" alt="img not found"/></div>}
        </div>
    )
}