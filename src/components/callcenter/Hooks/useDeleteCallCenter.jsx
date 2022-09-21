import {useState} from 'react'
import Swal from "sweetalert2";
import  {mutate as mutateIndex} from "swr";
import {Callcenter} from "@/lib/callcenters";

const useDeleteCallCenter = ({id}) => {
    const [modal, setModal] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        setModal(false);
        setProcessing(false);
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
            title: 'Callcenter eliminado.'
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
            title: 'No se ha podido borrar el callcenter'
        })

    }

    const handleDelete = async () => {
        try {
            setProcessing(true);
            await Callcenter.delete(id);
            mutateIndex('/back-obo/callcenters');
            mostrarExito();
            handleClose();
        } catch (error) {
            setProcessing(true);
            mostrarError();
            console.log(error);
            handleClose();
        }
    };
  return {
    modal,
    processing,
    handleClose,
    handleDelete,
    handleOpen,

  }
}

export default useDeleteCallCenter