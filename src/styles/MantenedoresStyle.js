import Image from '../../public/fondo-login.jpg';
import {makeStyles} from "@material-ui/core"; // Import using relative path

export const Styles = makeStyles((theme) => ({
  fixed: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(3),
    color: 'white',
    backgroundColor: '#0B2739'
  },
  fixedCat: {
    position: 'fixed',
    bottom: theme.spacing(14),
    right: theme.spacing(3),
    color: 'white',
    backgroundColor: '#0B2739'
  },
  wrapper: {
      margin: 2,
      position: 'relative',
  },
  fondo: {
      backgroundImage: `url(${Image.src})`,
      //o directametne en el componetne {/ sx={`url(${Image.src})`}**/}
  },
  iconos:{
      color: '#FFFFFF',
  },
  buttonProgress: {
      color: '#0B2739',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -19,
      textAlign: "center",
  },
  validaciones: {
        color: '#f44336 !important',
  },
  inputs: {
    color: '#0B2739',
  },
  create: {
      color: 'white',
      backgroundColor: '#0B2739',
      right: theme.spacing(1),
  },
  close:{
      left: theme.spacing(1),
  },
  root: {
        padding: theme.spacing,
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
  },
  detail:{
      color: "#3f51b5",
  },
  head: {
      backgroundColor: '#0B2739',
  },
  overrides: {
      color: "rgba(0, 0, 0, 0.87)",
      display: "table",
      fontSize: "0.875rem",
      fontFamily: "Neuton",
      fontWeight: "400",
      verticalAlign: "inherit",
      boxSizing: "inherit",
      width: "320%",
      textAlign: "left",
  },
  titles:{
      color: "#FFFFFF",
      textAlign: "center",
  },
  tableContent:{
      textAlign: "center",
  },
    actives:{
      color: '#5CB615'
  },
  edit:{
        color: '#0B2739'
  },
  update: {
      color: 'white',
      backgroundColor: '#0B2739'
  },
  titleM: {
      TextDecoder: '#1976d2'
  },
  deleteIcon: {
      color: 'white',
      backgroundColor: '#019DF4'
  },
    dialogPaper: {
        minHeight: 'auto',
        maxHeight: 'auto',
        minWidth: 'auto',
        maxWidth: '500vh',
    },
    deleteBtn: {
        color: 'white',
        backgroundColor: '#0B2739'
    },
    cancel: {
        color: 'white',
        backgroundColor: '#FFFFFF',
        //left: theme.spacing(1),
    },
    /*Pedidos*/
    eliminarEstilos:{
        all: 'unset',
    },
    aligmentLeft:{
        alignContent: "flex-end",
        textAlign: 'right',
        alignItems: "flex-end"
    },

    /*Swiper*/
    swip:{
        textAlign: "center",
        fontSize: "18px",
        background: "#ffff",
        display: "flex"

        /* Center slide text vertically */
    },
    /*Swals*/
    myswal: {
        //zIndex: 1000,
        backgroundColor: '#019DF4',
        zIndex: 20000000000
    }

}));