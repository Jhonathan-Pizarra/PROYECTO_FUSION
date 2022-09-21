import {Auth} from "aws-amplify";
import * as yup from "yup";
import React, {useState} from "react";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
    ThemeProvider
} from "@mui/material";
//import {router} from "next/client";
//import {useRouter} from "next/router";
import NewUser from "../components/WelcomeUser";
import {useFormik} from "formik";
import {Styles} from "@/styles/MantenedoresStyle";
import {MUItheme} from "@/styles/Themes";

const schema = yup.object().shape({
    password: yup.string().required("Por favor ingresa la contraseña")
        .min(5, "Su contraseña debe ser más grande que 5 caracteres.")
        .max(25)
        .matches(/^(?=.{6,})/, "Debe contener 6 caracteres")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])/,
            "Debe tener una letra mayúscula y una minúscula"
        )
        .matches(
            /^(?=.*[!@#¡_\$%\^&\*])/,
            "Debe tener un caracter especial"
        )
        .matches(/^(?=.{6,20}$)\D*\d/, "Debe contener un número"),
    password_confirm: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden').required("Por favor ingresa la contraseña")
});

const CompletePassword = ({cognitoUser}) => {

    //const [loading, setLoading] = useState(false);
    const classes = Styles();
    const [modal, setModal] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [registrated, setResgistrated] = useState(false);
    //const router = useRouter();


    const handleClose = () => {
        setProcessing(false);
        setModal(false);
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            password_confirm: ''
        },
        validationSchema: schema,
        onSubmit: values => onSubmit(values)
    });


    const onSubmit = async (data) => {
        //setLoading(true);
        try{
            setProcessing(true);
            const dataUser = await Auth.completeNewPassword(
                cognitoUser,                    // the Cognito User Object
                data.password,                  // the new password
            );

            setResgistrated(true);
            //router.push(`${Routes.DASHBOARD}`)

        }catch (error) {
            setProcessing(false);
            handleClose();
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);

        }
        //setLoading(false);
        handleClose();
        reset();
    };


    return (
        <>
            {registrated && <NewUser/> }
            <ThemeProvider theme={MUItheme}>
            <Dialog open={modal} onClose={handleClose}>

                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>

                        <Grid spacing={0} justifyContent="center">

                        <DialogTitle id="form-dialog-title">
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                Nuevo Usuario
                            </Grid>

                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"

                            >
                                <DialogContentText>
                                    Para continuar por favor <b>cambie su contraseña aqui.</b> Esta acción se realizará una sola vez
                                    para los usuarios nuevos
                                </DialogContentText>
                            </Grid>
                        </DialogTitle>
                        </Grid>


                        <DialogContent spacing={2}>
                            <Grid container spacing={2} justifyContent="center">

                                <Grid item xs={12}>
                                    <TextField
                                        //autoFocus
                                        disabled={processing}
                                        //margin="dense"
                                        id="password"
                                        label="Contraseña*"
                                        type="password"
                                        name="password"
                                        fullWidth
                                        //variant="standard"
                                        onChange={formik.handleChange}
                                        values={formik.values.password}
                                    />
                                    <DialogContentText className={classes.validaciones}>
                                        {formik.touched.password && formik.errors.password}
                                    </DialogContentText>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        //autoFocus
                                        disabled={processing}
                                        //margin="dense"
                                        id="password_confirm"
                                        label="Confirmar Contraseña*"
                                        type="password"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        values={formik.values.password_confirm}
                                        //variant="standard"
                                    />
                                    <DialogContentText className={classes.validaciones}>
                                        {formik.touched?.password_confirm && formik.password_confirm?.status}
                                    </DialogContentText>
                                </Grid>

                            </Grid>

                        </DialogContent>

                        <DialogActions>
                            <Button
                                disabled={processing}
                                fullWidth
                                size='large'
                                variant='outlined'
                                //sx={{ marginBottom: 7 }}
                                onClick={handleClose}
                            >
                                Cancelar
                            </Button>

                            <Button
                                style={{
                                    color: 'white',
                                    backgroundColor: '#0B2739',
                                }}
                                disabled={processing}
                                fullWidth
                                size='large'
                                variant='contained'
                                //sx={{ marginBottom: 7 }}
                                type='submit'
                            >
                                Aceptar
                            </Button>
                            {processing && <CircularProgress size={24}/>}

                        </DialogActions>




                    </DialogContent>
                </form>

            </Dialog>
            </ThemeProvider>
        </>
    )
}

export default CompletePassword;


