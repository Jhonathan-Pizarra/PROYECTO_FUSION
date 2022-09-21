import Swal from "sweetalert2";
import Image from '../../../public/fondo-login.jpg';

const SweetAlert = () => {


    const mostrarAkerta2 = () =>{
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
            title: 'Signed in successfully'
        })

    }

    const mostrarAlerta = () =>{
        Swal.fire("Hola");
    }

    const exitoAlerta = () =>{
        Swal.fire("Hola", 'COmo estas?', "success");
    }

    const exitoAlerta2 = () =>{
        Swal.fire({
            icon: 'info',
            title: 'Info',
            text: 'Hola Mundo'
        })
    }

    const exitoAlerta3 = () =>{
        Swal.fire({
            icon: 'error',
            title: 'Info',
            text: 'Hola Mundo',
            timer: '5000',
            position: "bottom-left"

        })
    }

    const exitoAlerta4 = ()=>{
        Swal.fire({
            title: 'Custom width, padding, color, background.',
            width: 600,
            padding: '3em',
            color: '#716add',
            //background: `#fff url(${Image.src})`,
            backdrop: `
                rgba(0,0,123,0.4)
                url(${Image.src})
                left top
                no-repeat
              `
        })
    }

    const pregunta = ()=>{
        Swal.fire({
            title: "Are you sure about deleting this file?",
            type: "info",
            showCancelButton: true,
            confirmButtonText: "Delete It",
            confirmButtonColor: "#ff0055",
            cancelButtonColor: "#999999",
            reverseButtons: true,
            focusConfirm: false,
            focusCancel: true

            //background: `#fff url(${Image.src})`,

        })
    }

    return(
        <div>
            <button onClick={mostrarAlerta}>Alerta</button>
            <button onClick={exitoAlerta}>Exito</button>
            <button onClick={exitoAlerta2}>Info</button>
            <button onClick={exitoAlerta3}>Error</button>
            <button onClick={exitoAlerta4}>Gato</button>
            <button onClick={mostrarAkerta2}>Argentina</button>
            <button onClick={pregunta}>Icono Bonito</button>
        </div>
    );


}

export default SweetAlert;
