import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterDiet, filterHealthScore, filterName , getDiets} from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import Nav from "./Nav";
import styles from "./styles/Home.module.css";

export default function Home(){
    const dispatch = useDispatch()
    const allRecipes = useSelector((state)=> state.recipes)
    useEffect(()=>{
        dispatch(getRecipes())
    },[dispatch])
    const allDiets = useSelector((state) => state.diets)
    useEffect(()=>{
        dispatch(getDiets())
    },[dispatch])

    const [orden, setOrden] = useState("");
    const[ordenHS, setOrdenHS] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);

    const lastRecipes = currentPage * recipesPerPage
    const firstRecipes = lastRecipes - recipesPerPage
    const currentRecipes = allRecipes.slice(firstRecipes,lastRecipes);

    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes())
        setCurrentPage(1);
    }

    function handleFilterDiet(e){
        e.preventDefault();
        dispatch(filterDiet(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterName(e){
        e.preventDefault();
        dispatch(filterName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterHealthScore(e){
        e.preventDefault();
        dispatch(filterHealthScore(e.target.value));
        setCurrentPage(1);
        setOrdenHS(`Ordernado ${e.target.value}`);
    }

    return (
        <div className={styles.contenedor}>
            <Nav />
            <div className={styles.divUl}>
                <div className={styles.contenedorUl}>
                    <ul className={styles.lista}>
                        <li className={styles.li}>
                            <select onChange={e=> handleFilterName(e)}>
                                <option value="selected" hidden className={styles.elementNB}>Organizar por nombre</option>
                                <option value={"ascendente"}>A - Z</option>
                                <option value={"descendente"}>Z - A</option>
                            </select>
                        </li>
                        <li className={styles.li}>
                            <select onChange={e => handleFilterHealthScore(e)}>
                            <option value="selected" hidden>Organizar por peso</option>
                            <option value={"mostHS"}>Mayor calorias</option>
                            <option value={"lessHS"}>Menor calorias</option>
                            </select>
                        </li>
                        <li className={styles.li}>
                            <select onChange={e =>{handleFilterDiet(e)}}>
                                <option value="all">Tipos de dietas</option>
                                {allDiets?.sort((a, b)=>{
                                    if(a.name > b.name) return -1;
                                    if(b.name > a.name) return 1;
                                    return 0;
                                }).map(d=>{
                                    return (
                                        <option key={d.id} value={d.dietName} >{d.dietName}</option>
                                    )
                                })}
                            </select>
                        </li>
                    </ul>
                <div className={styles.refresh}>
                    <button onClick={e=> handleClick(e)}>Refresh</button>
                </div>
                </div>
                {allRecipes.length<1? <div><img src="https://acegif.com/wp-content/uploads/loading-5.gif" alt="img not found"/></div> : currentRecipes?.map(e=>{
                    return(
                        <Card
                        image={e.img? e.img : e.image}
                        key={e.id}
                        id={e.id}
                        name={e.name}
                        dietType={e.dietName? e.dietName : e.diets?.map(e=>{return(<div>{e.dietName}</div>)})}
                        />
                        );
                    })}
                    <Paginado 
                    currentPage={currentPage}
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginado= {paginado}
                    />
            </div>
        </div>
        
    )
}
