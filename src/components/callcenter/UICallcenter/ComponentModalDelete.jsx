import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    Grid,
    DialogContent,
    DialogContentText,
    ThemeProvider,
    CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import {Styles} from "@/styles/MantenedoresStyle";
import {MUItheme} from "@/styles/Themes";
import useDeleteCallCenter from '../Hooks/useDeleteCallCenter';

const ComponentModalDelete = ({id}) => {
    const classes = Styles();
    const {handleClose,handleDelete,handleOpen,modal,processing} =useDeleteCallCenter({id})
  return (
    <>
        <IconButton aria-label="eliminar"  size="small" onClick={handleOpen}>
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
                    {"¿Deseas eliminar este callcenter?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        No se eliminará este Callcenter si se encuentra vinculado a un usuario
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