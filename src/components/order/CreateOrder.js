import React, {useState} from "react";
import {Order} from "@/lib/orders";
import {fetcher} from "../../utils";
import {useFormik} from "formik";
import useSWR from "swr";
import * as yup from "yup";
import {Styles} from "@/styles/MantenedoresStyle";
import {validationPhoneNumber} from "../../helpers";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    ThemeProvider,
    Tooltip
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {MUItheme} from "@/styles/Themes";

const phoneRegExp = validationPhoneNumber('phone');
const movileRegExp = validationPhoneNumber('cellphone');

const schema = yup.object().shape({
    name: yup.string().required("Por favor introduce un nombre."),
    lastname: yup.string().required("Por favor introduce un apellido."),
    identificaction_type: yup.string().required("Por favor selecciona una identificación."),
    identification: yup.string().required("Por favor introduce identificación.")
        .min(10, "Se necesitan 10 dígitos")
        .max(10, "Se necesitan 10 dígitos"),
    main_cellphone: yup.string()
        .matches(phoneRegExp,  {message: "Ingrese un número válido.", excludeEmptyString: false})
        .required("Por favor introduce un número de teléfono")
        .min(10, "Se necesitan 10 números")
        .max(10, "Se necesitan 10 números"),
    main_phone: yup.string()
        .matches(movileRegExp,  {message: "Ingrese un número válido.", excludeEmptyString: false})
        .required("Por favor introduce un número de teléfono")
        .min(10, "Se necesitan 10 números")
        .max(10, "Se necesitan 10 números"),
    email: yup.string().email("Introduce un email válido").required("Por favor introduce un correo"),

    comments: yup.string().required("Por favor escribe un comentario."),
    CampaignId: yup.string().required("Por favor selecciona una campaña."),
    sale_type: yup.string().required("Por favor selecciona una tipo de venta."),
    SourceId: yup.string().required("Por favor selecciona una origen."),
    //SaleTypeId: yup.string().required("Por favor selecciona una tipo."),
    //celular: Yup.string().matches(phoneRegExp, 'Por favor introduce un número válido.'),
});

const CreateOrder  = () => {

    const classes = Styles();
    const {data: origins} = useSWR(`/back-obo/source`, fetcher);
    const {data: sales} = useSWR(`/back-obo/salestype`, fetcher);
    const [modal, setModal] = useState(false);
    const [origenSeleccionado, setOrigenSeleccionado] = useState(null);
    let dataTest = null;
    const {data: dataSourceCampain} = useSWR(`/back-obo/campaigns/source/${origenSeleccionado}`, fetcher);
    const [processing, setProcessing] = useState(false);


    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        formik.resetForm();
        setProcessing(false);
        setModal(false);
    };

    const handleSelectSource = (event) => {
        console.log('Evento', event.target.value)
        setOrigenSeleccionado(event.target.value);
        formik.handleChange();

    }

    const handleSetSource = ({source}) => {
        console.log("datos functions", source)
        dataTest = source;
        setOrigenSeleccionado(source);
    }

    const onSubmit = async (data) => {

        console.log('Si entro alsubmit', data);

        try {
            setProcessing(true);
            await Order.create(JSON.stringify(data));
            //mutateIndex('/orders');
            handleClose();
        } catch (error) {
            setProcessing(true);
            handleClose();
            console.error('Error:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            lastname: "",
            identification: "",
            identificaction_type: "",
            main_cellphone: "",
            main_phone: "",
            email: '',

            status: 1,
            //auto: 0,
            comments: "",
            CampaignId: "",
            SourceId: "",
            sale_type: "",
            //SaleTypeId: "",

            ChannelId: 1,
            //CallCenterId: 3,
            //UserId: 77,
            
            //created_date: "2022-07-26T00:00:00.000Z",
            created_date: "2022-09-20T20:43:29.645Z",
            //assigned_user_id: 77, //de que es?
            source_user_id: 76
        },
        //validate: values => {console.log(values)},
        validationSchema: schema,
        onSubmit: values => onSubmit(values)
    });


    if(!sales) return "Cargando.."
    if(!origins) return "Cargando.."
    if(!dataSourceCampain) return "Cargando.."

    console.log('Chis tirs', dataSourceCampain);

    return (
        <div>
            <Tooltip className={classes.fixed} title="Nuevo" aria-label="add">
                <Fab onClick={handleOpen}>
                    <AddIcon />
                </Fab>
            </Tooltip>


            <ThemeProvider theme={MUItheme}>
                <Dialog  open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'lg'} disableEnforceFocus>
                <form onSubmit={formik.handleSubmit} >
                    <DialogContent sx={{ padding: theme => `${theme.spacing(0,0,0,0)} !important` }}>

                        <DialogContent  style={{backgroundColor: '#D3D4D3'}}>

                        <DialogTitle id="form-dialog-title">
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                Crear Pedido Manualmente
                            </Grid>
                        </DialogTitle>

                        <Grid
                            container
                            sx={{ padding: theme => `${theme.spacing(0,11,0,0)} !important` }}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            //style={{backgroundColor: '#D3D4D3'}}//F5F5F5
                        >

                            <Box sx={{ flexGrow: 2 }}>
                                <Grid container spacing={2} justifyContent="center">
                                    <h4>

                                       Campos de orígen

                                    </h4>

                                    <Grid item xs={2}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Orígen</InputLabel>
                                            <Select
                                                disabled={processing}
                                                //autoFocus={true}
                                                //disabled
                                                //className={classes.inputs}
                                                style={{backgroundColor: '#FFFFFF'}}
                                                size="small"
                                                sx={{ mt: 1}}
                                                margin="dense"
                                                labelId="SourceId"
                                                component="select"
                                                id="SourceId"
                                                name="SourceId"
                                                //defaultValue={"Seleccionar"}
                                                //onChange={formik.handleChange}
                                                //onChange={(event)=>handleSelectSource(event)}
                                                //onChange={handleSelectSource && formik.handleChange}
                                                onChange={formik.handleChange}
                                                values={formik.values.SourceId}
                                                //value={age}
                                                label="Origen"
                                                fullWidth
                                            >
                                                {origins?.map((origin) => (
                                                    <MenuItem key={origin.id} value={origin.id} onClick={()=> {handleSetSource({source: origin.id})}}>{origin.name}</MenuItem>
                                                ))}
                                            </Select>
                                            <DialogContentText className={classes.validaciones}>
                                                {formik.touched.SourceId  && formik.errors.SourceId}
                                            </DialogContentText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Campaña</InputLabel>
                                            <Select
                                                disabled={processing}
                                                //autoFocus={true}
                                                //disabled={true}
                                                //className={classes.inputs}
                                                style={{backgroundColor: '#FFFFFF'}}
                                                size="small"
                                                sx={{ mt: 1}}
                                                margin="dense"
                                                labelId="CampaignId"
                                                component="select"
                                                id="CampaignId"
                                                name="CampaignId"
                                                //defaultValue={"Seleccionar"}
                                                onChange={formik.handleChange}
                                                //onChange={(event)=>handleSelectCampaign(event)}
                                                values={formik.values.CampaignId}
                                                //value={age}
                                                label="Campaña"
                                                fullWidth
                                            >
                                                {dataSourceCampain.data?.map((camp) => (
                                                    <MenuItem key={camp.id} value={camp.id}>{camp.name}</MenuItem>
                                                ))}
                                            </Select>
                                            <DialogContentText className={classes.validaciones}>
                                                {formik.touched.CampaignId  && formik.errors.CampaignId}
                                            </DialogContentText>
                                        </FormControl>
                                    </Grid>


                                </Grid>
                            </Box>

                        </Grid>
                        </DialogContent>

                        <br />


                        <Stack direction="row" spacing={2}>
                            {/*Parte izquierda*/}

                            <DialogContent  style={{backgroundColor: '#D3D4D3'}}>

                            <Grid
                                container
                                //sx={{mr: 7}}
                                spacing={3}
                                //sx={{ padding: theme => `${theme.spacing(0,0,0,11)} !important` }}
                            >
                                <Grid item xs={12}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Grid item xs>
                                            <h2>Datos del cliente</h2>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sx={{mt: 0, pt: 0}}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >

                                        <Grid item xs={12} >
                                            <FormControl fullWidth size="small">
                                                <InputLabel sx={{ mt: 1}} id="demo-simple-select-label">Tipo Identificación</InputLabel>
                                                <Select
                                                    disabled={processing}
                                                    size="small"
                                                    style={{backgroundColor: '#FFFFFF'}}
                                                    sx={{ mt: 1}}
                                                    margin="dense"
                                                    //labelId="identificaction_type"
                                                    component="select"
                                                    id="identificaction_type"
                                                    name="identificaction_type"
                                                    //defaultValue={"Seleccionar"}
                                                    onChange={formik.handleChange}
                                                    values={formik.values.identificaction_type}
                                                    label="Tipo de identificación"
                                                    fullWidth
                                                >
                                                    <MenuItem value={"Cedula"}>Cédula</MenuItem>
                                                    <MenuItem value={"Pasaporte"}>Pasaporte</MenuItem>
                                                    <MenuItem value={"Ruc"}>RUC</MenuItem>
                                                </Select>
                                                <DialogContentText className={classes.validaciones}>
                                                    {formik.touched.identificaction_type  && formik.errors.identificaction_type}
                                                </DialogContentText>
                                        </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sx={{mt: 1}}>
                                            <TextField
                                                disabled={processing}
                                                style={{backgroundColor: '#FFFFFF'}}
                                                size="small"
                                                variant="outlined"
                                                margin="dense"
                                                id="main_phone"
                                                name="main_phone"
                                                label="Teléfono"
                                                type="text"
                                                onChange={formik.handleChange}
                                                values={formik.values.main_phone}
                                                fullWidth
                                            />
                                            <DialogContentText className={classes.validaciones}>
                                                {formik.touched.main_phone  && formik.errors.main_phone}
                                            </DialogContentText>
                                        </Grid>

                                        <Grid item xs={12} sx={{mt: 1}}>
                                            <TextField
                                                disabled={processing}
                                                style={{backgroundColor: '#FFFFFF'}}
                                                variant="outlined"
                                                size="small"
                                                margin="dense"
                                                id="name"
                                                name="name"
                                                label="Nombre"
                                                type="text"
                                                onChange={formik.handleChange}
                                                values={formik.values.name}
                                                fullWidth
                                            />
                                            <DialogContentText className={classes.validaciones}>
                                                {formik.touched.name  && formik.errors.name}
                                            </DialogContentText>
                                        </Grid>


                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sx={{mt: 0, pt: 0}}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Grid item xs={12} >
                                            <TextField
                                                disabled={processing}
                                                style={{backgroundColor: '#FFFFFF'}}
                                                size="small"
                                                variant="outlined"
                                                margin="dense"
                                                id="identification"
                                                name="identification"
                                                label="Número de identificación"
                                                type="text"
                                                onChange={formik.handleChange}
                                                values={formik.values.identification}
                                                fullWidth
                                            />
                                            <DialogContentText className={classes.validaciones}>
                                                {formik.touched.identification  && formik.errors.identification}
                                            </DialogContentText>
                                        </Grid>
                                        <Grid item xs={12} sx={{mt: 0.5}}>
                                            <TextField
                                                disabled={processing}
                                                style={{backgroundColor: '#FFFFFF'}}
                                                size="small"
                                                variant="outlined"
                                                margin="dense"
                                                id="main_cellphone"
                                                name="main_cellphone"
                                                label="Celular"
                                                type="text"
                                                onChange={formik.handleChange}
                                                values={formik.values.main_cellphone}
                                                fullWidth
                                            />
                                            <DialogContentText className={classes.validaciones}>
                                                {formik.touched.main_cellphone  && formik.errors.main_cellphone}
                                            </DialogContentText>
                                        </Grid>
                                        <Grid item xs={12} sx={{mt: 1}}>
                                            <TextField
                                                disabled={processing}
                                                style={{backgroundColor: '#FFFFFF'}}
                                                size="small"
                                                variant="outlined"
                                                margin="dense"
                                                id="lastname"
                                                name="lastname"
                                                label="Apellido"
                                                type="text"
                                                onChange={formik.handleChange}
                                                values={formik.values.lastname}
                                                fullWidth
                                            />
                                            <DialogContentText className={classes.validaciones}>
                                                {formik.touched.lastname  && formik.errors.lastname}
                                            </DialogContentText>
                                        </Grid>

                                    </Grid>

                                </Grid>

                                {/*<Grid item xs={12} sx={{mt: 0, pt: 0}}>*/}
                                <Grid item xs={12} sx={{ padding: theme => `${theme.spacing(0,0,0,3)} !important` }}>
                                    <Grid item xs={12}>
                                        <TextField
                                            disabled={processing}
                                            style={{backgroundColor: '#FFFFFF'}}
                                            size="small"
                                            variant="outlined"
                                            margin="dense"
                                            id="comments"
                                            name="comments"
                                            label="Comentarios"
                                            type="text"
                                            onChange={formik.handleChange}
                                            values={formik.values.comments}
                                            fullWidth
                                        />
                                        <DialogContentText className={classes.validaciones}>
                                            {formik.touched.comments  && formik.errors.comments}
                                        </DialogContentText>
                                    </Grid>
                                </Grid>

                            </Grid>

                            </DialogContent>


                            {/*Parte derecha*/}

                            <DialogContent  style={{backgroundColor: '#D3D4D3'}}
                                            sx={{ padding: theme => `${theme.spacing(0,21,5,3)} !important` }}
                            >

                            <Grid
                                container
                                spacing={3}
                                sx={{mt: 0}}
                            >
                                <Grid item xs={12}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >

                                        <Grid item xs>
                                            <h2>Datos del pedido</h2>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sx={{mt: 0, pt: 0}}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Grid item xs={12} sx={{mt: 0, pt: 0}}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel id="demo-simple-select-label">Tipo de venta</InputLabel>
                                                <Select
                                                    disabled={processing}
                                                    //disabled={true}
                                                    //autoFocus={true}
                                                    style={{backgroundColor: '#FFFFFF'}}
                                                    size="small"
                                                    margin="dense"
                                                    labelId="sale_type"
                                                    component="select"
                                                    id="sale_type"
                                                    name="sale_type"
                                                    //defaultValue={"Seleccionar"}
                                                    onChange={formik.handleChange}
                                                    values={formik.values.sale_type}
                                                    //values={null}
                                                    label="Tipo de Venta"
                                                    fullWidth
                                                >
                                                    {sales?.map((sale) => (
                                                        <MenuItem key={sale.id} value={sale.id}>{sale.description}</MenuItem>
                                                    ))}
                                                </Select>
                                                <DialogContentText className={classes.validaciones}>
                                                    {formik.touched.sale_type  && formik.errors.sale_type}
                                                </DialogContentText>
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sx={{ padding: theme => `${theme.spacing(1,0,0,3)} !important` }}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="left"
                                        alignItems="left"
                                    >
                                        <Grid container spacing={0}>
                                            <Grid item xs={6} sx={{ padding: theme => `${theme.spacing(0,0,0,0)} !important` }}>
                                                <TextField
                                                    disabled={true}
                                                    style={{backgroundColor: '#FFFFFF'}}
                                                    size="small"
                                                    variant="outlined"
                                                    margin="dense"
                                                    id="equipo"
                                                    name="equipo"
                                                    label="Equipo solicitado"
                                                    type="text"
                                                    //onChange={formik.handleChange}
                                                    //values={formik.values.equipo}
                                                    values={null}
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={6} sx={{ padding: theme => `${theme.spacing(1,0,0,2)} !important` }}>
                                                <FormControl fullWidth size="small">
                                                    <InputLabel id="demo-simple-select-label">Plan solicitado</InputLabel>
                                                    <Select
                                                        style={{backgroundColor: '#FFFFFF'}}
                                                        //autoFocus={true}
                                                        disabled={true}
                                                        size="small"
                                                        //sx={{ mb: 3}}
                                                        //sx={{ mt: 1}}
                                                        margin="dense"
                                                        labelId="plan_solicitado"
                                                        component="select"
                                                        id="plan_solicitado"
                                                        name="plan_solicitado"
                                                        //defaultValue={"Seleccionar"}
                                                        onChange={formik.handleChange}
                                                        //values={formik.values.plan}
                                                        values={null}
                                                        label="Plan solicitado"
                                                        fullWidth
                                                    >
                                                        <MenuItem value={null}>Plan 1</MenuItem>
                                                        <MenuItem value={null}>Plan 2</MenuItem>
                                                    </Select>
                                                    {/*<DialogContentText color="secondary">*/}
                                                    {/*    {formik.errors.plan}*/}
                                                    {/*    {formik.touched.plan}*/}
                                                    {/*</DialogContentText>*/}
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sx={{ padding: theme => `${theme.spacing(0,0,0,0)} !important` }}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >

                                        <Grid
                                            container
                                            spacing={0}
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Grid
                                                container
                                                spacing={0}
                                                direction="row"
                                                justifyContent="left"
                                                alignItems="left"
                                                sx={{ padding: theme => `${theme.spacing(0,0,0,3)} !important` }}
                                            >
                                                <Grid item xs={6} sx={{ padding: theme => `${theme.spacing(0,0,0,0)} !important` }}>
                                                    <TextField
                                                        disabled={true}
                                                        size="small"
                                                        //variant="outlined"
                                                        variant="filled"
                                                        margin="dense"
                                                        id="promocion"
                                                        name="promocion"
                                                        label="Promoción"
                                                        type="text"
                                                        //onChange={formik.handleChange}
                                                        //values={formik.values.promocion}
                                                        values={null}
                                                        fullWidth
                                                    />
                                                    {/*<DialogContentText color="secondary">*/}
                                                    {/*    {formik.errors.promocion}*/}
                                                    {/*    {formik.touched.promocion}*/}
                                                    {/*</DialogContentText>*/}
                                                </Grid>
                                            </Grid>

                                            <Grid
                                                container
                                                spacing={0}
                                                direction="row"
                                                justifyContent="left"
                                                alignItems="left"
                                                sx={{ padding: theme => `${theme.spacing(0,0,0,3)} !important` }}
                                            >
                                            <Grid item xs={6} sx={{ padding: theme => `${theme.spacing(0,0,0,0)} !important` }}>
                                                <TextField
                                                    disabled={true}
                                                    size="small"
                                                    //variant="outlined"
                                                    variant="filled"
                                                    margin="dense"
                                                    id="stock"
                                                    name="stock"
                                                    label="Stock"
                                                    type="text"
                                                    //onChange={formik.handleChange}
                                                    //values={formik.values.stock}
                                                    values={null}
                                                    fullWidth
                                                />
                                                {/*<DialogContentText color="secondary">*/}
                                                {/*    {formik.errors.stock}*/}
                                                {/*    {formik.touched.stock}*/}
                                                {/*</DialogContentText>*/}
                                            </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            </DialogContent>


                        </Stack>

                    </DialogContent>
                    <DialogActions>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mb: 3 }}
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
                                    Crear
                                </Button>
                                {processing && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                            <Button
                                disabled={processing}
                                onClick={handleClose}
                                //fullWidth
                                size="medium"
                                variant="outlined"
                            >
                                Cerrar
                            </Button>
                        </Grid>

                    </DialogActions>
                </form>

            </Dialog>
            </ThemeProvider>
        </div>
    );
};

export default CreateOrder;