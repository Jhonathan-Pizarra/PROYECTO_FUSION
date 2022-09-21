import React, {useState} from "react";
import {SaleType} from "@/lib/salestype";
import {mutate as mutateIndex} from "swr";
import {Styles} from '@/styles/MantenedoresStyle';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    ThemeProvider
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {MUItheme} from "@/styles/Themes";
import Swal from "sweetalert2";

const DeleteSaleType = ({id}) => {

    const classes = Styles();
    //const {mutate} = useSWR(`/tipoventa`, fetcher);
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
            title: '¡Eliminado con éxito!'
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
            title: 'No se ha podido eliminar el registro.'
        })

    }

    const handleDelete = async () => {
        try {
            setProcessing(true);
            await SaleType.delete(id);
            mutateIndex('/back-obo/salestype');
            mostrarExito();
            handleClose();
        } catch (error) {
            setProcessing(true);
            mostrarError();
            console.log(error);
            handleClose();
        }
    };


    return (
        <div>

            <IconButton aria-label="eliminar"  size="small" onClick={handleOpen} style={{ color: '#50535A' }}>
                <DeleteIcon />
            </IconButton>

            <ThemeProvider theme={MUItheme}>
                <Dialog
                    open={modal}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"¿Deseas eliminar este tipo de venta?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            No se eliminará esta Venta si se encuentra vinculado a un usuario
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ mb: 2 }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <div className={classes.wrapper}>
                                <Button
                                    disabled={processing}
                                    //onClick={handleValidate}
                                    //className={styles['btn-primary-m']}
                                    className={classes.create}
                                    variant='contained'
                                    onClick={handleDelete}
                                    size="medium"
                                >
                                    Eliminar
                                </Button>
                                {processing && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>

                            <div className={classes.wrapper}>
                                <Button
                                    disabled={processing}
                                    className={classes.close}
                                    onClick={handleClose}
                                    //fullWidth
                                    size="medium"
                                    variant="outlined"
                                >
                                    Cerrar
                                </Button>
                            </div>
                        </Grid>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>

        </div>
    );

};

export default DeleteSaleType;