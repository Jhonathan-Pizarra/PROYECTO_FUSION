import React from "react";
import {Styles} from "@/styles/MantenedoresStyle";
import {DialogContent, Grid, IconButton, InputLabel, TextField, ThemeProvider} from "@mui/material";
import {MUItheme} from "@/styles/Themes";
import Stack from "@mui/material/Stack";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper';
import {v4 as uuidv4} from 'uuid';

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import AutoCompleteInput from "@/components/saleType/complements/AutoCompleteInput";

const CreateSaleForm = ({order, plan, cellphone, formikSales}) => {

    const {values, setValues, touched, errors } = formikSales;
    const products = formikSales.values.cart_products;
    const classes = Styles();

    console.log('Albert',formikSales)

    const addProduct = () => {
      setValues({
        ...values,
        cart_products:
        [...values.cart_products,
          {
            uuid: uuidv4(),
            cellphone_model: "",
            plan_cellphone: "",
            cellphone_number_tram: "",
            method_payment_comment: "",
            icc: "123123",
            imei: "123123"
          }
        ]
      })
    }

    const deleteProduct = ({ uuid }) => {
      setValues({
        ...values,
        cart_products: values.cart_products.filter((product) => product.uuid !== uuid)
      })
    }

    const editProduct = (event, indexProduct) =>{
        values.cart_products[indexProduct][event.target.name] = event.target.value;

        setValues(values);
    }

    if (!order) return 'Cargando...';

    return (
        <ThemeProvider theme={MUItheme}>
            <DialogContent>
                <div style={{width: "100%"}}>
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                        <ShoppingCartIcon style={{fontSize: 48, marginRight: "1.5vw"}}/>
                        <h2>Productos</h2>
                    </Grid>

                    <Grid container direction="row" justifyContent="center" alignItems="center" padding={3}
                          style={{backgroundColor: '#f5f5f5'}} borderRadius={5}>
                        <div style={{width: "85%", textAlign:"center"}}>
                        <Grid item xs={12}>
                            <Swiper style={{
                                justifyContent: 'center',
                                width: "100%",
                                margin: '0 1vw ',
                                backgroundColor: '#f5f5f5'
                            }} navigation={true} modules={[Navigation]} className={classes.swip} slidesPerView={2}
                                    spaceBetween={0}>
                                {
                                    products.reverse().map((product, index) => (
                                        <SwiperSlide key={index} style={{display: 'flex', justifyContent: 'center'}}>
                                            <CardPedido
                                                cellphone={`${cellphone}`}
                                                plan={`${plan}`}
                                                indexProduct={index + 1}
                                                deleteProduct={deleteProduct}
                                                product={product}
                                                addProduct={addProduct}
                                                formikSales={formikSales}
                                                handleChange={editProduct}
                                                showDelete={products.length > 1}
                                                showAdd={products.length-1 === index}
                                                validateError={touched.cart_products && Boolean(errors.cart_products)}
                                            />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </Grid>
                        </div>
                    </Grid>

                </div>
            </DialogContent>
        </ThemeProvider>
    );
};

export default CreateSaleForm;

const CardPedido = ({
  indexProduct,
  product,
  plan,
  cellphone,
  deleteProduct,
  addProduct,
  handleChange,
  showDelete = false,
  showAdd = false,
  validateError = false
}) => {

    const errors = validateErrorForm({ product });

    return (
        <Stack direction={{xs: 'column', sm: 'column', lg: 'row'}} style={{maxWidth: "500px"}}>
            <Grid container alignItems='end' padding={5} marginY={1} borderRadius={5}
                  style={{backgroundColor: '#E5E5E5'}}>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                    <Grid item xs={6}>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                            <h3>Producto {indexProduct}</h3>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                            {
                              showDelete &&
                              <IconButton type="button" aria-label="remove" style={{backgroundColor: "#E63780"}}
                                          onClick={() => deleteProduct({uuid: product.uuid})}>
                                  <RemoveIcon style={{color: "#FFFFFF"}}/>
                              </IconButton>
                            }
                            {
                              showAdd &&
                              <IconButton type="button" aria-label="add"
                                          style={{backgroundColor: "#11cb5f", marginLeft: "1vw"}}
                                          onClick={addProduct}>
                                  <AddIcon style={{color: "#FFFFFF"}}/>
                              </IconButton>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                {((cellphone === '1') && (plan === '0')) && <>
                    <Grid item xs={12}>
                        <InputLabel htmlFor="filled-adornment-amount">Modelo Celular</InputLabel>
                        <AutoCompleteInput handleInput={handleChange} indexProduct={indexProduct} id={'cellphone_model'} url='https://1r1hpx7qw6.execute-api.us-east-1.amazonaws.com/dev/equipment' dataType='tradename'></AutoCompleteInput>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel htmlFor="filled-adornment-amount"><strong>Promoción</strong> :
                            Upsell</InputLabel>
                        <br/>
                    </Grid>
                </>
                }
                {((plan === '1') && (cellphone === '0')) &&
                    <Grid item xs={12}>
                        <InputLabel htmlFor="filled-adornment-amount">Plan de Celular</InputLabel>
                        <AutoCompleteInput handleInput={handleChange} indexProduct={indexProduct} id={'plan_cellphone'}></AutoCompleteInput>
                    </Grid>
                }

                {((cellphone === '1') && (plan === '1')) && <>
                    <Grid item xs={12}>
                        <InputLabel htmlFor="filled-adornment-amount">Modelo Celular</InputLabel>
                        <AutoCompleteInput handleInput={handleChange} indexProduct={indexProduct} id={'cellphone_model'} url='https://1r1hpx7qw6.execute-api.us-east-1.amazonaws.com/dev/equipment' dataType='tradename'></AutoCompleteInput>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel htmlFor="filled-adornment-amount"><strong>Promoción</strong>: Upsell</InputLabel>
                        <br/>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel htmlFor="filled-adornment-amount">Plan de Celular</InputLabel>
                        <AutoCompleteInput handleInput={handleChange} indexProduct={indexProduct} id={'plan_cellphone'} ></AutoCompleteInput>
                    </Grid>
                </>
                }
                <Grid item xs={12}>
                    <InputLabel htmlFor="filled-adornment-amount">Línea a tramitar</InputLabel>
                    <TextField
                        style={{backgroundColor: '#FFFFFF'}}
                        size="small"
                        variant="outlined"
                        margin="dense"
                        id="cellphone_number_tram"
                        name="cellphone_number_tram"
                        type="number"
                        onChange={(event) => handleChange(event, indexProduct-1)}
                        value={product.cellphone_number_tram}
                        values={product.cellphone_number_tram}
                        error={validateError && Boolean(errors.cellphone_number_tram)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel htmlFor="filled-adornment-amount">Forma de pago</InputLabel>
                    <TextField
                        style={{backgroundColor: '#FFFFFF'}}
                        id="method_payment_comment"
                        name="method_payment_comment"
                        multiline
                        rows={4}
                        onChange={(event) => handleChange(event, indexProduct-1)}
                        value={product.method_payment_comment}
                        values={product.method_payment_comment}
                        error={validateError && Boolean(errors.method_payment_comment)}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </Stack>
    );
};

function validateErrorForm({product}) {
    return {
      cellphone_model: product.cellphone_model === '',
      plan_cellphone: product.plan_cellphone === '',
      cellphone_number_tram: product.cellphone_number_tram === '',
      method_payment_comment: product.method_payment_comment === '',
    }
}