import React,{useState,useEffect} from 'react'
import useSWR from "swr";
import {fetcher} from "../../../utils";

const useReadCallCenter = () => {
    const {data: callcenters, error} = useSWR(`/back-obo/callcenters`, fetcher,{
        revalidateOnFocus:false
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterCallcenter, setFilterCallcenter] = useState('');
    
    useEffect(()=>{
        setFilterCallcenter(callcenters)
    },[callcenters])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filtrado = (event)=>{
        if (event.target.value.length < 2 ) {
            setFilterCallcenter(callcenters)
            return
        }
        const filtrado = callcenters?.filter((callcenter=>{
            const states = {
                0:'inactivo',
                1:'activo'
            }
            const state = states[callcenter.status]
            const searchState = state == event.target.value || state == event.target.value && true

            return callcenter.name.includes(event.target.value)||
            searchState ||
            callcenter.contact_person.includes(event.target.value)||
            callcenter.contact_cellphone.includes(event.target.value)||
            callcenter.contact_email.includes(event.target.value)
        
        }))
        setFilterCallcenter(filtrado)
        
    }
  return {
    callcenters,
    error,
    page,
    rowsPerPage,
    filterCallcenter,
    handleChangePage,
    handleChangeRowsPerPage,
    filtrado
  }
}

export default useReadCallCenter