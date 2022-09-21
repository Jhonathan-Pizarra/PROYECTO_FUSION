import React, {useState} from "react";
import {SaleType} from "@/lib/salestype";
import {useFormik} from "formik";
import {mutate as mutateIndex} from 'swr';
import * as yup from "yup";
import {Styles} from "@/styles/MantenedoresStyle";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ThemeProvider,
    Tooltip
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {MUItheme} from "@/styles/Themes";
import Swal from "sweetalert2";


const schema = yup.object().shape({
    description: yup.string().required("Por favor introduce una descripción."),
    status: yup.string().required("Por favor selecciona un estado."),
    user_validate: yup.string().required("Por favor selecciona una opción."),

});

const CreateSaleType  = () => {

    const classes = Styles();
    //const {mutate} = useSWR(`/tipoventa`, fetcher);
    const [modal, setModal] = useState(false);
    const [processing, setProcessing] = useState(false);


    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        formik.resetForm();
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
            title: 'Tipo de venta creada con éxito'
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
            setProcessing(true);
            await SaleType.create(JSON.stringify(data));
            mutateIndex(`/back-obo/salestype`);
            mostrarExito();
            handleClose();
        } catch (error) {
            setProcessing(true);
            mostrarError();
            handleClose();
            console.error('Error:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            description: '',
            status: '',
            user_validate: '',
        },
        validationSchema: schema,
        onSubmit: values => onSubmit(values)
    });


    return (
        <div>
            <Tooltip title="Nuevo" aria-label="add" className={classes.fixed}>
                <Fab onClick={handleOpen} >
                    <AddIcon/>
                </Fab>
            </Tooltip>

            <ThemeProvider theme={MUItheme}>
                <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" disableEnforceFocus maxWidth={'xs'}>
                <form onSubmit={formik.handleSubmit} >
                    <DialogContent>
                    <DialogTitle id="form-dialog-title">
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            Nuevo Tipo de Venta
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
                                        variant="outlined"
                                        size="small"
                                        margin="dense"
                                        id="description"
                                        name="description"
                                        label="Nombre*"
                                        type="text"
                                        onChange={formik.handleChange}
                                        values={formik.values.description}
                                        fullWidth
                                    />
                                    <DialogContentText className={classes.validaciones}>
                                        {formik.touched.description && formik.errors.description}
                                    </DialogContentText>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel  id="demo-simple-select-label">Estado</InputLabel>
                                        <Select
                                            disabled={processing}
                                            //autoFocus={true}
                                            variant="outlined"
                                            sx={{ mt: 1}}
                                            size="small"
                                            margin="dense"
                                            labelId="status"
                                            component="select"
                                            id="status"
                                            name="status"
                                            //defaultValue={"Seleccionar"}
                                            onChange={formik.handleChange}
                                            values={formik.values.status}
                                            //value={age}
                                            label="Estado"
                                            fullWidth
                                        >
                                            <MenuItem value={1}>Activo</MenuItem>
                                            <MenuItem value={0}>Inactivo</MenuItem>
                                        </Select>
                                        <DialogContentText className={classes.validaciones}>
                                            {formik.touched.status && formik.errors.status}
                                        </DialogContentText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel  id="demo-simple-select-label">Validación Equifax</InputLabel>
                                        <Select
                                            disabled={processing}
                                            //autoFocus={true}
                                            variant="outlined"
                                            sx={{ mt: 1}}
                                            size="small"
                                            margin="dense"
                                            labelId="user_validate"
                                            component="select"
                                            id="user_validate"
                                            name="user_validate"
                                            //defaultValue={"Seleccionar"}
                                            onChange={formik.handleChange}
                                            values={formik.values.user_validate}
                                            //value={age}
                                                label="Validación Equifax"
                                            fullWidth
                                        >
                                            <MenuItem value={1}>Activo</MenuItem>
                                            <MenuItem value={0}>Inactivo</MenuItem>
                                        </Select>
                                        <DialogContentText className={classes.validaciones}>
                                            {formik.touched.user_validate && formik.errors.user_validate}
                                        </DialogContentText>
                                    </FormControl>
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

export default CreateSaleType;