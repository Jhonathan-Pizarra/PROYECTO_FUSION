import React, {useState} from "react";
import {Styles} from "@/styles/MantenedoresStyle";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, IconButton,
    ThemeProvider,
} from "@mui/material";
import {MUItheme} from "@/styles/Themes";
import CreateSaleForm from "@/components/order/salesOrder/CreateSaleForm";
import UpdateClientForm from "@/components/order/salesOrder/UpdateClientForm";
import CloseSaleForm from "@/components/order/salesOrder/CloseSaleForm";
import {useFormik} from "formik";
import {Sale} from "@/lib/sale";
import SaveSale from "@/components/saleType/complements/SaveSales";
import * as yup from "yup";
import {v4 as uuidv4} from "uuid";
import Routes from "@/constants/routes";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import BuildIcon from "@mui/icons-material/Build";

const validatePedidoForm = yup.object({
    cart_products: yup.array().of(
        yup.object().shape({
            cellphone_model: yup.string().required("Ingrese el mdoelo de celular"),
            plan_cellphone: yup.string().required("Ingrese el plan celular"),
            cellphone_number_tram: yup.string().required("Ingrese la linea a tramitar"),
            method_payment_comment: yup.string().required("Ingrese el metodo de pago")
        }))
        .required('Campo requerido')
        .min(1, 'MMinimo 1 producto'),
    comments: yup.string().required("Ingrese el comentario")
})

const FormSale = ({order, plan, cellphone, description, mustEnable, saleTypeId, dataToUpdate, letUpdateClient }) => {

    const classes = Styles();
    const [modal, setModal] = useState(true);
    const [confirmSale, setConfirmSale] = useState(false);

    console.log('Rufles', getInitialValues({order, dataToUpdate, saleTypeId}) );
    const handleModalChu = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            showClass:`${classes.myswal}`
            //html:  `<input id="swal-input1" class=${classes.myswal}>`,
            //customClass: `${classes.myswal}`
            //zIndex: `${1000} !important`,
        }).then(r => console.log(r))
    }


    const formikSales = useFormik({
        initialValues: getInitialValues({order, dataToUpdate, saleTypeId}),
        validationSchema: validatePedidoForm,
        onSubmit: () => setConfirmSale(true),
    });

    const handleClose = () => {
        setModal(false);
    };

    const handleCloseModal = () => {
        setConfirmSale(false);
    }

    //TODO: Quitar luego
    if (!order) return 'Cargado..';
    if (!saleTypeId) return 'Cargado..';

    return (
        <div>
            { confirmSale && <SaveSale handleCloseModal={handleCloseModal} orderId={order.id} promiseFunction={ () =>  dataToUpdate ? onSubmitUpdate({ values: formikSales.values, dataToUpdate }) : onSubmitCreate({values: formikSales.values }) } /> }
            <Grid item xs={3} paddingBottom={1}>
                <Button variant="contained" type="button" onClick={handleModalChu} startIcon={<BuildIcon />}>
                    Modal
                </Button>
            </Grid>
            <form id="form-sales" onSubmit={formikSales.handleSubmit}/>
            <ThemeProvider theme={MUItheme}>
                <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen
                        disableEnforceFocus>
                    <DialogContent>
                        <DialogTitle id="form-dialog-title">
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                {description}
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
                        <UpdateClientForm order={order} mustEnable={mustEnable} letUpdateClient={letUpdateClient}/>
                        <CreateSaleForm order={order} mustEnable={mustEnable} cellphone={cellphone} plan={plan} formikSales={formikSales} dataToUpdate={dataToUpdate}/>
                        <CloseSaleForm order={order} mustEnable={mustEnable} formikSales={formikSales} dataToUpdate={dataToUpdate}/>
                        <Grid item xs={12} sx={{mb: 0}}>
                            <DialogActions>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{mb: 3}}
                                >
                                    <div className={classes.wrapper}>
                                        <Button
                                            className={classes.create}
                                            variant='contained'
                                            type="submit"
                                            size="medium"
                                            form="form-sales"
                                            // onClick={handleSale}
                                        >
                                            Guardar Venta
                                        </Button>
                                    </div>

                                </Grid>

                            </DialogActions>
                        </Grid>
                    </DialogContent>

                </Dialog>
            </ThemeProvider>
        </div>
    );
};

export default FormSale;

async function onSubmitCreate({values}) {
    try {
        console.log('Entró?', values);
        await Sale.create(JSON.stringify(values));
        alert('Se creó!');
    } catch (error) {
        console.error('Error:', error);
    }
}

async function onSubmitUpdate({values, dataToUpdate}) {
    try {
        console.log('Entró? Update:', values);
        await Sale.update(dataToUpdate.id, JSON.stringify(values));
        //await Sale.create(JSON.stringify(values));
        alert('Se modifcó!');
    } catch (error) {
        console.error('Error:', error);
    }
}

function getInitialValues({order, dataToUpdate, saleTypeId}) {
    return {
        OrderId: dataToUpdate?.OrderId || order?.id,
        ClientId:  dataToUpdate?.ClientId || order?.ClientId,
        SaleTypeId: dataToUpdate?.SaleTypeId || +saleTypeId,
        CampaignId: dataToUpdate?.CampaignId ||order?.CampaignId,
        cart_products: dataToUpdate?.ProductsCarts || [
            {
                id: uuidv4(),
                cellphone_model: "",
                plan_cellphone: "",
                cellphone_number_tram: "",
                method_payment_comment: "",
                icc: "123123",
                imei: "123123"
            }
        ],
        comments: dataToUpdate?.comments || ''
    }
}