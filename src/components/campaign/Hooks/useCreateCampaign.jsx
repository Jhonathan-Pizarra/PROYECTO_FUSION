import React,{useState} from 'react'
import * as yup from "yup";
import {useFormik} from "formik";
import {fetcher} from "../../../utils";
import Swal from "sweetalert2";
import useSWR, {mutate as mutateIndex} from 'swr';
import {Campaing} from "@/lib/campaings";
import {useRouter} from "next/router";

const schemaCampaign = yup.object().shape({
    name: yup.string().required("Por favor ingresa un nombre."),
    status: yup.string().required("Por favor selecciona un estado."),
    SourceId: yup.string().required("Por favor selecciona un origen."),
    ChannelId: yup.string().required("Por favor selecciona un canal."),
    flow_type: yup.string().required("Por favor selecciona un tipo."),
    /*field1: yup
        .string()
        .test(
            'AlreadyExists',
            'Nombre ya existe',
            function(item) {
                return (this.parent.field1 || this.parent.field2 || this.parent.field3 || this.parent.field4)
            }
        ),
        */

});
const useCreateCampaign = () => {
    const router = useRouter()
    const {data: channels} = useSWR(`/back-obo/channels`, fetcher);
    const {data: sources} = useSWR(`/back-obo/source`, fetcher);
    //const {mutate} = useSWR(`/back-obo/source`, fetcher);
    //const {data: campanas} = useSWR(`/campaigns?limit=${limit}&page=${page}`, fetcher);
    const [modal, setModal] = useState(false);
    const [processing, setProcessing] = useState(false);

    //const {page, rowsPerPage} = useCreateCampaign()
    ///back-obo/campaigns
    //    const {data: campains, error} = useSWR(`/back-obo/campaigns?limit=${rowsPerPage}&page=${page + 1}`



    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        formikCampaign.resetForm();
        setProcessing(false);
        setModal(false);
    };

    const mostrarExito = () =>{
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
            icon: 'success',
            title: 'Campaña creada con éxito'
        })

    }

    const mostrarError = (mensaje='No se ha podido crear la campaña') =>{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: mensaje
        })

    }

    const onSubmit = async (data) => {

        try {
            setProcessing(true);
            const campaingData = await Campaing.create(JSON.stringify(data));
            console.log('CampData', campaingData);
            if(!campaingData.data.status){
                mostrarError(campaingData.data.message);
                handleClose();
                router.reload();
                return
            }
            //mutate();
            //mutateIndex(`/back-obo/campaigns?limit=${rowsPerPage}&page=${page}`);
            mostrarExito();
            handleClose();
            /*} catch (error) {
                mostrarError();
                handleClose();
                console.error('Error:', error);
            }*/
        }catch (error) {
            setProcessing(true);
            mostrarError();
            handleClose();
            console.error('Error:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('Error1', error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('Error2', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error3", error.message);
            }
            console.log('Error4', error.config);

        }
    };
    const formikCampaign = useFormik({
        initialValues: {
            name: '',
            status: '',
            SourceId: '',
            ChannelId: '',
            flow_type: '',
        },
        validationSchema: schemaCampaign,
        onSubmit: values => onSubmit(values)
    });
  return {
    channels,
    sources,
    modal,
    processing,
    handleClose,
    handleOpen,
    formikCampaign
  }
}

export default useCreateCampaign