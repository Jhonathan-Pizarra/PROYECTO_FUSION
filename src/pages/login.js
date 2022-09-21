// ** React Imports
import {useState} from 'react'

// ** Next Imports
import {useRouter} from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
//import {useTheme} from '@mui/material/styles'

/*My Imports*/
import {Auth} from 'aws-amplify';
import * as yup from "yup";
import BlankLayout from "../components/BlankLayout";
import {Card, Checkbox, CircularProgress, DialogContentText, ThemeProvider} from "@mui/material";
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import CompletePassword from "@/hocs/complete-password";
import Routes from "@/constants/routes";
//import AlertMassage from "../components/AlertMessage";
//import SnackError from "../components/SnackError";
import {Styles} from "@/styles/MantenedoresStyle";
//import SuccessMessage from "../components/SuccessMessage";
import {useFormik} from "formik";
import Swal from "sweetalert2";
import {MUItheme} from "@/styles/Themes";

//** My Functions
const schema = yup.object().shape({
    //email: yup.string().email("Esé email no es válido").required("Ingresa el email"),
    username: yup.string().required("Por favor ingrese el usuario"),
    password: yup.string().required("Por favor ingrese su contraseña")
        .min(5, "Su contraseña debe ser más grande que 5 caracteres.")
        .max(25)
        .matches(/^(?=.{6,})/, "Debe contener 6 caracteres")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])/,
            "Debe tener una letra mayúscula y una minúscula"
        )
        .matches(
            /^(?=.*[!,/@#¡_\$%\^&\*])/,
            "Debe tener un caracter especial"
        )
        .matches(/^(?=.{6,20}$)\D*\d/, "Debe contener un número")
});


const LoginPage = () => {

    // ** State
    const [loading, setLoading] = useState(false);
    const [userIsOk, setUserIsOk] = useState(false);
    const [user, setUser] = useState(null);
    const [values] = useState({
        password: '',
        showPassword: false
    })

    // ** Hooks
    //const theme = useTheme()
    const router = useRouter()
    const classes = Styles();
    //const elementRef  = useRef(null);

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
            title: 'Acceso concedido'
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
            title: 'Acceso denegado'
        })

    }


    const onSubmit = async (data) => {

        try{
            setLoading(true);
            const cognitoUser = await Auth.signIn(data.username, data.password);
            

            if(cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED'){
                setUserIsOk(true);
                setUser(cognitoUser);
                setLoading(false);
            }else{
                const jwt = cognitoUser.signInUserSession.accessToken.jwtToken;
                localStorage.setItem("jwt", jwt);
                //localStorage.setItem("Token", jwt);
                router.push(`${Routes.DASHBOARD}`);
            }
            mostrarExito();
        }catch (error) {
            mostrarError();
            setLoading(false);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("Imprevisto", error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log("Respuesta", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
            setLoading(false);
        }
        console.log(data);
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: values => onSubmit(values)
    });

    return (

        <div>
            {userIsOk && <CompletePassword cognitoUser={user} />}
            <ThemeProvider theme={MUItheme}>
            <BlankLayout>
                <Box className='content-center'>
                    <Card sx={{ zIndex: 1 }}>
                        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
                            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                <Typography
                                    variant='h6'
                                    sx={{
                                        ml: 3,
                                        lineHeight: 1,
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        fontSize: '1.5rem !important'
                                    }}
                                >
                                    {/*{themeConfig.templateName}*/}
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 5 }}>
                                <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, textAlign: 'center' }}>
                                    Bienvenido
                                </Typography>
                                <Typography variant='body2' sx={{ textAlign: 'center' }}>Por favor inicia sesión para continuar</Typography>
                            </Box>
                            <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>

                                <Box
                                    sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
                                >
                                    <TextField
                                        disabled={loading}
                                        autoComplete="username"
                                        fullWidth
                                        id='username'
                                        name="username"
                                        type="text"
                                        label='Usuario*'
                                        onChange={formik.handleChange}
                                        values={formik.values.username}
                                        //sx={{ padding: theme => `${theme.spacing(5,0)} !important` }}
                                        //sx={{ marginBottom: 4 }}
                                    />
                                    <DialogContentText className={classes.validaciones}>
                                        {formik.touched.username && formik.errors.username}
                                    </DialogContentText>
                                </Box>



                                <FormControl fullWidth>
                                    <InputLabel htmlFor='password'>Contraseña*</InputLabel>
                                    <OutlinedInput
                                        disabled={loading}
                                        label='Contraseña'
                                        //value={values.password}
                                        id='password'
                                        //onChange={handleChange('password')}
                                        type={values.showPassword ? 'text' : 'password'}
                                        //sx={{ padding: theme => `${theme.spacing(0,5)} !important` }}
                                        onChange={formik.handleChange}
                                        values={formik.values.password}
                                    />
                                    <DialogContentText className={classes.validaciones}>
                                        {formik.touched.password && formik.errors.password}
                                    </DialogContentText>
                                </FormControl>



                                <Box
                                    sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
                                >
                                    <MuiFormControlLabel control={<Checkbox />} label='Recúerdame' />
                                </Box>

                                <Button
                                    disabled={loading}
                                    fullWidth
                                    size='large'
                                    variant='contained'
                                    sx={{ marginBottom: 7 }}
                                    type='submit'
                                >
                                    Ingresar
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                {/*<div className={classes.wrapper}>*/}
                                {/*    <Button*/}
                                {/*        color="primary"*/}
                                {/*        //onClick={handleValidate}*/}
                                {/*        disabled={processing}*/}
                                {/*        type="submit"*/}
                                {/*    >*/}
                                {/*        Crear*/}
                                {/*    </Button>*/}
                                {/*    {processing && <CircularProgress size={24} className={classes.buttonProgress} />}*/}
                                {/*</div>*/}
                            </form>
                        </CardContent>
                    </Card>
                </Box>
            </BlankLayout>
            </ThemeProvider>
        </div>

    )
}

export default LoginPage;
