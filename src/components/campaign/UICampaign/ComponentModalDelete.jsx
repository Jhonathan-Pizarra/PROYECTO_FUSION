import React from 'react'
import useDeleteCampaign from '../Hooks/useDeleteCampaign'
import {Styles} from '@/styles/MantenedoresStyle';
import {
    DialogActions,
    Grid,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    ThemeProvider,
    DialogContent,
    DialogContentText,
    CircularProgress
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import {MUItheme} from "@/styles/Themes";

const ComponentModalDelete = ({id}) => {
    const classes = Styles();

    const {handleClose,handleDelete,handleOpen,modal,mostrarError,processing} = useDeleteCampaign({id})
  return (
    <>
        <IconButton aria-label="eliminar"  size="small" onClick={handleOpen} style={{ color: '#50535A' }}>
                <DeleteIcon />
        </IconButton>

        <ThemeProvider theme={MUItheme}>
            <Dialog
                open={modal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"¿Deseas eliminar esta campaña?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        No se eliminará esta Campaña si se encuentra vinculado a un usuario
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ mb: 2 }}>
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
                                onClick={handleDelete}
                                size="medium"
                            >
                                Eliminar
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
            </Dialog>
        </ThemeProvider>
    </>
  )
}

export default ComponentModalDelete