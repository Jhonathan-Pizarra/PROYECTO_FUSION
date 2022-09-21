import React,{useState,useEffect} from 'react'
import useSWR from "swr";
import {fetcher} from "../../../utils";

const useCreateCampaign = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const {data: campains, error} = useSWR(`/back-obo/campaigns?limit=${rowsPerPage}&page=${page + 1}`, fetcher,{
      revalidateOnFocus:false
  });
    const [filterCampaigns, setFilterCampaigns] = useState(null);

    useEffect(()=>{
      setFilterCampaigns(campains?.data?.data)
    },[campains?.data])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        //setPage(1);
    };
    const filterDataCampaign = (event)=>{
      const valueInput = event.target.value.toLowerCase()

      if (valueInput.length < 2 ) {
        setFilterCampaigns(campains?.data?.data)
          return
      }
      const filtrado = campains?.data?.data?.filter((campaign=>{
          const states = {
              0:'inactivo',
              1:'activo'
          }
          const state = states[campaign.status]
          const searchState = state == valueInput

          return campaign.name.toLowerCase().includes(valueInput)||
          searchState ||
          campaign.Source.name.toLowerCase().includes(valueInput)||
          campaign.Channel.name.toLowerCase().includes(valueInput)
      
      }))
      setFilterCampaigns(filtrado)
      
  }
  return {
    handleChangePage,
    handleChangeRowsPerPage,
    filterDataCampaign,
    campains,
    page,
    error,
    filterCampaigns,
    rowsPerPage
  } 
}

export default useCreateCampaign