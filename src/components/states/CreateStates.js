import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";


const CreateStates  = () => {

    const [modal, setModal] = useState(false);

    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        setModal(false);
    };

    return (
        <div>
            <Button variant="text" onClick={handleOpen}>Nuevo estado</Button>
            {/*<Tooltip title="Nuevo" aria-label="add" className={classes.fixed}>*/}
            {/*    <Fab color="primary" onClick={handleOpen}>*/}
            {/*        <AddIcon />*/}
            {/*    </Fab>*/}
            {/*</Tooltip>*/}
            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" disableEnforceFocus>
                <form >

                    <DialogTitle id="form-dialog-title">Estado</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="nombre"
                            name="nombre"
                            label="Nombre"
                            type="text"
                            //onChange={formik.handleChange}
                            //values={formik.values.nombre}
                            fullWidth
                        />

                        <TextField
                            margin="dense"
                            id="descripcion"
                            name="descripcion"
                            label="Descripcion"
                            type="text"
                            //onChange={formik.handleChange}
                            //values={formik.values.nombre}
                            fullWidth
                        />

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <div>
                            <Button
                                // disabled={processing}
                                //onClick={handleValidate}
                                color="primary"
                                //type="submit"
                            >
                                Crear
                            </Button>
                            {/*{processing && <CircularProgress size={24} className={classes.buttonProgress} />}*/}
                        </div>
                    </DialogActions>
                </form>

            </Dialog>
        </div>
    );
};

export default CreateStates;