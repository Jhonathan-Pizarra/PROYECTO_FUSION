import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import {MUItheme} from "@/styles/Themes";
import {Styles} from "@/styles/MantenedoresStyle";
import {ThemeProvider} from "@mui/material";

export default function SaveSale({confirmSale, onAccept = () => {}, onCancel = () => {}}) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const classes = Styles();

    return (
        <div>
            <ThemeProvider theme={MUItheme}>
            <Dialog
                fullScreen={fullScreen}
                onClose={onCancel}
                aria-labelledby="responsive-dialog-title"
                open={confirmSale}
            >
                <DialogTitle id="responsive-dialog-title">
                    {"¿Estás seguro de que deseas guardar?"}
                </DialogTitle>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{  padding: theme => `${theme.spacing(2,2,2,2)} !important` }}
                >
                    <DialogActions>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <div className={classes.wrapper}>
                                <Button
                                    className={classes.create}
                                    variant='contained'
                                    size="medium"
                                    onClick={onAccept}
                                >
                                    Aceptar
                                </Button>
                            </div>
                            <div className={classes.wrapper}>
                                <Button
                                    className={classes.close}
                                    onClick={onCancel}
                                    style={{backgroundColor: '#E63780', color: '#FFFFFF'}}
                                    size="medium"
                                    variant="outlined"
                                >
                                    Cerrar
                                </Button>
                            </div>
                        </Grid>
                    </DialogActions>
                </Grid>
            </Dialog>
            </ThemeProvider>
        </div>
    );
}
