import React, {useState} from "react";
import {useFormik} from "formik";
import {mutate as mutateIndex} from 'swr';
import * as yup from "yup";
import {Styles} from '@/styles/MantenedoresStyle';
import {MUItheme} from "@/styles/Themes";
import Swal from "sweetalert2";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Grid,
    TextField,
    ThemeProvider,
    Tooltip
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {Source} from "@/lib/sources";

const schema = yup.object().shape({
    name: yup.string().required("Por favor introduce un nombre."),
});


const CreateSource  = () => {

    const classes = Styles();
    //const {mutate} = useSWR(`/callcenters`, fetcher);
    const [modal, setModal] = useState(false);
    const [processing, setProcessing] = useState(false);


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
            await Source.create(JSON.stringify(data));

            mutateIndex('/back-obo/source'); //Callcenters es el endpoint del api, del back, el del psotman
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

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: schema,
        onSubmit: values => onSubmit(values)
    });



    return (
        <div>

            <Tooltip className={classes.fixed} title="Nuevo" aria-label="add">
                <Fab onClick={handleOpen} style={{ color: 'white' }}>
                    <AddIcon />
                </Fab>
            </Tooltip>

            <ThemeProvider theme={MUItheme}>
                <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'xs'} disableEnforceFocus >
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                        <DialogContent>
                            <DialogTitle id="form-dialog-title">
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    Nuevo Orígen
                                </Grid>

                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <DialogContentText>
                                        Por favor llena los siguientes campos:
                                    </DialogContentText>
                                </Grid>
                            </DialogTitle>

                            <DialogContent>
                                <Grid container spacing={1.5} justifyContent="center">
                                    <Grid item xs={12}>

                                        <TextField
                                            disabled={processing}
                                            variant="outlined"
                                            size="small"
                                            margin="dense"
                                            id="name"
                                            name="name"
                                            label="Nombre*"
                                            type="text"
                                            onChange={formik.handleChange}
                                            values={formik.values.name}
                                            fullWidth
                                        />
                                        <DialogContentText className={classes.validaciones}>
                                            {formik.touched.name && formik.errors.name}
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
                                            Crear
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

export default CreateSource;

