import {forwardRef, useState} from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import {FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Paper from '@mui/material/Paper';
import useSWR from "swr";
import {fetcher} from "../../utils";
import {Order} from '@/lib/orders'
import Swal from 'sweetalert2';
import SelectSalesTypes from "@/components/saleType/complements/SelectSalesTypes";


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
const UpdateOrder = ({children,orderData={}}) => {
    const [openGeneral, setOpenGeneral] = useState(false);
    const [openComment, setOpenComment] = useState(false);
    const [commentUser, setCommentUser] = useState('');

    const [opcion1, setOpcion1] = useState("");
    const [opcion2, setOpcion2] = useState("");
    const [opcion3, setOpcion3] = useState("");
    const [opcion4, setOpcion4] = useState("");

    const [dataStates2, setDataStates2] = useState(null);
    const [dataStates3, setDataStates3] = useState(null);
    const [dataStates4, setDataStates4] = useState(null);

    const {data: dataStates1} = useSWR(`/back-obo/tipification?level=1&typification_id=1`, fetcher);
  
    const handleChangeStates = async (event, stateOrigin)=>{
        switch (stateOrigin) {
          case 1:
            setOpcion1(event.target.value)
            setOpcion2("")
            setOpcion3("")
            setOpcion4("")
      
            const {data: rawDataState1} = await fetcher(`/back-obo/tipification?level=2&typification_id=${event.target.value}`)
            setDataStates2(rawDataState1)
          break;

          case 2:
            setOpcion2(event.target.value)
            setOpcion3("")
            setOpcion4("")

            const {data: rawDataState2} = await fetcher(`/back-obo/tipification?level=3&typification_id=${event.target.value}`)
            setDataStates3(rawDataState2)
          break;
        
          case 3:
            setOpcion3(event.target.value)
            setOpcion4("")

            const {data: rawDataState3} = await fetcher(`/back-obo/tipification?level=4&typification_id=${event.target.value}`)
            setDataStates4(rawDataState3)
          break;

          case 4:
            setOpcion4(event.target.value)
          break;

          default:
            break;
        }
    }
    const handleUpdateOrder = async () => {
      if (opcion4 != null) {
        if (commentUser.length < 2) {
          setCommentUser('No se ingreso comentario')
        }
        try {
          const sendOrder = await Order.update(orderData?.id,{
            'status':1,
            'status_id_1':opcion1,
            'status_id_2':opcion2,
            'status_id_3':opcion3,
            'status_id_4':opcion4,
            'comments':commentUser
          })
          handleClose()
          handleToggleComment()
          setCommentUser('')
          setTimeout(() => {
            Swal.fire({
              icon: 'success',
              title: 'Pedido '+orderData?.id,
              text: 'El pedido ha sido actuallizado correctamente!',
              footer: 'Gracias',
            })
          }, 500);
        } catch (error) {
          handleClose()
          handleToggleComment()
          setTimeout(() => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo paso con el pedido intentalo mas tarde!',
              footer: 'Espera un momento',
            })
          }, 500);
          console.log(error)
        }

      }
    };

    const handleToggleComment = () => {
      setOpenComment(!openComment)
    };

    const handleClickOpen = () => {
      setOpenGeneral(true);
      if (orderData.AssignedTypings.length >0) {
      const fetchData1 = fetcher(`/back-obo/tipification?level=2&typification_id=${orderData.AssignedTypings[0].tipificacion_id_1}`)
      const fetchData2 = fetcher(`/back-obo/tipification?level=3&typification_id=${orderData.AssignedTypings[0].tipificacion_id_2}`)
      const fetchData3 = fetcher(`/back-obo/tipification?level=4&typification_id=${orderData.AssignedTypings[0].tipificacion_id_3}`)
      const fetchAllStates = [fetchData1,fetchData2,fetchData3]
      Promise.allSettled(fetchAllStates)
      .then((results => {

        if (results[0].status === "fulfilled" && results[1].status === "fulfilled" && results[2].status === "fulfilled") {
          setOpcion1(orderData.AssignedTypings[0].tipificacion_id_1)
          setOpcion2(orderData.AssignedTypings[0].tipificacion_id_2)
          setOpcion3(orderData.AssignedTypings[0].tipificacion_id_3)
          setOpcion4(orderData.AssignedTypings[0].tipificacion_id_4)

          setDataStates2(results[0].value.data)
          setDataStates3(results[1].value.data)
          setDataStates4(results[2].value.data)

        }
      }))
      .catch(error => console.log(error))
        
      }
    };

    const handleClose = () => {
      setOpenGeneral(false);
      setOpcion1("")
      setOpcion2("")
      setOpcion3("")
      setOpcion4("")
    };
  return (
    <>
    <Button variant="outlined" onClick={handleClickOpen}>
        {children}
    </Button>
    <Dialog fullScreen open={openGeneral} onClose={handleClose} TransitionComponent={Transition}>
    
    
      <Container>
      <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
        <CloseIcon />
      </IconButton>
        <Grid container spacing={1} justifyContent={'center'} style={{margin:'0.7rem 0 0.7rem 0'}}>
          <Typography variant="h4" gutterBottom color={'#019DF4'}>
             Información del pedido {orderData.id}
          </Typography>
            
        </Grid>
        <Stack spacing={2} direction={{ xs: 'column', sm: 'column',lg:'row'}}>
          <Grid container  spacing={1} padding={2} marginY={1} borderRadius={5} style={{backgroundColor:'#f5f5f5'}}>
              <Grid item xs={12} md={5}>
                <Typography variant="h6"  >
                  Datos del cliente:
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" gutterBottom>
                  Solicitud
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button variant="contained" startIcon={<ContactPhoneIcon></ContactPhoneIcon>}>Ver oferta</Button>
              </Grid>
              <Grid item xs={5} md={5} >
                <TextField
                  helperText="Fecha de ingreso"
                  id="fechaIn"
                  value={orderData?.createdAt}
                />
              </Grid>
              <Grid item xs={3} md={7}>
                <TextField
                    helperText="Fecha de la campaña"
                    id="fechaIn"
                    value={orderData?.Campaign?.createdAt}
                  />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                    helperText="Nombre"
                    id="nombre"
                    value={orderData?.Client?.name}

                  />
              </Grid>
              <Grid item xs={3} md={4}>
                <TextField
                    helperText="Producto"
                    id="producto"
                    label="Producto"
                  />
              </Grid>
              <Grid item xs={3} md={4}>
                <TextField
                    helperText="Origen"
                    id="fechaIn"
                    label="Origen"
                  />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                    helperText="Celular"
                    id="celular"
                    value={orderData?.Client?.main_cellphone}
                  />
              </Grid>
              <Grid item xs={6} md={8}>
                <TextField
                    helperText="Plan solicitado"
                    id="plansoli"
                    label="Plan solicitado"
                    value={orderData?.Client?.plan_cellphone}

                  />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                    helperText="Número de documento"
                    id="ndocumento"
                    value={orderData?.Client?.identification}
                  />
              </Grid>
              <Grid item xs={6} md={8}>
                <TextField
                    helperText="Equipo solicitado"
                    id="equiposol"
                    label="Equipo solicitado"
                    value={orderData?.Client?.cellphone_model}
                    
                  />
              </Grid>
          </Grid>
          <Grid container spacing={1} padding={2} marginY={2} borderRadius={5} style={{backgroundColor:'#f5f5f5'}} >
              <Grid item xs={12} md={10}>
                <Typography variant="h6"  >
                  Información del cliente:
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                    helperText="Tipo de cliente"
                    id="tipocliente"
                    label="Tipo de cliente"
                  />
              </Grid>
              <Grid item xs={6} md={8}>
                <TextField
                    helperText="Límite de crédito"
                    id="limitecredito"
                    label="Límite de crédito"
                    
                  />
              </Grid>
          </Grid>
        </Stack>
        <Stack spacing={2} direction="row">
          <Grid container spacing={1} padding={2} marginY={2} borderRadius={5} >
              <Grid item xs={12} md={8} lg={6}>
                <Typography variant="h6"  >
                  Información del cliente:
                </Typography>
                <Stack direction={'row'} spacing={3} marginY={2}>
                <Button variant="contained" startIcon={<AddIcon></AddIcon>}>Gestiones realizadas 20</Button>
                {/* <Button variant="contained" startIcon={<AddIcon></AddIcon>}>Agregar solicitud</Button>
                 */}
                 <SelectSalesTypes></SelectSalesTypes>
                </Stack>


              </Grid>
          </Grid>
        </Stack>
      </Container>

      <Stack bgcolor={'#f5f5f5'} padding="1rem" marginTop={'2rem'}>
        <Container>
          <Grid container spacing={1} alignItems='center' justifyContent={'center'}>
            
            <Grid item xs={12} md={5} lg={3}>
              <Stack direction="row" spacing={2} alignItems='center'>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Estado 1</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="state1"
                  value={opcion1}
                  label="Estado 1"
                  onChange={(event)=>handleChangeStates(event,1)}
                >
                  {
                    dataStates1?.data?.rows?.map(response => (
                      <MenuItem key={response?.id} value={response?.id}>{response?.description}</MenuItem>
                    ))
                  }
                </Select>
                
                </FormControl>
              </Stack>
            </Grid>
            <Grid item  xs={12} md={5} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="estado2">Estado 2</InputLabel>
                <Select
                  labelId="estado2"
                  id="state2"
                  value={opcion2}
                  label="Estado 2"
                  onChange={(event)=>handleChangeStates(event,2)}
                  disabled={dataStates2 === null}
                >
                  {
                    dataStates2?.rows?.map(response => (
                      <MenuItem key={response?.id} value={response?.id}>{response?.description}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item  xs={12} md={5} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="estado3">Estado 3</InputLabel>
                <Select
                  labelId="estado3"
                  id="state3"
                  value={opcion3}
                  label="Estado 2"
                  onChange={(event)=>handleChangeStates(event,3)}
                  disabled={dataStates3 === null}
                >
                  {
                    dataStates3?.rows?.map(response => (
                      <MenuItem key={response?.id} value={response?.id}>{response?.description}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="motivo">Motivo</InputLabel>
                <Select
                  labelId="motivo"
                  id="motivation"
                  value={opcion4}
                  label="Motivo"
                  onChange={(event)=>handleChangeStates(event,4)}
                  disabled={dataStates4 === null}
                >
                  {
                    dataStates4?.rows?.map(response => (
                      <MenuItem key={response?.id} value={response?.id}>{response?.description}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
      </Stack>
      
      
        <Stack  marginY={3} paddingX={3}>
          <Paper elevation={3}>
            <Grid container spacing={2} padding={2} justifyContent='center'>
                <Grid item xs={6} md={5} lg={3} textAlign='center'>
                  <Typography variant="h6"  >
                  Código de Solicitud
                  </Typography>
                  <Typography variant="subtitle1" >
                    558134
                  </Typography>
                </Grid>
                <Grid item xs={6} md={5} lg={3} textAlign='center'>
                  <Typography variant="h6"  >
                  Detalle de Ingreso
                  </Typography>
                  <Typography variant="subtitle1" color={'#5CB615'} >
                   <a href="#">Gestionar Datos de Servicio</a>
                  </Typography>
                  <Typography variant="subtitle1" color={'#983230'} >
                   <a href="#">Gestionar Datos de Servicio</a>
                  </Typography>
                </Grid>
                <Grid item xs={6} md={5} lg={3} textAlign='center'>
                  <Typography variant="h6"  >
                  Tipo
                  </Typography>
                  <Typography variant="subtitle1"  >
                  Transferencia sin equipo
                  </Typography>
                </Grid>
                <Grid item xs={6} md={5} lg={3} textAlign='center'>
                  <Typography variant="h6"  >
                  Estado Facturación
                  </Typography>
                  <Typography variant="subtitle1"  >
                  GESTIONADO
                  </Typography>
                </Grid>
            </Grid>
          </Paper>
        </Stack>
      <Container>
        <Grid  container spacing={3} alignItems='center' justifyContent={'center'} marginY={'0.5rem'}>
            <Grid item >
              <Button variant="contained" onClick={handleToggleComment} disabled={opcion4 == null}>
                Enviar
              </Button>
            </Grid>
              
            <Grid item >
              <Button variant="contained" onClick={handleClose}>
                Cerrar
              </Button>
            </Grid>
          </Grid>
      </Container>
      <Dialog
        open={openComment}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleToggleComment}
        aria-describedby="alert-dialog-slide-description"
      >
        <Container>
          <Grid padding={'1rem'} spacing={3} justifyContent={'center'} textAlign={'center'} container > 
            <Grid item>
            <Typography variant="h4" gutterBottom>
              Por favor ingresa un comentario
            </Typography>
            <TextField
                    label="Comentario venta"
                    id="comentario"
                    fullWidth
                    value={commentUser}
                    onInput={(event)=>setCommentUser(event.target.value)}
                  />
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={handleUpdateOrder} >
                  Finalizar
                </Button>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </Dialog>

    
    </>
    
  )
}

export default UpdateOrder