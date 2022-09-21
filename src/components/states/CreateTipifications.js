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


const CreateTipification  = () => {

    const [modal, setModal] = useState(false);

    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        setModal(false);
    };

    return (
        <div>
            <Button variant="contained" style={{backgroundColor: "#f44336", color: "white"}} onClick={handleOpen}>Nuevo estado</Button>
            {/*<Tooltip title="Nuevo" aria-label="add" className={classes.fixed}>*/}
            {/*    <Fab color="primary" onClick={handleOpen}>*/}
            {/*        <AddIcon />*/}
            {/*    </Fab>*/}
            {/*</Tooltip>*/}
            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" disableEnforceFocus>
                <form >

                    <DialogTitle id="form-dialog-title">Tipificación</DialogTitle>
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

export default CreateTipification;