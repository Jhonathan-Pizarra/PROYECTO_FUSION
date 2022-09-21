import {useState} from 'react'
import * as yup from "yup";
import Swal from "sweetalert2";
import {validationPhoneNumber} from '@/helpers/validationPhoneNumber'
import {mutate as mutateIndex} from "swr";
import {Callcenter} from "@/lib/callcenters";

const phoneRegExp = validationPhoneNumber('phone');
const movileRegExp = validationPhoneNumber('cellphone');

const schema = yup.object().shape({
    name: yup.string().required("Por favor introduce un nombre."),
    status: yup.string().required("Por favor selecciona un estado."),
    contact_person: yup.string().required("Por favor introduce un contacto"),
    contact_email:  yup.string().email("Introduce un email válido").required("Por favor introduce un correo"),
    contact_phone: yup.string()
        .matches(phoneRegExp,  {message: "Ingrese un número válido.", excludeEmptyString: false})
        .required("Por favor introduce un número de teléfono")
        .min(10, "Se necesitan 10 números")
        .max(10, "Se necesitan 10 números"),
    // celular: Yup.string().matches(phoneRegExp, 'Por favor introduce un número válido.'),
    contact_cellphone: yup.string()
        .matches(movileRegExp, {message: "Ingrese un número válido.", excludeEmptyString: false})
        .required("Por favor introduce un número de celular")
        .min(10, "Se necesitan 10 números")
        .max(10, "Se necesitan 10 números"),
});

const useUpdateCallCenter = ({id}) => {
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
            title: 'Callcenter modificado.'
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
            title: 'No se ha podido editar el callcenter'
        })

    }

    const onSubmit = async (data) => {

        try {
            setProcessing(true);
            await Callcenter.update(id, JSON.stringify(data));
            mutateIndex('/back-obo/callcenters');
            mostrarEdicion();
            handleClose();
        } catch (error) {
            setProcessing(true);
            handleClose();
            mostrarError();
            console.error("Error",error);
        }

    };

    
  return {
    modal,
    processing,
    handleOpen,
    onSubmit,
    schema,
    handleClose,
    mostrarError,
    mostrarEdicion
  }
}

export default useUpdateCallCenter