import {useState} from 'react'
import * as yup from "yup";
import {validationPhoneNumber} from "@/helpers/validationPhoneNumber";
import Swal from "sweetalert2";
import {Callcenter} from "@/lib/callcenters";
import {mutate as mutateIndex} from 'swr';
import {useFormik} from "formik";


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
    //celular: Yup.string().matches(phoneRegExp, 'Por favor introduce un número válido.'),
    contact_cellphone: yup.string()
        .matches(movileRegExp, {message: "Ingrese un número válido.", excludeEmptyString: false})
        .required("Por favor introduce un número de celular")
        .min(10, "Se necesitan 10 números")
        .max(10, "Se necesitan 10 números"),
});

const useCreateCallCenter = () => {
    const [modal, setModal] = useState(false);
    const [processing, setProcessing] = useState(false);
    const formik = useFormik({
        initialValues: {
            name: '',
            status: '',
            contact_person: '',
            contact_email: '',
            contact_phone: '',
            contact_cellphone: ''
        },
        validationSchema: schema,
        onSubmit: values => onSubmit(values)
    });

    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        formik.resetForm();
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
            title: 'Callcenter creado con éxito'
        })

    }

    const mostrarError = (mensaje='No se ha podido crear el callcenter') =>{
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
            title: mensaje
        })

    }

    const onSubmit = async (data) => {
        try {
            //await service.create(data);
            setProcessing(true);
            const callcenterData = await Callcenter.create(JSON.stringify(data));
            //mutate(Routes.CALLCENTERS);
            //mutate();
            if(!callcenterData.data.status){
                mostrarError(callcenterData.data.message);
                handleClose();
                return
            }
            mutateIndex('/back-obo/callcenters'); //Callcenters es el endpoint del api, del back, el del psotman
            mostrarExito();
            //mutateIndex(Routes.CALLCENTERS);
            handleClose();
        } catch (error) {
            //setCreateError(true);
            setProcessing(true);
            mostrarError();
            handleClose();
            //setCreateSuccess(false);
            console.error('Error:', error);
        }
    };
  return {
    handleClose,
    handleOpen,
    onSubmit,
    modal,
    processing,
    schema,
    formik
  }
}

export default useCreateCallCenter