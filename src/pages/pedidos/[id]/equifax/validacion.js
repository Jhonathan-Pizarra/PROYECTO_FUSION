import {withSSRAuth} from "@/hocs/withSSRAuth"
import ValidationSales from "@/components/saleType/complements/ValidationSales";
import {useRouter} from "next/router";
import useSWR from "swr";
import {fetcher} from "../../../../utils";
import {Styles} from "@/styles/MantenedoresStyle";
import {useState} from "react";
import FormSales from "@/components/saleType/complements/FormSales";
import {Button, Dialog, FormControl, Grid, InputLabel, MenuItem, Select, TextField, ThemeProvider} from "@mui/material";
import {MUItheme} from "@/styles/Themes";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import React from "react";

const variable = [
    {
        "status": true,
        "message": "Consulta Exitosa.",
        "data": {
            "NewDataSet": {
                "IdentificacionyNombreSujeto_IdValidator02": {
                    "NumeroDocumento": "1723781074",
                    "Nombre": "ANGO YANACALLO JOHNY PATRICIO"
                },
                "RepObtenerPrimeraConsulta_01": [
                    {
                        "No.": "1",
                        "PREGUNTA": "¿Qué marca de tarjeta de crédito activa tiene actualmente?"
                    },
                    {
                        "No.": "A",
                        "PREGUNTA": "AMERICAN EXPRESS BCO DE GUAYAQUIL"
                    },
                    {
                        "No.": "B",
                        "PREGUNTA": "MASTERCARD BOLIVARIANO"
                    },
                    {
                        "No.": "C",
                        "PREGUNTA": "VISA BCO DE MACHALA"
                    },
                    {
                        "No.": "D",
                        "PREGUNTA": "VISA BOLIVARIANO"
                    },
                    {
                        "No.": "2",
                        "PREGUNTA": "¿En qué institución mantiene (al menos) un crédito vigente a Agosto 2022?"
                    },
                    {
                        "No.": "A",
                        "PREGUNTA": "BCO DE LOJA"
                    },
                    {
                        "No.": "B",
                        "PREGUNTA": "BOLIVARIANO"
                    },
                    {
                        "No.": "C",
                        "PREGUNTA": "INTERNACIONAL"
                    },
                    {
                        "No.": "D",
                        "PREGUNTA": "PICHINCHA"
                    },
                    {
                        "No.": "3",
                        "PREGUNTA": "¿Cuál es la institución o banco emisor de su tarjeta de crédito?"
                    },
                    {
                        "No.": "A",
                        "PREGUNTA": "BCO DE GUAYAQUIL"
                    },
                    {
                        "No.": "B",
                        "PREGUNTA": "INTERNACIONAL"
                    },
                    {
                        "No.": "C",
                        "PREGUNTA": "MUTUALISTA PICHINCHA"
                    },
                    {
                        "No.": "D",
                        "PREGUNTA": "PRODUBANCO"
                    },
                    {
                        "No.": "4",
                        "PREGUNTA": "¿Cuál de los siguientes tipos de crédito mantiene vigente?"
                    },
                    {
                        "No.": "A",
                        "PREGUNTA": "CONSUMO - PICHINCHA"
                    },
                    {
                        "No.": "B",
                        "PREGUNTA": "CONSUMO - BCO CAPITAL S.A."
                    },
                    {
                        "No.": "C",
                        "PREGUNTA": "MICROCREDITO - COOP. OSCUS"
                    },
                    {
                        "No.": "D",
                        "PREGUNTA": "MICROCREDITO - COOP. PABLO MU-OZ VEGA"
                    }
                ],
                "CodigoAutogenerado": {
                    "CODIGO_x0020_AUTOGENERADO": "232837030"
                },
                "SegmentosBuscarIdReporte": [
                    {
                        "idSegmento": "601",
                        "Nombre": "IdentificacionyNombreSujeto_IdValidator02",
                        "Descripcion": "Obtiene datos de sujeto evaluado",
                        "NombreUserControl": [],
                        "informativo": "false",
                        "KeyMensaje": [],
                        "CodigoWS": "IdentificacionyNombreSujeto"
                    },
                    {
                        "idSegmento": "599",
                        "Nombre": "RepObtenerPrimeraConsulta_01",
                        "Descripcion": "Obtiene valores de primera consulta sobre ID Validator",
                        "NombreUserControl": [],
                        "informativo": "false",
                        "KeyMensaje": [],
                        "CodigoWS": "PrimeraConsulta_01"
                    },
                    {
                        "idSegmento": "598",
                        "Nombre": "CodigoAutogenerado",
                        "Descripcion": "Obtiene Codigo Autogenrado de seguimiento",
                        "NombreUserControl": [],
                        "informativo": "false",
                        "KeyMensaje": [],
                        "CodigoWS": "CodigoAuto"
                    }
                ]
            }
        }
    }
];

const Validacion = () => {

    console.log('Ponny Malta', variable);//Imprime _:D
    console.log('Xd', variable[0].data.NewDataSet.CodigoAutogenerado.CODIGO_x0020_AUTOGENERADO);
    console.log('Xd2', variable[0].data.NewDataSet.RepObtenerPrimeraConsulta_01[0].PREGUNTA);

    const classes = Styles();
    const [modal, setModal] = useState(true);
    const router = useRouter();
    const [isValidated, setIsValidated] = useState(false);
    const {id, cellphone, plan, description,saleTypeId, cedula} = router.query;
    const {data: order, error} = useSWR(`back-obo/orders/${id}`, fetcher);


    console.log('Chetos', cedula);
    console.log('Chetos', plan);
    const validacionClienteEquifax = JSON.parse(localStorage.getItem(cedula));

    console.log('Lol', validacionClienteEquifax);


    const codigo = validacionClienteEquifax.data.NewDataSet.CodigoAutogenerado.CODIGO_x0020_AUTOGENERADO;

    const pregunta1 = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[0].PREGUNTA;
    const respuestaA = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[1].PREGUNTA;
    const respuestaB = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[2].PREGUNTA;
    const respuestaC = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[3].PREGUNTA;
    const respuestaD = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[4].PREGUNTA;


    const pregunta2 = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[5].PREGUNTA;
    const respuestaA2 = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[6].PREGUNTA;
    const respuestaB2 = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[7].PREGUNTA;
    const respuestaC2 = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[8].PREGUNTA;
    const respuestaD2 = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[9].PREGUNTA;

    const pregunta3 = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[10].PREGUNTA;
    const respuestaA3 = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[11].PREGUNTA;
    const respuestaB3 = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[12].PREGUNTA;
    const respuestaC3 = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[13].PREGUNTA;
    const respuestaD3 = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[14].PREGUNTA;

    const pregunta4 = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[15].PREGUNTA;
    const respuestaA4 = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[16].PREGUNTA;
    const respuestaB4 = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[17].PREGUNTA;
    const respuestaC4 = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[18].PREGUNTA;
    const respuestaD4 = validacionClienteEquifax.data.NewDataSet.RepObtenerPrimeraConsulta_01[19].PREGUNTA;
    //const {data: orderData, error} = useSWR(`/back-obo/orders/${id}`, fetcher);

    console.log('Restar', codigo);
    console.log('Kamehameha', respuestaA);


    //const dataToValidate = JSON.parse(selectedOrder);

    //console.log("Feuf", order.Client.identification);
    console.log('iNFO', order);
    console.log('decs', description);
    console.log('decs', plan);
    console.log('decs', cellphone);
    console.log('decsGX', saleTypeId);
    console.log('Orden con datos');
    //console.log('Cédula que necesito', selectedOrder.Client);
    //console.log('ValdiateTex', dataToValidate);

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

    if(!order) return 'Cargando...';

    return (
        <>

            {/*<ValidationSales description={description} order={order} plan={plan} cellphone={cellphone} saleTypeId={saleTypeId}/>*/}
            <div>
                {/*{isValidated && <FormSales order={order} description={description} mustEnable={true} cellphone={cellphone} plan={plan} saleTypeId={saleTypeId}/>}*/}
                <ThemeProvider theme={MUItheme}>

                    <div onClose={handleClose} aria-labelledby="form-dialog-title" >
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
                                                variant="outlined"
                                                disabled
                                                label="Ingrese ID Validador"
                                                fullWidth
                                                //helperText="Fecha de ingreso"
                                                id="fechaIn"
                                                //value={orderData?.createdAt}
                                                //value={order.Client.identification}
                                                //value={validacionClienteEquifax.CodigoAutogenerado.CODIGO_x0020_AUTOGENERADO}
                                                value={codigo}
                                            />
                                        </Grid>

                                        <Grid item spacing={2} xs={12} md={12} >
                                            <TextField
                                                variant="outlined"
                                                disabled
                                                label="Cédula"
                                                fullWidth
                                                //helperText="Fecha de ingreso"
                                                id="fechaIn"
                                                //value={orderData?.createdAt}
                                                //value={order.Client.identification}
                                                //value={variable.CodigoAutogenerado.CODIGO_x0020_AUTOGENERADO}
                                                value={order.Client.identification}
                                            />
                                        </Grid>

                                        <Grid item spacing={2} xs={12} md={12} >
                                            <TextField
                                                variant="outlined"
                                                disabled
                                                label="Ingrese su nómbre"
                                                fullWidth
                                                //helperText="Fecha de ingreso"
                                                //value={orderData?.createdAt}
                                                id="fechaIn"
                                                value={order.Client.name}
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
                                                <InputLabel id="demo-simple-select-label" sx={{pb: 3}}>{pregunta1}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    //label={pregunta1}
                                                    label={pregunta1}
                                                >
                                                    <MenuItem value={'A'}>{respuestaA}</MenuItem>
                                                    <MenuItem value={'B'}>{respuestaB}</MenuItem>
                                                    <MenuItem value={'C'}>{respuestaC}</MenuItem>
                                                    <MenuItem value={'D'}>{respuestaD}</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item spacing={2}  xs={12} md={12}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">{pregunta2}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label={pregunta2}

                                                >
                                                    <MenuItem value={'A'}>{respuestaA2}</MenuItem>
                                                    <MenuItem value={'B'}>{respuestaB2}</MenuItem>
                                                    <MenuItem value={'C'}>{respuestaC2}</MenuItem>
                                                    <MenuItem value={'D'}>{respuestaD2}</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item spacing={2}  xs={12} md={12}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">{pregunta3}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label={pregunta3}

                                                >
                                                    <MenuItem value={'A'}>{respuestaA3}</MenuItem>
                                                    <MenuItem value={'B'}>{respuestaB3}</MenuItem>
                                                    <MenuItem value={'C'}>{respuestaC3}</MenuItem>
                                                    <MenuItem value={'D'}>{respuestaD3}</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item spacing={2}  xs={12} md={12}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">{pregunta4}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label={pregunta4}

                                                >
                                                    <MenuItem value={'A'}>{respuestaA4}</MenuItem>
                                                    <MenuItem value={'B'}>{respuestaB4}</MenuItem>
                                                    <MenuItem value={'C'}>{respuestaC4}</MenuItem>
                                                    <MenuItem value={'D'}>{respuestaD4}</MenuItem>
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

                    </div>
                </ThemeProvider>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    return withSSRAuth(context)
}

export default Validacion
