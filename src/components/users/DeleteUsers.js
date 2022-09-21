import React, {useState} from "react";
import {Styles} from '@/styles/MantenedoresStyle';
import {
    Button,
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
import {mutate as mutateIndex} from "swr";
import Swal from "sweetalert2";

const DeleteUser = ({id}) => {

    const classes = Styles();
    const [modal, setModal] = useState(false);

    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
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
            title: '¡Registro eliminado!'
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
            title: 'No se ha podido borrar el registro'
        })

    }


    const handleDelete = async () => {
        try {
            await User.delete(id);
            mutateIndex('/back-obo/users');
            mostrarExito();
            handleClose();
        } catch (error) {
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
                        {"¿Deseas eliminar este usuario?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            No se eliminará este Usuaeio si se encuentra vinculado a un canal
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
                                    // disabled={processing}
                                    //onClick={handleValidate}
                                    //className={styles['btn-primary-m']}
                                    className={classes.create}
                                    variant='contained'
                                    onClick={handleDelete}
                                    size="medium"
                                >
                                    Crear
                                </Button>
                                {/*{processing && <CircularProgress size={24} className={classes.buttonProgress} />}*/}
                            </div>

                            <div className={classes.wrapper}>
                                <Button
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

export default DeleteUser;