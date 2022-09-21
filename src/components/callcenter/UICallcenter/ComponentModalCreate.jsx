import React from 'react'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Dialog,
  DialogTitle,
  Fab,
  TextField,
  Tooltip,
  ThemeProvider,
  CircularProgress
} from "@mui/material";
import {Styles} from '@/styles/MantenedoresStyle';
import AddIcon from '@mui/icons-material/Add';
import useCreateCallCenter from '../Hooks/useCreateCallCenter';
import {MUItheme} from "@/styles/Themes";

const ComponentCreate = () => {
  const classes = Styles();
  
const {handleClose,handleOpen,modal,processing,formik} = useCreateCallCenter()

  return (
    <>
    <Tooltip className={classes.fixed} title="Nuevo" aria-label="add">
      <Fab onClick={handleOpen} style={{ color: 'white' }}>
          <AddIcon />
      </Fab>
    </Tooltip>

    <ThemeProvider theme={MUItheme}>
        <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'xs'} disableEnforceFocus >
            <form onSubmit={formik.handleSubmit} autoComplete="off">
            <DialogContent>
                <DialogTitle id="form-dialog-title">
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        Nuevo Callcenter
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
                <DialogContent>
                    <Grid container spacing={1} justifyContent="center">
                        <Grid item xs={12}>
                            <TextField
                                disabled={processing}
                                variant="outlined"
                                size="small"
                                margin="dense"
                                id="name"
                                name="name"
                                label="Nombre*"
                                type="text"
                                onChange={formik.handleChange}
                                values={formik.values.name}
                                fullWidth
                            />
                            <DialogContentText className={classes.validaciones}>
                                {/*{formik.touched.name === undefined ? formik.touched.name = true : && formik.errors.name}*/}
                                {formik.touched.name && formik.errors.name}
                            </DialogContentText>
                        </Grid>
                        <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="status">Estado</InputLabel>
                            <Select
                                disabled={processing}
                                sx={{ mt: 1}}
                                size="small"
                                variant="outlined"
                                margin="dense"
                                labelId="status"
                                component="select"
                                id="status"
                                name="status"
                                onChange={formik.handleChange}
                                value={formik.values.status}
                                label="Estado"
                                fullWidth
                            >
                                <MenuItem value={1}>Activo</MenuItem>
                                <MenuItem value={0}>Inactivo</MenuItem>
                            </Select>
                            <DialogContentText className={classes.validaciones}>
                                {formik.touched.status && formik.errors.status}
                            </DialogContentText>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            disabled={processing}
                            size="small"
                            variant="outlined"
                            margin="dense"
                            id="contact_person"
                            name="contact_person"
                            label="Contacto*"
                            type="text"
                            onChange={formik.handleChange}
                            values={formik.values.contact_person}
                            fullWidth
                        />
                        <DialogContentText className={classes.validaciones}>
                            {formik.touched.contact_person && formik.errors.contact_person}
                            {/*{formik.touched.contact_person ? formik.errors.contact_person : ""}*/}
                        </DialogContentText>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            disabled={processing}
                            variant="outlined"
                            size="small"
                            margin="dense"
                            id="contact_email"
                            name="contact_email"
                            label="Correo*"
                            type="text"
                            onChange={formik.handleChange}
                            values={formik.values.contact_email}
                            fullWidth
                        />
                        <DialogContentText className={classes.validaciones}>
                            {formik.touched.contact_email && formik.errors.contact_email}
                        </DialogContentText>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            disabled={processing}
                            size="small"
                            variant="outlined"
                            margin="dense"
                            id="contact_phone"
                            name="contact_phone"
                            label="Teléfono*"
                            type="number"
                            onChange={formik.handleChange}
                            //onChange={handleValidarNumero}
                            values={formik.values.contact_phone}
                            fullWidth
                        />
                        <DialogContentText className={classes.validaciones}>
                            {formik.touched.contact_phone && formik.errors.contact_phone}
                        </DialogContentText>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            disabled={processing}
                            size="small"
                            variant="outlined"
                            margin="dense"
                            id="contact_cellphone"
                            name="contact_cellphone"
                            label="Celular*"
                            type="text"
                            onChange={formik.handleChange}
                            values={formik.values.contact_cellphone}
                            fullWidth
                        />
                        <DialogContentText className={classes.validaciones}>
                            {formik.touched.contact_cellphone && formik.errors.contact_cellphone}
                        </DialogContentText>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
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
                    <div className={classes.wrapper}>
                        <Button
                            disabled={processing}
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
            </DialogContent>
            </form>
        </Dialog>
    </ThemeProvider>
    </>
  )
}

export default ComponentCreate