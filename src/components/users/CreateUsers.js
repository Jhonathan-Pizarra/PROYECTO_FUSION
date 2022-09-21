import React, {useState} from "react";
import {User} from "@/lib/users";
import {fetcher} from "../../utils";
import {useFormik} from "formik";
import useSWR, {mutate as mutateIndex} from 'swr';
import * as yup from "yup";
import {Styles} from "@/styles/MantenedoresStyle";
import {MUItheme} from "@/styles/Themes";
import {validationPhoneNumber} from "../../helpers";
import {
    Box,
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
import Swal from "sweetalert2";


/*🔨 Working on this*/
//import {createTheme, ThemeProvider} from '@mui/material/styles';


const phoneRegExp = validationPhoneNumber('phone');

const schema = yup.object().shape({
    username: yup.string().required("Por favor introduce un usuario."),
    given_name: yup.string().required("Por favor introduce un nombre."),
    family_name: yup.string().required("Por favor introduce un apellido."),
    phone: yup.string()
        .matches(phoneRegExp, {message: "Ingrese un número válido.", excludeEmptyString: false})
        .required("Por favor introduce un número de celular")
        .min(10, "Se necesitan 10 números")
        .max(10, "Se necesitan 10 números"),
    email: yup.string().email("Introduce un email válido").required("Por favor introduce un correo electrónico."),
    status: yup.string().required("Por favor elige un estado."),
    //role: yup.string().required("Por favor elige un rol."),
    SkillId: yup.string().required("Por favor elige un Skill."),
    ChannelId: yup.string().required("Por favor elige un Canal."),
    CallCenterId: yup.string().required("Por favor elige un Callcenter."),
    RolId: yup.string().required("Por favor elige un rol."),
    picture: yup.string().required("Por favor introduce un avatar.")
});

const CreateUsers  = () => {

    const classes = Styles();
    const {data: skills} = useSWR(`/back-obo/skills`, fetcher);
    const {data: callcenters} = useSWR(`/back-obo/callcenters`, fetcher);
    const {data: channels} = useSWR(`/back-obo/channels`, fetcher);
    const {data: roleUser} = useSWR(`/back-obo/roles`, fetcher);
    //const {error, mutate} = useSWR(`/callcenters`, fetcher);
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
            title: '¡Creado con éxito!'
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
            title: 'No se ha podido llevar a cabo.'
        })

    }

    const onSubmit = async (data) => {

        try{
            switch (data.RolId) {
                case 1:
                    data.roles[0] = 'Administrador'
                    break;
                case 2:
                    data.roles[0] = 'Supervisor'
                    break;
                case 3:
                    data.roles[0] = 'Vendedor'
                    break;
                case 4:
                    data.roles[0] = 'BackOffice'
                    break;
                case 5:
                    data.roles[0] = 'Atencion'
                    break;
                default:
                    data.roles[0] = null
                    break;
            }
        }catch (error) {
            console.error('Error:', error);
        }

        //data.RoleId == 1 ? data.roles[0] = 'Administrador' : data.roles[0] = 'Supervisor'

        try {
            setProcessing(true);
            await User.create(JSON.stringify(data));
            //mutate();
            mutateIndex('/back-obo/users');//usuarios
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
            username: '',
            given_name: '',
            family_name: '',
            phone:'',
            email: '',
            status: '',
            picture: '',
            SkillId: '',
            ChannelId: '',
            CallCenterId: '',
            RolId: ''
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
                <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'} disableEnforceFocus>
                    <form onSubmit={formik.handleSubmit} >
                        <DialogContent>
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
                                        Por favor llena los siguientes campos:
                                    </DialogContentText>
                                </Grid>
                            </DialogTitle>

                           <DialogContent>
                               <Box sx={{ flexGrow: 1 }}>
                                   <Grid container spacing={1}>
                                       <Grid item xs sx={{ padding: theme => `${theme.spacing(2,0,1,1)} !important` }}>
                                           <FormControl fullWidth>
                                               <InputLabel id="demo-simple-select-label">Canal</InputLabel>
                                               <Select
                                                   //autoFocus={true}
                                                   disabled={processing}
                                                   //className={classes.inputs}
                                                   size="small"
                                                   sx={{ mt: 1}}
                                                   margin="dense"
                                                   labelId="ChannelId"
                                                   component="select"
                                                   id="ChannelId"
                                                   name="ChannelId"
                                                   //defaultValue={"Seleccionar"}
                                                   onChange={formik.handleChange}
                                                   values={formik.values.ChannelId}
                                                   //value={age}
                                                   label="Canal"
                                                   fullWidth
                                               >
                                                   {channels?.map((channel) => (
                                                       <MenuItem key={channel.id} value={channel.id}>{channel.name}</MenuItem>
                                                   ))}

                                               </Select>
                                               <DialogContentText className={classes.validaciones}>
                                                   {formik.touched.ChannelId  && formik.errors.ChannelId}
                                               </DialogContentText>
                                           </FormControl>
                                       </Grid>
                                       <Grid item xs={4} sx={{ padding: theme => `${theme.spacing(2,0,1,1)} !important` }}>
                                           <FormControl fullWidth>
                                               <InputLabel id="demo-simple-select-label">Callcenter</InputLabel>
                                               <Select
                                                   //autoFocus={true}
                                                   disabled={processing}
                                                   size="small"
                                                   sx={{ mt: 1}}
                                                   margin="dense"
                                                   labelId="CallCenterId"
                                                   component="select"
                                                   id="CallCenterId"
                                                   name="CallCenterId"
                                                   //defaultValue={"Seleccionar"}
                                                   onChange={formik.handleChange}
                                                   values={formik.values.CallCenterId}
                                                   //value={age}
                                                   label="Callcenter"
                                                   fullWidth
                                               >
                                                   {callcenters?.map((callcenter) => (
                                                       <MenuItem key={callcenter.id} value={callcenter.id}>{callcenter.name}</MenuItem>
                                                   ))}

                                               </Select>
                                               <DialogContentText className={classes.validaciones}>
                                                   {formik.touched.CallCenterId  && formik.errors.CallCenterId}
                                               </DialogContentText>
                                           </FormControl>
                                       </Grid>
                                       <Grid item xs sx={{ padding: theme => `${theme.spacing(2,0,1,1)} !important` }}>
                                           <FormControl fullWidth>
                                               <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                                               <Select
                                                   disabled={processing}
                                                   //autoFocus={true}
                                                   //disabled={true}
                                                   size="small"
                                                   sx={{ mt: 1}}
                                                   margin="dense"
                                                   labelId="RolId"
                                                   component="select"
                                                   id="RolId"
                                                   name="RolId"
                                                   //defaultValue={"Seleccionar"}
                                                   onChange={formik.handleChange}
                                                   values={formik.values.RolId}
                                                   //value={age}
                                                   label="Rol"
                                                   fullWidth
                                               >
                                                   {roleUser?.map((rol) => (
                                                       <MenuItem key={rol.id} value={rol.id}>{rol.name}</MenuItem>
                                                   ))}
                                               </Select>
                                               <DialogContentText className={classes.validaciones}>
                                                   {formik.touched.RolId  && formik.errors.RolId}
                                               </DialogContentText>
                                           </FormControl>
                                       </Grid>
                                   </Grid>
                                   <Grid container spacing={1}>
                                       <Grid item xs sx={{ padding: theme => `${theme.spacing(2,0,1,1)} !important` }}>
                                           <FormControl fullWidth>
                                               <InputLabel id="demo-simple-select-label">Skill</InputLabel>
                                               <Select
                                                   disabled={processing}
                                                   //autoFocus={true}
                                                   //disabled={true}
                                                   size="small"
                                                   sx={{ mt: 1}}
                                                   margin="dense"
                                                   labelId="SkillId"
                                                   component="select"
                                                   id="SkillId"
                                                   name="SkillId"
                                                   //defaultValue={"Seleccionar"}
                                                   onChange={formik.handleChange}
                                                   values={formik.values.SkillId || ''}
                                                   //value={age}
                                                   label="Skill"
                                                   fullWidth
                                               >
                                                   {skills?.map((skill) => (
                                                       <MenuItem key={skill.id} value={skill.id}>{skill.name}</MenuItem>
                                                       // <MenuItem value={place.id}>{place.name}</MenuItem>
                                                       // <option key={place.id}  value={place.id}>{place.name}</option>
                                                   ))}

                                               </Select>
                                               <DialogContentText className={classes.validaciones}>
                                                   {formik.touched.SkillId  && formik.errors.SkillId}
                                               </DialogContentText>
                                           </FormControl>
                                       </Grid>
                                       <Grid item xs={4} sx={{ padding: theme => `${theme.spacing(2,0,1,1)} !important` }}>
                                           <TextField
                                               disabled={processing}
                                               size={'small'}
                                               variant="outlined"
                                               margin="dense"
                                               id="given_name"
                                               name="given_name"
                                               label="Nombre*"
                                               type="text"
                                               onChange={formik.handleChange}
                                               values={formik.values.given_name}
                                               fullWidth
                                           />
                                           <DialogContentText className={classes.validaciones}>
                                               {formik.touched.given_name  && formik.errors.given_name}
                                           </DialogContentText>
                                       </Grid>
                                       <Grid item xs sx={{ padding: theme => `${theme.spacing(2,0,1,1)} !important` }}>
                                           <TextField
                                               disabled={processing}
                                               size={'small'}
                                               variant="outlined"
                                               margin="dense"
                                               id="family_name"
                                               name="family_name"
                                               label="Apellido*"
                                               type="text"
                                               onChange={formik.handleChange}
                                               values={formik.values.family_name}
                                               fullWidth
                                           />
                                           <DialogContentText className={classes.validaciones}>
                                               {formik.touched.family_name  && formik.errors.family_name}
                                           </DialogContentText>
                                       </Grid>
                                   </Grid>
                                   <Grid container spacing={1}>
                                       <Grid item xs>
                                           <TextField
                                               disabled={processing}
                                               size={'small'}
                                               variant="outlined"
                                               margin="dense"
                                               id="username"
                                               name="username"
                                               label="Nombre de usuario*"
                                               type="text"
                                               onChange={formik.handleChange}
                                               values={formik.values.username}
                                               fullWidth
                                           />
                                           <DialogContentText className={classes.validaciones}>
                                               {formik.touched.username  && formik.errors.username}
                                           </DialogContentText>
                                       </Grid>
                                       <Grid item xs={4}>
                                           <TextField
                                               disabled={processing}
                                               size={'small'}
                                               variant="outlined"
                                               margin="dense"
                                               id="phone"
                                               name="phone"
                                               label="phone*"
                                               type="text"
                                               onChange={formik.handleChange}
                                               values={formik.values.phone}
                                               fullWidth
                                           />
                                           <DialogContentText className={classes.validaciones}>
                                               {formik.touched.phone  && formik.errors.phone}
                                           </DialogContentText>
                                       </Grid>
                                       <Grid item xs={4}>
                                           <TextField
                                               disabled={processing}
                                               size={'small'}
                                               variant="outlined"
                                               margin="dense"
                                               id="email"
                                               name="email"
                                               label="Email*"
                                               type="text"
                                               onChange={formik.handleChange}
                                               values={formik.values.email}
                                               fullWidth
                                           />
                                           <DialogContentText className={classes.validaciones}>
                                               {formik.touched.email  && formik.errors.email}
                                           </DialogContentText>
                                       </Grid>
                                   </Grid>
                                   <Grid container spacing={1}>
                                       <Grid item xs={4} sx={{ padding: theme => `${theme.spacing(2,0,1,1)} !important` }}>
                                           <FormControl fullWidth>
                                               <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                               <Select
                                                   disabled={processing}
                                                   //autoFocus={true}
                                                   size="small"
                                                   sx={{ mt: 1}}
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
                                                   {formik.touched.status  && formik.errors.status}
                                               </DialogContentText>
                                           </FormControl>
                                       </Grid>
                                       <Grid item xs sx={{ padding: theme => `${theme.spacing(2,0,1,1)} !important` }}>
                                           <TextField
                                               disabled={processing}
                                               size={'small'}
                                               variant="outlined"
                                               margin="dense"
                                               id="picture"
                                               name="picture"
                                               label="Avatar*"
                                               type="text"
                                               onChange={formik.handleChange}
                                               values={formik.values.picture}
                                               fullWidth
                                           />
                                           <DialogContentText className={classes.validaciones}>
                                               {formik.touched.picture  && formik.errors.picture}
                                           </DialogContentText>
                                       </Grid>
                                   </Grid>
                               </Box>
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

export default CreateUsers;