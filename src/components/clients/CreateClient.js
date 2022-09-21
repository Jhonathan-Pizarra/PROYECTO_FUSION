import React, {useState} from "react";
import {mutate as mutateIndex} from "swr";
import {useFormik} from "formik";
import {Styles} from "@/styles/MantenedoresStyle";
import {Client} from "@/lib/clientes";
import * as yup from "yup";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Grid,
    TextField,
    Tooltip
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


const schema = yup.object().shape({
    //nom_campania: yup.string().required("Por favor ingresa un nombre."),
    //estado: yup.string().required("Por favor selecciona un estado.")
});

const CreateClient  = () => {

    const classes = Styles();
    //const {modal, handleOpen, handleClose} = useModal();
    const [modal, setModal] = useState(false);

    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        setModal(false);
    };


    const onSubmit = async (data) => {

        try {
            await Client.create(JSON.stringify(data));
            mutateIndex('/clientes');
            handleClose();
        } catch (error) {
            handleClose();
            console.error('Error:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            identification: '',
            main_cellphone: '',
            email: '',
        },
        validationSchema: schema,
        onSubmit: values => onSubmit(values)
    });


    return (
        <div>
            <Tooltip className={classes.fixed} title="Nuevo" aria-label="add">
                <Fab onClick={handleOpen}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" disableEnforceFocus>
                <form onSubmit={formik.handleSubmit} >

                    <DialogTitle id="form-dialog-title">Cliente</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <TextField
                            variant="outlined"
                            margin="dense"
                            id="name"
                            name="name"
                            label="Nombre"
                            type="text"
                            onChange={formik.handleChange}
                            values={formik.values.name}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {formik.errors.name}
                            {formik.touched.name}
                        </DialogContentText>

                        <TextField
                            variant="outlined"
                            margin="dense"
                            id="lastname"
                            name="lastname"
                            label="Nombre"
                            type="text"
                            onChange={formik.handleChange}
                            values={formik.values.lastname}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {formik.errors.lastname}
                            {formik.touched.lastname}
                        </DialogContentText>

                        <TextField
                            variant="outlined"
                            margin="dense"
                            id="identification"
                            name="identification"
                            label="Cédula"
                            type="text"
                            onChange={formik.handleChange}
                            values={formik.values.identification}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {formik.errors.identification}
                            {formik.touched.identification}
                        </DialogContentText>

                        <TextField
                            variant="outlined"
                            margin="dense"
                            id="main_cellphone"
                            name="main_cellphone"
                            label="Teléfono"
                            type="text"
                            onChange={formik.handleChange}
                            values={formik.values.main_cellphone}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {formik.errors.main_cellphone}
                            {formik.touched.main_cellphone}
                        </DialogContentText>

                        <TextField
                            variant="outlined"
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email"
                            type="text"
                            onChange={formik.handleChange}
                            values={formik.values.email}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {formik.errors.email}
                            {formik.touched.email}
                        </DialogContentText>



                    </DialogContent>

                    <DialogActions>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mb: 3 }}
                        >
                            <div className={classes.wrapper}>
                                <Button
                                    // disabled={processing}
                                    //onClick={handleValidate}
                                    //className={styles['btn-primary-m']}
                                    className={classes.create}
                                    variant='contained'
                                    type="submit"
                                    size="medium"
                                >
                                    Crear
                                </Button>
                                {/*{processing && <CircularProgress size={24} className={classes.buttonProgress} />}*/}
                            </div>
                            <Button
                                onClick={handleClose}
                                //fullWidth
                                size="medium"
                                variant="outlined"
                            >
                                Cerrar
                            </Button>
                        </Grid>

                    </DialogActions>
                </form>

            </Dialog>
        </div>
    );
};

export default CreateClient;