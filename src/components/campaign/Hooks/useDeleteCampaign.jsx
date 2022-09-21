import {useState} from 'react'
import {Campaing} from "@/lib/campaings";
import Swal from "sweetalert2";
import {useRouter} from 'next/router';
import {mutate as mutateIndex} from "swr";

const useDeleteCampaign = ({id}) => {
    const [modal, setModal] = useState(false);
    const [processing, setProcessing] = useState(false);
    const router = useRouter()
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
            title: 'Campaña eliminada.'
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
            title: 'No se ha podido borrar la campaña'
        })

    }

    const handleDelete = async () => {
        try {
            setProcessing(true)
            const response = await Campaing.delete(id);

           if(response.data.deleted !== false){
                handleClose();
                mostrarExito();
                //mutateIndex('/back-obo/campaigns');
                router.reload()
                return
            }

            mostrarError();
            handleClose();
        } catch (error) {
            setProcessing(true)
            mostrarError();
            console.log(error);
            handleClose();
        }
    };
  return {
    modal,
    processing,
    handleOpen,
    handleClose,
    mostrarError,
    handleDelete
  }
}

export default useDeleteCampaign