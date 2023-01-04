import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { postRecipes, getDiets } from "../actions";
import {Link, useHistory} from "react-router-dom";
import styles from "./styles/RecipeCreate.module.css";

export default function RecipeCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const allDiets = useSelector((state)=> state.diets)
    console.log(allDiets)

    const [input, setInput] = useState({
        name:"",
        infoRecipe:"",
        healthScore:"",
        stepByStep:"",
        img:"",
        diet:[]
    })
    console.log(input)
    const [error, setError] = useState({})

    function validate(input){
        let error = {}
        if(!/^[a-zA-Z\s]*$/.test(input.name)){
            error.name ="Solo puedes ingresar letras y espacios"
        }
        else if(!input.name){
            error.name ="Inserte un nombre"
        }
        else if(input.name > 20 ){
            error.name = "Inserte un nombre menor a 20 caracteres";
        }
        else if(input.healthScore < 0 || input.healthScore > 100 || !input.healthScore || (!/^[0-9]+$/.test(input.healthScore))){
            error.healthScore= "Declarar un valor entre 0 y 100"
        }
        else if(!input.img.length > 0 || !input.img.match(/^(ftp|http|https):\/\/[^"]+$/)){
            error.img="Insterte una direccion de imagen"
        }
        else if(!input.infoRecipe){
            error.infoRecipe ="Se requiere informacion de la receta"
        }
        else if(!input.stepByStep){
            error.stepByStep="se requiere los pasos de la receta"
        }
        return error
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        setError(validate({
            ...input,
            [e.target.name]:e.target.value
        }));
    }

    function handleSelect(e){
        console.log(e)
        var encontrado=false;
        input.diet.map(element => {
            if(element === e.target.value) {
                encontrado = true;
            }
        })
        if(!encontrado){
            setInput({
                ...input,
                diet: [...input.diet, e.target.value]
            });
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        if(error.name||error.infoRecipe||error.healthScore||error.stepByStep||error.img||input.name === ""
        ||input.infoRecipe === ""||input.healthScore === ""||input.stepByStep === ""||input.img === ""||input.diet.length === 0){
            alert("Error: Receta no creada, verifique los campos requeridos")
        }
        else{
            dispatch(postRecipes(input))
            alert("Recipiente creado")
            setInput({
                    name:"",
                infoRecipe:"",
                healthScore:"",
                    stepByStep:"",
                img:"",
                diet:[]
            })
            history.push("/home")
        }
    }

    function handleDelete(e){
            setInput({
                ...input,
                diet: input.diet.filter(d=>d !== e)
            })
    }

    useEffect(()=>{
        dispatch(getDiets())
    }, [dispatch])

    return(
        <div className={styles.divCreate}>
            <Link to={"/home"}><button className={styles.btnHome}>Volver</button></Link>
            <h1 className={styles.title}>Crea tu recipiente</h1>
            <form onSubmit={e=>handleSubmit(e)}>
                <div className={styles.divInput}>
                    <input type="text" value={input.name} name="name" onChange={handleChange} className={styles.int} placeholder={"Nombre:"}/>
                    {error.name && (
                        <p>{error.name}</p>
                    )}
                </div>
                <div className={styles.divInput}>
                    <input type="number" value={input.healthScore} name="healthScore" onChange={handleChange} className={styles.int} placeholder={"Nivel de saludable:"}/>
                    {error.healthScore && (
                        <p>{error.healthScore}</p>
                    )}
                </div>
                <div className={styles.divInput}>
                    <input type="text" value={input.img} name="img" onChange={handleChange} className={styles.int} placeholder={"Imagen:"}/>
                    {error.img && (
                        <p>{error.img}</p>
                    )}
                </div>
                <div className={styles.divInput}>
                    <input type="text" value={input.infoRecipe} name="infoRecipe" onChange={handleChange} className={styles.int} placeholder={"Informacion del recipiente:"}/>
                    {error.infoRecipe && (
                        <p>{error.infoRecipe}</p>
                    )}
                </div>
                <div className={styles.divInput}>
                    <input type="text" value={input.stepByStep} name="stepByStep" onChange={handleChange} className={styles.int} placeholder={"Paso a paso:"}/>
                    {error.stepByStep && (
                        <p>{error.stepByStep}</p>
                    )}
                </div>
                <div>
                    <label>Tipo de dietas:</label>
                </div>
                <select className={styles.contentSelect} onChange={e=>handleSelect(e)}>
                <option value="selected" hidden>Tipos de dietas</option>
                    {allDiets?.map(d=>{
                        return(
                            <option value={d.dietName} key={d.id}>{d.dietName}</option>
                        )
                    })}
                </select>
                    <button type="submit" className={styles.submit}>Crear recipiente</button>
            </form>
                <div className={styles.boxContentDiets }>
                    {input.diet?.map(d=>{
                        return(
                            <div className={styles.cube}>
                                <div className={styles.cubeContent}>
                                    <p className={styles.pselect}><strong>{d}</strong></p>
                                    <button className={styles.bselect} onClick={()=>handleDelete(d)}>X</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
        </div>
    )
}