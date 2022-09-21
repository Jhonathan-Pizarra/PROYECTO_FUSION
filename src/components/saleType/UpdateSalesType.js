import React, {useState} from "react";
import {SaleType} from "@/lib/salestype";
import {useFormik} from "formik";
import {mutate as mutateIndex} from "swr";
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
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ThemeProvider
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {MUItheme} from "@/styles/Themes";
import Swal from "sweetalert2";


const schema = yup.object().shape({
    description: yup.string().required("Por favor ingresa un nombre."),
    status: yup.string().required("Por favor selecciona un estado."),
    user_validate: yup.string().required("Por favor selecciona un usuario."),
});


const UpdateSaleType = ({id, description, status, user_validate}) => {

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
            title: '¡Modificado!'
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
            title: 'No se ha podido llevar a cabo'
        })

    }


    const onSubmit = async (data) => {
        console.log('data del form:', data);

        try {
            setProcessing(true);
            await SaleType.update(id, JSON.stringify(data));
            mutateIndex('/back-obo/salestype');//tipoventa
            mostrarEdicion();
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
            description: description,
            status: status,
            user_validate: user_validate,
        },
        validationSchema: schema,
        onSubmit: values => onSubmit(values)
    });


    return (
        <div>

            <IconButton aria-label="editar"  size="small" onClick={handleOpen} style={{ color: '#50535A' }}>
                <EditIcon />
            </IconButton>

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
                                    Editar Tipo de venta
                                </Grid>
                                <DialogContentText>
                                    Por favor llena los siguientes campos:
                                </DialogContentText>
                            </DialogTitle>

                            <DialogContent>
                                <Grid container spacing={1.7} justifyContent="center">

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
                                            defaultValue={description}
                                            onChange={formik.handleChange}
                                            values={formik.values.description}
                                            fullWidth
                                        />
                                        <DialogContentText className={classes.validaciones}>
                                            {formik.errors.description}
                                            {formik.touched.description}
                                        </DialogContentText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                            <Select
                                                disabled={processing}
                                                variant="outlined"
                                                sx={{ mt: 1}}
                                                size="small"
                                                //sx={{ mt: 1}}
                                                component="select"
                                                margin="dense"
                                                id="status"
                                                name="status"
                                                label="Estado"
                                                //multiple={true}
                                                defaultValue={status}
                                                onChange={formik.handleChange}
                                                values={formik.values.status}
                                                fullWidth
                                            >
                                                <MenuItem value={1}>Activo</MenuItem>
                                                <MenuItem value={0}>Inactivo</MenuItem>
                                            </Select>
                                            <DialogContentText className={classes.validaciones}>
                                                {formik.errors.status}
                                                {formik.touched.status}
                                            </DialogContentText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Validación Equifax</InputLabel>
                                        <Select
                                            disabled={processing}
                                            variant="outlined"
                                            sx={{ mt: 1}}
                                            size="small"
                                            //sx={{ mt: 1}}
                                            component="select"
                                            margin="dense"
                                            id="user_validate"
                                            name="user_validate"
                                            label="Estado"
                                            //multiple={true}
                                            defaultValue={user_validate}
                                            onChange={formik.handleChange}
                                            values={formik.values.user_validate}
                                            fullWidth
                                        >
                                            <MenuItem value={1}>Activo</MenuItem>
                                            <MenuItem value={0}>Inactivo</MenuItem>
                                        </Select>
                                        <DialogContentText className={classes.validaciones}>
                                            {formik.errors.user_validate}
                                            {formik.touched.user_validate}
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

export default UpdateSaleType;