import React, {useState} from "react";
import {fetcher} from "../../../utils";
import useSWR from 'swr';
import {Styles} from "@/styles/MantenedoresStyle";
import {Button, Dialog, DialogContent, DialogTitle, Grid, MenuList, ThemeProvider} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {MUItheme} from "@/styles/Themes";
import ConfirmSale from "@/components/saleType/complements/ConfirmSales";


const SelectSaleType  = ({orderID}) => {


    const [modal, setModal] = useState(false);
    const {data: salesType} = useSWR(`/back-obo/salestype`, fetcher);

    if(!salesType) return 'Cargando...';
    const result = [];

    console.log('tipoventa',salesType);
    console.log('orderCliente?',orderID);

    salesType.forEach((item)=>{
        if(item.status === 1){
            result.push(item);
        }
    })


    console.log('activos',result);

    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        setModal(false);
    };



    return (
        <div>


            <Button variant="contained" startIcon={<AddIcon/>} onClick={handleOpen}>
                Agregar Solicitud
            </Button>

            <ThemeProvider theme={MUItheme}>
                <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" disableEnforceFocus maxWidth={'xs'}>
                    <DialogTitle id="form-dialog-title">
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            Seleccione la transacción
                        </Grid>
                    </DialogTitle>
                    <DialogContent>
                        <MenuList>

                        {result?.map((row) => (
                            <ConfirmSale selectedOrder={orderID} key={row.id} saleTypeId={row.id} description={row.description} isEquifax={row.user_validate} cellphone={row.contains_cellphone_model} plan={row.contains_plan_cellphone}/>
                        ))}

                        </MenuList>


                    </DialogContent>

                </Dialog>
            </ThemeProvider>

        </div>
    );
};

export default SelectSaleType;