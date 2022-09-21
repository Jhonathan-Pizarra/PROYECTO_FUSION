import React, {useState} from "react";
import {mutate as mutateIndex} from "swr";
import * as yup from "yup";
import {useFormik} from "formik";
import {Styles} from '@/styles/MantenedoresStyle';
import {MUItheme} from "@/styles/Themes";
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
    TextField,
    ThemeProvider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import {Source} from "@/lib/sources";


const schema = yup.object().shape({
    name: yup.string().required("Por favor introduce un nombre."),
});


const UpdateSource = ({id, name}) => {

    const classes = Styles();
    const [modal, setModal] = useState(false);
    const [processing, setProcessing] = useState(false);


    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        setModal(false);
        setProcessing(true);
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
            await Source.update(id, JSON.stringify(data));
            mutateIndex('/back-obo/source');
            mostrarEdicion();
            handleClose();
        } catch (error) {
            setProcessing(true);
            handleClose();
            mostrarError();
            console.error("Error",error);
        }

    };

    const formik = useFormik({
        initialValues: {
            name: name,
        },
        validationSchema: schema,
        onSubmit: values => onSubmit(values)
    });

    return (
        <div>

            <IconButton aria-label="editar"  size="small" onClick={handleOpen} style={{ color: '#50535A' }} >
                <EditIcon />
            </IconButton>

            <ThemeProvider theme={MUItheme}>
                <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" disableEnforceFocus maxWidth={'xs'}>
                    <form onSubmit={formik.handleSubmit} autoComplete={false}>
                        <DialogContent>
                            <DialogTitle id="form-dialog-title">
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    Modificar Orígen
                                </Grid>
                                <DialogContentText>
                                    Por favor llena los siguientes campos:
                                </DialogContentText>
                            </DialogTitle>

                            <DialogContent>

                                <Grid container spacing={1.5} justifyContent="center">

                                    <Grid item xs={12}>


                                        <TextField
                                            disabled={processing}
                                            size="small"
                                            variant="outlined"
                                            margin="dense"
                                            id="name"
                                            name="name"
                                            label="Nombre*"
                                            type="text"
                                            defaultValue={name}
                                            onChange={formik.handleChange}
                                            values={formik.values.name}
                                            fullWidth
                                        />
                                        <DialogContentText className={classes.validaciones}>
                                            {formik.errors.name}
                                            {formik.touched.name}
                                        </DialogContentText>
                                    </Grid>

                                </Grid>
                            </DialogContent>

                            <DialogActions>
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
                                            type="submit"
                                            size="medium"
                                        >
                                            Editar
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
                        </DialogContent>

                    </form>
                </Dialog>
            </ThemeProvider>

        </div>
    );
};

export default UpdateSource;