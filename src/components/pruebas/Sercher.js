/*
//import {useEffect} from 'react';
//import {useState} from 'react';

const Searcher = ({results}) => {


    return(
        <div>
            <p>
                {results?.map((value)=>{
                return(
                    <div key={value.id}>
                        <p>{value.nombre}</p>
                    </div>
                );
            })}
            </p>
        </div>
    );
}

export default Searcher;
*/
//import AppBar from "../../components/pruebas/AppBar";
import {useEffect, useState} from "react";
/*
const data = [
    { id: 1, nombre: 'Test1', estado: 'Activo', persona: 'Pers1', correo: 'tes1@mail.com', telefono: '2588874', celular: '0999999999' },
    { id: 2, nombre: 'Test2', estado: 'Activo', persona: 'Pers1', correo: 'tes1@mail.com', telefono: '2588874', celular: '0999999999' },
    { id: 3, nombre: 'Test3', estado: 'Activo', persona: 'Pers1', correo: 'tes1@mail.com', telefono: '2588874', celular: '0999999999' },
    { id: 4, nombre: 'Test4', estado: 'Activo', persona: 'Pers1', correo: 'tes1@mail.com', telefono: '2588874', celular: '0999999999' },
    { id: 5, nombre: 'Test5', estado: 'Activo', persona: 'Pers1', correo: 'tes1@mail.com', telefono: '2588874', celular: '0999999999' },
    { id: 6, nombre: 'Tomate', estado: 'Activo', persona: 'Pers1', correo: 'tes1@mail.com', telefono: '2588874', celular: '0999999999' },
];
*/
const Searcher = () =>{

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    useEffect(()=> {
        const getUsers = async () => {
            /*
            fetch("https://jsonplaceholder.typicode.com/users")
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setData(data);
                })
             */

            try{
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await response.json();
                setData(data);
            }catch (err) {
                console.error(err);
            }
        };
        getUsers().catch(null);

    },[]);

    const handleSearch = (search) =>{
        if(data?.length){
            const searchMinus = search.toLowerCase();
            const filterData = data.filter((value)=>{
                return(
                    value.username.toLowerCase().includes(searchMinus) ||
                    value.email.toLowerCase().includes(searchMinus)
                )
            });

            setResults(filterData);
        }
    };

    //const handleClean
    const handleClean = () =>{
        setSearch("");
    }


    return(
        <>
            {/*<p>Hola Mundo!</p>*/}
            {/*<AppBar/>*/}
            <div>
                <h1>Buscador personal</h1>
                <label>
                    <input
                        value={search}
                        onChange={({target: {value}}) => setSearch(value)}
                    />
                    {/*<button onClick={() => onSearch(search)}>Buscar</button>*/}
                    <button onClick={() => handleSearch(search)}>Buscar</button>
                    <button onClick={handleClean}>Cerrar</button>
                </label>
                <p>
                    {results?.map((value)=>{
                        return(
                            <p key={value.id}>
                                {value.username}
                            </p>
                        );
                    })}
                </p>
            </div>

            {/*<Sercher results={results}/>*/}

        </>

    );
}

export default Searcher;