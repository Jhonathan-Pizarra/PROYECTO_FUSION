import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Typography from "@mui/material/Typography";
import {CircularProgress, ListItemText, MenuItem} from "@mui/material";
import {useRouter} from "next/router";
import Grid from '@mui/material/Grid';
import {MUItheme} from "@/styles/Themes";
import {Styles} from "@/styles/MantenedoresStyle";
import {SaleType} from "@/lib/salestype";
import {Equifax} from "@/lib/equifax";

export default function ConfirmSale({id, description, isEquifax, cellphone, plan, selectedOrder, saleTypeId}) {
    const [open, setOpen] = useState(false);

    const classes = Styles();
    console.log('Orden llegó;', selectedOrder);//Si
    //console.log('Nmrbe;', selectedOrder.Client.name);//Si
    console.log('Tipo de venta', description);//Si
    console.log('Ubuntu', typeof description);//Si
    console.log('selectedOrder', selectedOrder.Client.identification);//Si


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleValidate = async ()=>{
        if(isEquifax === 1){

            let respuesta = localStorage.getItem(selectedOrder.Client.identification);
            console.log('chicles', respuesta);
            if(!respuesta){
                const apiResponse = await Equifax.create({cedula: selectedOrder.Client.identification});
                respuesta = apiResponse.data;
                console.log('Resp1', apiResponse.status);
                console.log('Resp2', JSON.stringify(respuesta, null, 2));
                if(!respuesta.status){
                    alert(respuesta.message);
                    return;
                }
                localStorage.setItem(selectedOrder.Client.identification, JSON.stringify(respuesta));
            }
            console.log('Qué pasó?', typeof respuesta);
            console.log('Orden;', selectedOrder.Client);
            //console.log('Nombre;', selectedOrder.Client.name); //Si

            router.push({
                pathname: `/pedidos/${selectedOrder.id}/equifax/validacion`,
                query: {description, cellphone, plan, saleTypeId, cedula: selectedOrder.Client.identification}
            }, `/pedidos/${selectedOrder.id}/equifax/validacion`)

            //router.push(Routes.VALIDATION_EQUIFAX);
            //console.log('Si es equifax');
            //setIsSelected(true);
            //setOpen(false);

        }else{
            //console.log('Nombre;', selectedOrder.Client.name);//Si
            router.push({
                pathname: `/pedidos/${selectedOrder.id}/equifax/formulario-ventas`,
                query: {description, cellphone, plan, saleTypeId}
            },`/pedidos/${selectedOrder.id}/equifax/formulario-ventas`)
            //router.push(Routes.FORM_SALES);
            //setIsSelected2(true);
            //setOpen(false);
            //alert('No es exifax');
        }
    }

    return (
        <div>

            {/*{isSelected && <ValidationSales/>}*/}
            {/*{isSelected2 && <FormSales />}*/}

            <MenuItem key={id} onClick={handleOpen}>


                <Grid container sx={{  border: '1px solid #d0d0d0', padding: theme => `${theme.spacing(1,2,1,2)} !important` }}>
                    <ListItemText>{description} &nbsp;</ListItemText>
                    <Typography variant="body2" color="text.secondary">
                        <ArrowForwardIosIcon fontSize="small"  />
                    </Typography>
                </Grid>

            </MenuItem>


            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"¿Estás seguro de que deseas agregar una nueva venta?"}
                </DialogTitle>

                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{  padding: theme => `${theme.spacing(2,2,2,2)} !important` }}
                >

                    <DialogActions>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <div className={classes.wrapper}>
                                <Button
                                    className={classes.create}
                                    variant='contained'
                                    onClick={handleValidate}
                                    size="medium"
                                >
                                    Aceptar
                                </Button>

                            </div>

                            <div className={classes.wrapper}>
                                <Button
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
                </Grid>

            </Dialog>
        </div>
    );
}
