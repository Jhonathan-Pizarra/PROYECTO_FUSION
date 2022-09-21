import {withSSRAuth} from "@/hocs/withSSRAuth";
import {useRouter} from 'next/router';
import useSWR from "swr";
import {fetcher} from "../../../../utils";
import {
    Button,
     DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    ThemeProvider
} from "@mui/material";
import React, {useState} from "react";
import * as yup from "yup";
import {Styles} from "@/styles/MantenedoresStyle";
import {useFormik} from "formik";
import {v4 as uuidv4} from "uuid";
import SaveSale from "@/components/saleType/complements/SaveSales";
import BuildIcon from "@mui/icons-material/Build";
import {MUItheme} from "@/styles/Themes";
import UpdateClientForm from "@/components/order/salesOrder/UpdateClientForm";
import CreateSaleForm from "@/components/order/salesOrder/CreateSaleForm";
import CloseSaleForm from "@/components/order/salesOrder/CloseSaleForm";
import {Sale} from "@/lib/sale";
import Swal from "sweetalert2";

const validatePedidoForm = yup.object({
    cart_products: yup.array()
        .of(
        yup.object().shape({
            cellphone_model: yup.string().required("Ingrese el mdoelo de celular"),
            plan_cellphone: yup.string().required("Ingrese el plan celular"),
            cellphone_number_tram: yup.string().required("Ingrese la linea a tramitar"),
            method_payment_comment: yup.string().required("Ingrese el metodo de pago")
        }))
        .required('Campo requerido')
        .min(1, 'Minimo 1 producto'),
    comments: yup.string().required("Ingrese el comentario")
})

const FormSale = () => {

    const classes = Styles();
    const [confirmSale, setConfirmSale] = useState(false);
    const [mustEnable] = useState(false);
    const router = useRouter();
    const {id, sale, edit } =  router.query;
    const {data: order} = useSWR(`/back-obo/orders/${id}`, fetcher);


    const dataToUpdate = !sale ? sale : JSON.parse(sale);
    const valuesForm = !edit ? router.query : {
        description: dataToUpdate?.SaleType?.description,
        cellphone: dataToUpdate?.SaleType?.contains_cellphone_model,
        plan: dataToUpdate?.SaleType?.contains_plan_cellphone,
        saleTypeId: dataToUpdate?.SaleTypeId
    }

    const formikSales = useFormik({
        initialValues: {
            OrderId: dataToUpdate?.OrderId || order?.id,
            ClientId:  dataToUpdate?.ClientId || order?.ClientId,
            SaleTypeId: dataToUpdate?.SaleTypeId || +valuesForm.saleTypeId,
            CampaignId: dataToUpdate?.CampaignId ||order?.CampaignId,
            cart_products: dataToUpdate?.ProductsCarts.map(product => ({
                ...product,
                uuid: product.id
            })) || [
                {
                    uuid: uuidv4(),
                    cellphone_model: "",
                    plan_cellphone: "",
                    cellphone_number_tram: "",
                    method_payment_comment: "",
                    icc: "123123",
                    imei: "123123"
                }
            ],
            comments: dataToUpdate?.comments || ''
        },
        validationSchema: validatePedidoForm,
        onSubmit: () => setConfirmSale(true),
    });

    const handleModalChu = ({onSuccess}) => {
        Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: 'Se creó exitoso!',
            showClass:`${classes.myswal}`
        }).then(result => {

            if(result.isConfirmed) onSuccess();

        })
    }

    //TODO: Quitar luego
    if (!order) return 'Cargado..';

    return (
            <div>
                <SaveSale  confirmSale={confirmSale} onAccept={ () =>  dataToUpdate ? onSubmitUpdate({ values: formikSales.values, dataToUpdate, handleModalChu, setConfirmSale, router, id: order.id }) : onSubmitCreate({values: formikSales.values, handleModalChu, setConfirmSale, router, id: order.id }) } onCancel={() => setConfirmSale(false)} />
                <form id="form-sales" onSubmit={formikSales.handleSubmit}/>
                <ThemeProvider theme={MUItheme}>
                    <div  aria-labelledby="form-dialog-title">
                        <DialogContent>
                            <DialogTitle id="form-dialog-title">
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    {valuesForm.description}
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
                            <UpdateClientForm order={order} mustEnable={mustEnable} letUpdateClient={dataToUpdate ? true : false}/>
                            <CreateSaleForm order={order} mustEnable={mustEnable} cellphone={valuesForm.cellphone} plan={valuesForm.plan} formikSales={formikSales} dataToUpdate={dataToUpdate}/>
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
                                                //onClick={handleModalChu}
                                            >
                                                Guardar Venta
                                            </Button>
                                        </div>

                                    </Grid>

                                </DialogActions>
                            </Grid>
                        </DialogContent>

                    </div>
                </ThemeProvider>
            </div>
    );
}

async function onSubmitCreate({values, handleModalChu, setConfirmSale, router, id}) {
    try {
        setConfirmSale(false);
        await Sale.create(JSON.stringify(values));
        handleModalChu({onSuccess: () => router.push(`/pedidos/${id}`) })
    } catch (error) {
        console.error('Error:', error);
    }
}

async function onSubmitUpdate({values, dataToUpdate, handleModalChu, setConfirmSale, router, id}) {
    try {
        setConfirmSale(false);
        await Sale.update(dataToUpdate.id, JSON.stringify(values));
        handleModalChu({onSuccess: () => router.push(`/pedidos/${id}`) })
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getServerSideProps(context) {
    return withSSRAuth(context)
}

export default FormSale
