import React from 'react'
import {Styles} from '@/styles/MantenedoresStyle';
import {MUItheme} from "@/styles/Themes";
import {Callcenter} from "@/lib/callcenters";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    IconButton,
    ThemeProvider,
    CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {useFormik} from "formik";
import useUpdateCallCenter from '../Hooks/useUpdateCallCenter';
import Swal from "sweetalert2";
import {validationPhoneNumber} from "@/helpers/getPhoneValidation";
import * as yup from "yup";

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


const ComponentModalUpdate = ({id, name, status, contact_person, contact_email, contact_phone, contact_cellphone}) => {
    const {handleOpen,onSubmit,schema,modal,processing,handleClose} = useUpdateCallCenter({id})
    const classes = Styles();


    const formik = useFormik({
        initialValues: {
            name: name,
            status: status,
            contact_person: contact_person,
            contact_email: contact_email,
            contact_phone: contact_phone,
            contact_cellphone: contact_cellphone
        },
        validationSchema: schema,
        onSubmit: values => onSubmit(values)
    });
  return (
    <>
        <IconButton aria-label="editar"  size="small" onClick={handleOpen} style={{ color: '#50535A' }} >
                <EditIcon />
        </IconButton>

            <ThemeProvider theme={MUItheme}>
                <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" disableEnforceFocus maxWidth={'xs'}>
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                        <DialogContent>
                            <DialogTitle id="form-dialog-title">
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    Modificar Call Center
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

                                    <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                        <Select
                                            disabled={processing}
                                            variant="outlined"
                                            //variant="filled"
                                            //variant="standard"
                                            size="small"
                                            sx={{ mt: 1}}
                                            component="select"
                                            margin="dense"
                                            id="demo-simple-select-label"
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
                                    <TextField
                                        disabled={processing}
                                        size="small"
                                        variant="outlined"
                                        margin="dense"
                                        id="contact_person"
                                        name="contact_person"
                                        label="Contacto*"
                                        type="text"
                                        defaultValue={contact_person}
                                        onChange={formik.handleChange}
                                        values={formik.values.contact_person}
                                        fullWidth
                                    />
                                    <DialogContentText className={classes.validaciones}>
                                        {formik.errors.contact_person}
                                        {formik.touched.contact_person}
                                    </DialogContentText>
                                    </Grid>

                                    <Grid item xs={12}>
                                    <TextField
                                        disabled={processing}
                                        size="small"
                                        variant="outlined"
                                        margin="dense"
                                        id="contact_email"
                                        name="contact_email"
                                        label="Correo*"
                                        type="text"
                                        defaultValue={contact_email}
                                        onChange={formik.handleChange}
                                        values={formik.values.contact_email}
                                        fullWidth
                                    />
                                    <DialogContentText className={classes.validaciones}>
                                        {formik.errors.contact_email}
                                        {formik.touched.contact_email}
                                    </DialogContentText>
                                    </Grid>

                                    <Grid item xs={12}>
                                    <TextField
                                        disabled={processing}
                                        size="small"
                                        variant="outlined"
                                        margin="dense"
                                        id="contact_phone"
                                        name="contact_phone"
                                        label="Teléfono*"
                                        type="number"
                                        defaultValue={contact_phone}
                                        onChange={formik.handleChange}
                                        values={formik.values.contact_phone}
                                        fullWidth
                                    />
                                    <DialogContentText className={classes.validaciones}>
                                        {formik.errors.contact_phone}
                                        {formik.touched.contact_phone}
                                    </DialogContentText>
                                    </Grid>

                                    <Grid item xs={12}>
                                    <TextField
                                        disabled={processing}
                                        size="small"
                                        variant="outlined"
                                        margin="dense"
                                        id="contact_cellphone"
                                        name="contact_cellphone"
                                        label="Celular*"
                                        type="number"
                                        defaultValue={contact_cellphone}
                                        onChange={formik.handleChange}
                                        values={formik.values.contact_cellphone}
                                        fullWidth
                                    />
                                    <DialogContentText className={classes.validaciones}>
                                        {formik.errors.contact_cellphone}
                                        {formik.touched.contact_cellphone}
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
    </>
  )
}

export default ComponentModalUpdate