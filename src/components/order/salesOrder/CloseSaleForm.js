import React from "react";
import { Grid, InputLabel, TextField, ThemeProvider } from "@mui/material";
import {MUItheme} from "@/styles/Themes";
import Stack from "@mui/material/Stack";
import ReceiptIcon from '@mui/icons-material/Receipt';

const valueDefault = "" +
    "Yo Johny Ango en representación de Movistar-Otecel S.A ubicada en Quito-Ecopark, " +
    "solicito a usted movistar con CI  me confirme la aceptación de activación del plan _______ " +
    "que genera una facturación mensual de $____ incluido IVA más $1 dólar por el seguro de desgravamen " +
    "que cubrirá el valor de su equipo por muerte o accidente grave que lo imposibilite a usted de trabajar de forma normal " +
    " y poder disfrutar de los beneficios mencionados? Si está de acuerdo por favor diga “SI”";

const CloseSaleForm = ({order, formikSales}) => {

    const { handleChange, values, touched, errors } = formikSales;

    if (!order) return 'Cargando...';

    return (
        <ThemeProvider theme={MUItheme}>
            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{padding: theme => `${theme.spacing(5, 5, 5, 5)} !important`}}>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                    <ReceiptIcon style={{fontSize: 48, marginRight: "1.5vw"}}/>
                    <h2>Cierre de venta</h2>
                </Grid>
                <Stack direction={{xs: 'row', sm: 'column', lg: 'row'}} minWidth={1200} style={{width: "100%"}}>
                    <Grid item xs={12} sx={{mb: 0}}>
                        <Stack direction={{xs: 'column', sm: 'column', lg: 'row'}}>
                            <Grid container alignItems='end' padding={3} marginY={1} borderRadius={5}
                                  style={{backgroundColor: '#f5f5f5'}}>
                                <Grid item xs={12}>
                                    <InputLabel htmlFor="filled-adornment-amount">Comentario
                                        BackOffice</InputLabel>
                                    <TextField
                                        style={{backgroundColor: '#FFFFFF'}}
                                        id="comments"
                                        name="comments"
                                        multiline
                                        rows={4}
                                        onChange={handleChange}
                                        values={values.comments}
                                        value={values.comments}
                                        error={touched.comments && Boolean(errors.comments)}
                                        helperText={touched.comments && errors.comments}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel htmlFor="filled-adornment-amount">Forma de pago</InputLabel>
                                    <TextField
                                        style={{backgroundColor: '#FFFFFF'}}
                                        defaultValue={valueDefault}
                                        rows={4}
                                        disabled
                                        multiline
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                </Stack>
            </Grid>
        </ThemeProvider>
    );
};

export default CloseSaleForm;

