import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Select,
    TextField
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";


const CreateSubTipification  = () => {

    const [modal, setModal] = useState(false);

    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        setModal(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>Nueva Subtipificación</Button>

            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" disableEnforceFocus>
                <form >

                    <DialogTitle id="form-dialog-title">SubTipificación</DialogTitle>
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

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                            <Select
                                component="select"
                                margin="dense"
                                id="estado"
                                name="estado"
                                label="Estado"
                                //multiple={true}
                                //onChange={formik.handleChange}
                                //values={formik.values.estado}
                                fullWidth
                            >
                                <MenuItem value={"Activo"}>ABC</MenuItem>
                                <MenuItem value={"Inactivo"}>B5C</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tipificación</InputLabel>
                            <Select
                                component="select"
                                margin="dense"
                                id="tipificacion"
                                name="tipificacion"
                                label="Tipificacion"
                                //multiple={true}
                                //onChange={formik.handleChange}
                                //values={formik.values.estado}
                                fullWidth
                            >
                                <MenuItem value={"Activo"}>Tipificación 1</MenuItem>
                                <MenuItem value={"Inactivo"}>Tipificación 2</MenuItem>
                            </Select>
                        </FormControl>

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

export default CreateSubTipification;