import React,{useState} from 'react'
import useSWR from "swr";
import Swal from "sweetalert2";
import {fetcher} from "../../../utils";
import {useFormik} from "formik";
import * as yup from "yup";
import {Campaing} from "@/lib/campaings";
import {useRouter} from 'next/router';

const schemaCampaign = yup.object().shape({
    name: yup.string().required("Por favor ingresa un nombre."),
    status: yup.string().required("Por favor selecciona un estado."),
    SourceId: yup.string().required("Por favor selecciona un origen."),
    ChannelId: yup.string().required("Por favor selecciona un canal."),
    flow_type: yup.string().required("Por favor selecciona un tipo."),
});

const useUpdateCampaign = ({id, name, status, SourceId, ChannelId, flow_type,}) => {
    const router = useRouter()
    const {data: channels} = useSWR(`/back-obo/channels`, fetcher);
    const {data: sources} = useSWR(`/back-obo/source`, fetcher);
    const [modal, setModal] = useState(false);
    const [processing, setProcessing] = useState(false);


    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        setModal(false);
        setProcessing(false);
    };

    const mostrarEdicion = () =>{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'info',
            title: 'Campaña modificada.'
        })

    }

    const mostrarError = () =>{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'No se ha podido editar la campaña.'
        })

    }


    const onSubmit = async (data) => {

        try {
            setProcessing(true);
            const response = await Campaing.update(id, JSON.stringify(data));
            if(response.data.success !== false){
                mostrarEdicion();
                
                router.reload()
                return
            }
            // console.log(response)
            mostrarError();

            handleClose();
        } catch (error) {
            setProcessing(true);
            handleClose();
            mostrarError();
            console.error('Error:', error);
        }
    };

    const formikCampaign = useFormik({
        initialValues: {
            name: name,
            status: status,
            SourceId: SourceId,
            ChannelId: ChannelId,
            flow_type: flow_type,
        },
        validationSchema: schemaCampaign,
        onSubmit: values => onSubmit(values)
    });

  return {
    formikCampaign,
    handleOpen,
    channels,
    sources,
    modal,
    processing,
    handleClose
  }
}

export default useUpdateCampaign