import React from "react";
import {Button, Grid, InputLabel, TextField, ThemeProvider} from "@mui/material";
import {MUItheme} from "@/styles/Themes";
import BuildIcon from "@mui/icons-material/Build";
import Stack from "@mui/material/Stack";
import {Client} from "@/lib/clientes";
import {useFormik} from "formik";
import FactCheckIcon from '@mui/icons-material/FactCheck';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Swal from "sweetalert2";
import * as yup from "yup";
import {Styles} from "@/styles/MantenedoresStyle";

const validatUpdateClientForm = yup.object({
    main_cellphone: yup.string().test("fill-all2", "El campo main_cellphone no debe ser el mismo que delivery_contact_aux", function (value) {
        if (value !== '') {
            return !(this.parent.main_cellphone === this.parent.delivery_contact_aux);
        } else {
            return true;
        }
    }),
    delivery_contact_aux: yup.string().test("fill-all2", "El campo delivery_contact_aux no debe ser el mismo que main_cellphone", function (value) {
        if (value !== '') {
            return !(this.parent.main_cellphone === this.parent.delivery_contact_aux);
        } else {
            return true;
        }
    }),
})


const UpdateClientForm = ({order, mustEnable, letUpdateClient}) => {

    const classes = Styles();

    console.log('Debe habilitarse', mustEnable); //True
    //console.log('Cliente?', client); //True
    console.log('Cliente?', order.Client.name); //True
    console.log('Cheetos', letUpdateClient); //True
    //console.log('Cliente?', client.name); //undefinex



    const formik = useFormik({
        initialValues: {
            name: order.Client.name,
            lastname: order.Client.lastname,
            identification: order.Client.identification,
            main_cellphone: order.Client.main_cellphone,
            delivery_contact_aux: order.Client.delivery_contact_aux,
            email: order.Client.email,
        },
        validationSchema: validatUpdateClientForm,
        onSubmit: values => onSubmit({values, order}).finally()
    });

    if(!order) return 'Cargando...';

    return (
        <div id="swal-input1" >
            <ThemeProvider theme={MUItheme}>
                <Grid
                    container
                    spacing={2}
                    //sx={{mt: 1}}
                    sx={{ padding: theme => `${theme.spacing(5,5,5,5)} !important` }}
                    //style={{backgroundColor: '#D3D4D3'}}
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Grid item xs={1} sx={{mb: 0}}>
                            <FactCheckIcon style={{fontSize: 48}}/>
                        </Grid>
                        <Grid item xs={10} sx={{mb: 0}}>
                            <h2>Actualizar Datos Personales</h2>
                        </Grid>
                    </Grid>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'column',lg:'row'}}>
                            <Grid container alignItems='end' spacing={2} padding={3} marginY={1} borderRadius={5} style={{backgroundColor:'#f5f5f5'}}>
                                <Grid item xs={3}>
                                    <InputLabel htmlFor="filled-adornment-amount">Nombres del Titular</InputLabel>
                                    <TextField
                                        disabled={mustEnable || letUpdateClient}
                                        style={{backgroundColor: '#FFFFFF'}}
                                        size="small"
                                        variant="outlined"
                                        margin="dense"
                                        defaultValue={order.Client.name}
                                        id="name"
                                        name="name"
                                        //label="Contacto para la entrega"
                                        type="text"
                                        onChange={formik.handleChange}
                                        values={formik.values.name}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <InputLabel htmlFor="filled-adornment-amount">Apellidos del Titular</InputLabel>
                                    <TextField
                                        disabled={mustEnable || letUpdateClient}
                                        style={{backgroundColor: '#FFFFFF'}}
                                        size="small"
                                        variant="outlined"
                                        margin="dense"
                                        defaultValue={order.Client.lastname}
                                        id="lastname"
                                        name="lastname"
                                        //label="Contacto Auxiliar"
                                        type="text"
                                        onChange={formik.handleChange}
                                        values={formik.values.lastname}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <InputLabel htmlFor="filled-adornment-amount">Cédula del Titular</InputLabel>
                                    <TextField
                                        disabled={mustEnable || letUpdateClient}
                                        style={{backgroundColor: '#FFFFFF'}}
                                        size="small"
                                        variant="outlined"
                                        margin="dense"
                                        defaultValue={order.Client.identification}
                                        id="identification"
                                        name="identification"
                                        //label="Email"
                                        type="text"
                                        onChange={formik.handleChange}
                                        values={formik.values.identification}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={3} paddingBottom={1}>
                                    <Button variant="contained" type="submit" startIcon={<BuildIcon />}>
                                        Actualizar
                                    </Button>
                                </Grid>

                                <Grid item xs={3}>
                                    <InputLabel htmlFor="filled-adornment-amount">Contacto para la Entrega</InputLabel>
                                    <TextField
                                        disabled={letUpdateClient}
                                        style={{backgroundColor: '#FFFFFF'}}
                                        size="small"
                                        variant="outlined"
                                        margin="dense"
                                        defaultValue={order.Client.main_cellphone}
                                        id="main_cellphone"
                                        name="main_cellphone"
                                        //label="Email"
                                        type="text"
                                        onChange={formik.handleChange}
                                        values={formik.values.main_cellphone}
                                        error={formik.touched.main_cellphone && Boolean(formik.errors.main_cellphone)}
                                        helperText={formik.touched.main_cellphone && formik.errors.main_cellphone}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <InputLabel htmlFor="filled-adornment-amount">Contacto Auxiliar</InputLabel>
                                    <TextField
                                        disabled={letUpdateClient}
                                        style={{backgroundColor: '#FFFFFF'}}
                                        size="small"
                                        variant="outlined"
                                        margin="dense"
                                        defaultValue={order.Client.delivery_contact_aux}
                                        id="delivery_contact_aux"
                                        name="delivery_contact_aux"
                                        //label="Email"
                                        type="text"
                                        onChange={formik.handleChange}
                                        values={formik.values.delivery_contact_aux}
                                        error={formik.touched.delivery_contact_aux && Boolean(formik.errors.delivery_contact_aux)}
                                        helperText={formik.touched.delivery_contact_aux && formik.errors.delivery_contact_aux}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel htmlFor="filled-adornment-amount">Email</InputLabel>
                                    <TextField
                                        disabled={letUpdateClient}
                                        style={{backgroundColor: '#FFFFFF'}}
                                        size="small"
                                        variant="outlined"
                                        margin="dense"
                                        defaultValue={order.Client.email}
                                        id="email"
                                        name="email"
                                        //label="Email"
                                        type="text"
                                        onChange={formik.handleChange}
                                        values={formik.values.email}
                                        fullWidth
                                    />
                                </Grid>

                            </Grid>
                        </Stack>
                    </form>

                </Grid>

            </ThemeProvider>
        </div>
    );
};

export default UpdateClientForm;

async function onSubmit({order, values}){

    //console.log(Swal.fire("Hola", 'COmo estas?', "success"));
    Swal.fire("Hola", 'COmo estas?', "success");
    /*Swal.fire({
        customClass: {
            container: 'my-swal'
        }
    }*/
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        zIndex: `${1000} !important`,
    })



    try {

        //alert("Se modificó");
        console.log('Doritos?', values);
        const resp =  await Client.update(order.Client.id,JSON.stringify(values));
        console.log("resp", resp);
    } catch (error) {
        console.error('Error:', error);
    }
}