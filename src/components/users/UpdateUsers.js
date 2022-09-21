import React, {useState} from "react";
import {User} from "@/lib/users";
import {fetcher} from "../../utils";
import {useFormik} from "formik";
import useSWR, {mutate as mutateIndex} from "swr";
import * as yup from "yup";
import {Styles} from "@/styles/MantenedoresStyle";

import {
    Box,
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
    username: yup.string().required("Por favor introduce un usuario."),
    given_name: yup.string().required("Por favor introduce un nombre."),
    family_name: yup.string().required("Por favor introduce un apellido."),
    phone: yup.string().required("Por favor introduce un número de teléfono."),
    email: yup.string().required("Por favor introduce un correo electrónico."),
    status: yup.string().required("Por favor elige un estado."),
    //role: yup.string().required("Por favor elige un rol."),
    SkillId: yup.string().required("Por favor elige un Skill."),
    ChannelId: yup.string().required("Por favor elige un Canal."),
    CallCenterId: yup.string().required("Por favor elige un Callcenter."),
    RolId: yup.string().required("Por favor elige un rol."),
    picture: yup.string().required("Por favor introduce un avatar.")
});

const UpdateUser  = ({id, username, given_name, family_name, phone, email, status, rol, picture, SkillId, ChannelId, CallCenterId, RolId }) => {

    const classes = Styles();
    const [modal, setModal] = useState(false);
    //const {mutate} = useSWR(`/users`, fetcher);
    const {data: skills} = useSWR(`/back-obo/skills`, fetcher);
    const {data: callcenters} = useSWR(`/back-obo/callcenters`, fetcher);
    const {data: channels} = useSWR(`/back-obo/channels`, fetcher);
    const {data: roleUser} = useSWR(`/back-obo/roles`, fetcher);
    //const {error, mutate} = useSWR(`/callcenters`, fetcher);
    const [processing, setProcessing] = useState(false);


    console.log('que trajo?', rol);
    //console.log('SHDBS', skills);
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
            title: '¡Registro Modificado!'
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
        //data.RolId == 1 ? data.roles = ['Administrador'] : data.roles = ['Supervisor']


        try {
            setProcessing(true);
            await User.update(id, JSON.stringify(data));
            mutateIndex('/back-obo/users');
            mostrarEdicion();
            handleClose();
        } catch (error) {
            setProcessing(true);
            handleClose();
            mostrarError();
            console.error('Error:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            username: username,
            given_name: given_name,
            family_name: family_name,
            phone: phone,
            email: email,
            status: status,
            picture: picture,
            SkillId: SkillId,
            ChannelId: ChannelId,
            CallCenterId: CallCenterId,
           // RolId : `${RolId.id}_${RolId.name}`
            RolId : RolId,
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
                                    Modificar Usuario
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
                                <Box sx={{ flexGrow: 2 }}>
                                    <Grid container spacing={1}>
                                        <Grid item xs sx={{ padding: theme => `${theme.spacing(2,0,1,1)} !important` }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Canal</InputLabel>
                                                <Select
                                                    disabled={processing}
                                                    size="small"
                                                    sx={{ mt: 1}}
                                                    margin="dense"
                                                    labelId="ChannelId"
                                                    component="select"
                                                    id="ChannelId"
                                                    name="ChannelId"
                                                    defaultValue={ChannelId}
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
                                                    {formik.errors.ChannelId}
                                                    {formik.touched.ChannelId}
                                                </DialogContentText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4} sx={{ padding: theme => `${theme.spacing(2,0,1,1)} !important` }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Callcenter</InputLabel>
                                                <Select
                                                    disabled={processing}
                                                    size="small"
                                                    sx={{ mt: 1}}
                                                    margin="dense"
                                                    labelId="CallCenterId"
                                                    component="select"
                                                    id="CallCenterId"
                                                    name="CallCenterId"
                                                    defaultValue={CallCenterId}
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
                                                <DialogContentText color="secondary">
                                                    {formik.errors.CallCenterId}
                                                    {formik.touched.CallCenterId}
                                                </DialogContentText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs sx={{ padding: theme => `${theme.spacing(2,0,1,1)} !important` }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                                                <Select
                                                    disabled={processing}
                                                    size="small"
                                                    sx={{ mt: 1}}
                                                    margin="dense"
                                                    labelId="RolId"
                                                    component="select"
                                                    id="RolId"
                                                    name="RolId"
                                                    defaultValue={RolId}
                                                    onChange={formik.handleChange}
                                                    values={formik.values.RolId}
                                                    //value={age}
                                                    label="Rol"
                                                    fullWidth
                                                >
                                                    {roleUser?.map((rol) => (
                                                        // <MenuItem key={rol.id} value={`${rol.id}_${rol.name}`}>{rol.name}</MenuItem>
                                                        <MenuItem key={rol.id} value={rol.id}>{rol.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                <DialogContentText color="secondary">
                                                    {formik.errors.RolId}
                                                    {formik.touched.RolId}
                                                </DialogContentText>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Skill</InputLabel>
                                                <Select
                                                    disabled={processing}
                                                    size="small"
                                                    sx={{ mt: 1}}
                                                    margin="dense"
                                                    labelId="SkillId"
                                                    component="select"
                                                    id="SkillId"
                                                    name="SkillId"
                                                    defaultValue={SkillId}
                                                    onChange={formik.handleChange}
                                                    values={formik.values.SkillId}
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
                                                <DialogContentText color="secondary">
                                                    {formik.errors.SkillId}
                                                    {formik.touched.SkillId}
                                                </DialogContentText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                disabled={processing}
                                                size="small"
                                                variant="outlined"
                                                margin="dense"
                                                id="given_name"
                                                name="given_name"
                                                label="Nombre*"
                                                type="text"
                                                defaultValue={given_name}
                                                onChange={formik.handleChange}
                                                values={formik.values.given_name}
                                                fullWidth
                                            />
                                            <DialogContentText className={classes.validaciones}>
                                                {formik.errors.given_name}
                                                {formik.touched.given_name}
                                            </DialogContentText>
                                        </Grid>
                                        <Grid item xs>
                                            <TextField
                                                disabled={processing}
                                                size="small"
                                                variant="outlined"
                                                margin="dense"
                                                id="family_name"
                                                name="family_name"
                                                label="Apellido*"
                                                type="text"
                                                defaultValue={family_name}
                                                onChange={formik.handleChange}
                                                values={formik.values.family_name}
                                                fullWidth
                                            />
                                            <DialogContentText className={classes.validaciones}>
                                                {formik.errors.family_name}
                                                {formik.touched.family_name}
                                            </DialogContentText>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs>
                                            <TextField
                                                size="small"
                                                disabled={true}
                                                variant="outlined"
                                                margin="dense"
                                                id="username"
                                                name="username"
                                                label="Nombre de usuario*"
                                                type="text"
                                                defaultValue={username}
                                                onChange={formik.handleChange}
                                                values={formik.values.username}
                                                fullWidth
                                            />
                                            <DialogContentText className={classes.validaciones}>
                                                {formik.errors.username}
                                                {formik.touched.username}
                                            </DialogContentText>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                disabled={processing}
                                                size="small"
                                                variant="outlined"
                                                margin="dense"
                                                id="phone"
                                                name="phone"
                                                label="phone*"
                                                type="text"
                                                defaultValue={phone}
                                                onChange={formik.handleChange}
                                                values={formik.values.phone}
                                                fullWidth
                                            />
                                            <DialogContentText className={classes.validaciones}>
                                                {formik.errors.phone}
                                                {formik.touched.phone}
                                            </DialogContentText>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                disabled={processing}
                                                size="small"
                                                variant="outlined"
                                                margin="dense"
                                                id="email"
                                                name="email"
                                                label="Email*"
                                                type="text"
                                                defaultValue={email}
                                                onChange={formik.handleChange}
                                                values={formik.values.email}
                                                fullWidth
                                            />
                                            <DialogContentText className={classes.validaciones}>
                                                {formik.errors.email}
                                                {formik.touched.email}
                                            </DialogContentText>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={4} sx={{ padding: theme => `${theme.spacing(2,0,1,1)} !important` }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                                <Select
                                                    disabled={processing}
                                                    size="small"
                                                    sx={{ mt: 1}}
                                                    margin="dense"
                                                    labelId="status"
                                                    component="select"
                                                    id="status"
                                                    name="status"
                                                    defaultValue={status}
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
                                                    {formik.errors.status}
                                                    {formik.touched.status}
                                                </DialogContentText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs sx={{ padding: theme => `${theme.spacing(2,0,1,1)} !important` }}>
                                            <TextField
                                                disabled={processing}
                                                size="small"
                                                variant="outlined"
                                                margin="dense"
                                                id="picture"
                                                name="picture"
                                                label="Avatar*"
                                                type="text"
                                                defaultValue={picture}
                                                onChange={formik.handleChange}
                                                values={formik.values.picture}
                                                fullWidth
                                            />
                                            <DialogContentText className={classes.validaciones}>
                                                {formik.errors.picture}
                                                {formik.touched.picture}
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

export default UpdateUser;