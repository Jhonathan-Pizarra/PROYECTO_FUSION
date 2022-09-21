import React, {useState} from "react";
import {Styles} from "@/styles/MantenedoresStyle";
import {Button, Dialog, FormControl, Grid, InputLabel, MenuItem, Select, TextField, ThemeProvider} from "@mui/material";
import {MUItheme} from "@/styles/Themes";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {useRouter} from "next/router";
import Container from "@mui/material/Container";
import FormSales from "@/components/saleType/complements/FormSales";


const ValidationSales = ({order,description, plan, cellphone, saleTypeId}) => {

    const classes = Styles();
    const [modal, setModal] = useState(true);
    const router = useRouter();
    const [isValidated, setIsValidated] = useState(false);

    // console.log('iNFO', order);
    // console.log('decs', description);
    // console.log('decs', plan);
    // console.log('decs', cellphone);
    // console.log('decs', saleTypeId);


    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        //formik.resetForm();
        setModal(false);
        //router.push(Routes.ORDERS);
    };

    const handleValidate = () => {
        //Aqui iría mi lógica para redireccionar al formulario de ventas....
        setIsValidated(true);
    };


    return (

        <div>
            {isValidated && <FormSales order={order} description={description} mustEnable={true} cellphone={cellphone} plan={plan} saleTypeId={saleTypeId}/>}
            <ThemeProvider theme={MUItheme}>


                <Dialog  open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen disableEnforceFocus>
                    <form>

                        <Container>

                            <Grid container spacing={1} justifyContent={'center'} style={{margin:'0.7rem 0 0.7rem 0'}}>
                                <Typography variant="h4" gutterBottom color={'#019DF4'}>
                                    Preguntas de Validación Equifax
                                </Typography>

                            </Grid>
                            <Stack spacing={2} direction={{ xs: 'column', sm: 'column',lg:'row'}}>

                                <Grid container  spacing={1} padding={2} marginY={1} borderRadius={5}>
                                    <Grid item xs={12} md={5}>
                                        <Typography variant="h6"  >
                                            Datos del Personales
                                        </Typography>
                                    </Grid>

                                    <Grid item spacing={2} xs={12} md={12} >
                                        <TextField
                                            variant="filled"
                                            label="Ingrese ID Validador"
                                            fullWidth
                                            //helperText="Fecha de ingreso"
                                            id="fechaIn"
                                            //value={orderData?.createdAt}
                                        />
                                    </Grid>

                                    <Grid item spacing={2} xs={12} md={12} >
                                        <TextField
                                            variant="filled"
                                            label="Ingrese su cédula"
                                            fullWidth
                                            //helperText="Fecha de ingreso"
                                            id="fechaIn"
                                            //value={orderData?.createdAt}
                                        />
                                    </Grid>

                                    <Grid item spacing={2} xs={12} md={12} >
                                        <TextField
                                            variant="filled"
                                            label="Ingrese su nómbre"
                                            fullWidth
                                            //helperText="Fecha de ingreso"
                                            id="fechaIn"
                                            //value={orderData?.createdAt}
                                        />
                                    </Grid>


                                </Grid>


                                <Grid container spacing={1} padding={2} marginY={2} borderRadius={5}>
                                    <Grid item xs={12} md={10}>
                                        <Typography variant="h6"  >
                                                Preguntas de verificación
                                        </Typography>
                                    </Grid>
                                    <Grid item spacing={2}  xs={12} md={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Lista de respuestas</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Lista de respuestas"

                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item spacing={2}  xs={12} md={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Lista de respuestas</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Lista de respuestas"

                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item spacing={2}  xs={12} md={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Lista de respuestas</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Lista de respuestas"

                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item spacing={2}  xs={12} md={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Lista de respuestas</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Lista de respuestas"

                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item spacing={2}  xs={12} md={12}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-end"
                                        alignItems="flex-end"
                                    >

                                            <Button variant="contained" onClick={handleValidate}>
                                                Gestionar
                                            </Button>

                                    </Grid>

                                    </Grid>


                                </Grid>
                            </Stack>

                        </Container>


                    </form>

                </Dialog>
            </ThemeProvider>
        </div>
    );
};

export default ValidationSales;