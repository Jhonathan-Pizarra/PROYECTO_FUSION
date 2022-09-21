import React from 'react'
import {
    DialogActions,
    DialogContent,
    DialogContentText,
    Grid,
    InputLabel,
    Select,
    Button,
    Dialog,
    DialogTitle,
    Fab,
    FormControl,
    MenuItem,
    TextField,
    Tooltip,
    ThemeProvider,
    CircularProgress
} from "@mui/material";
import {Styles} from "@/styles/MantenedoresStyle";
import useCreateCampaign from '../Hooks/useCreateCampaign';
import AddIcon from '@mui/icons-material/Add';
import {MUItheme} from "@/styles/Themes";

const ComponentModalCreate = () => {
    const classes = Styles();
    const {channels,handleClose,handleOpen,sources,formikCampaign,modal,processing} = useCreateCampaign()
  return (
    <>
        <Tooltip className={classes.fixed} title="Nuevo" aria-label="add">
            <Fab onClick={handleOpen}>
                <AddIcon />
            </Fab>
        </Tooltip>

        <ThemeProvider theme={MUItheme}>
            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" disableEnforceFocus maxWidth={'xs'} >
                <form onSubmit={formikCampaign.handleSubmit} >
                    <DialogContent>
                        <DialogTitle id="form-dialog-title">
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                Nueva Campaña
                            </Grid>
                            <DialogContentText>
                                Por favor llena los siguientes campos:
                            </DialogContentText>
                        </DialogTitle>

                        <DialogContent>



                            <Grid container spacing={1.5} justifyContent="center">
                                <Grid item xs={12}>
                                    <TextField
                                        disabled={processing}
                                        variant="outlined"
                                        size="small"
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Nombre"
                                        type="text"
                                        onChange={formikCampaign.handleChange}
                                        value={formikCampaign.values.name}
                                        fullWidth
                                    />
                                    <DialogContentText className={classes.validaciones}>
                                        {formikCampaign.touched.name && formikCampaign.errors.name}
                                    </DialogContentText>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="estado-label">Estado</InputLabel>
                                        <Select
                                            disabled={processing}
                                            //variant="standard"
                                            sx={{ mt: 1}}
                                            size="small"
                                            variant="outlined"
                                            component="select"
                                            margin="dense"
                                            id="status"
                                            name="status"
                                            onChange={formikCampaign.handleChange}
                                            value={formikCampaign.values.status}
                                            label="Estado"
                                            labelId='estado-label'
                                        >
                                            <MenuItem value={1}>Activo</MenuItem>
                                            <MenuItem value={0}>Inactivo</MenuItem>
                                        </Select>
                                        <DialogContentText className={classes.validaciones}>
                                            {formikCampaign.touched.status && formikCampaign.errors.status}
                                        </DialogContentText>
                                    </FormControl>
                                </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="canal-label">Canal</InputLabel>
                                            <Select
                                                disabled={processing}
                                                //variant="standard"
                                                //sx={{ mt: 1}}
                                                sx={{ mt: 1}}
                                                size="small"
                                                variant="outlined"
                                                component="select"
                                                margin="dense"
                                                id="ChannelId"
                                                name="ChannelId"
                                                onChange={formikCampaign.handleChange}
                                                value={formikCampaign.values.ChannelId}
                                                label="Canal"
                                                labelId='canal-label'
                                            >
                                                {channels?.map((channel) => (
                                                    <MenuItem key={channel.id} value={channel.id}>{channel.name}</MenuItem>
                                                ))}
                                            </Select>
                                            <DialogContentText className={classes.validaciones}>
                                                {formikCampaign.touched.ChannelId && formikCampaign.errors.ChannelId}
                                            </DialogContentText>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Origen</InputLabel>
                                            <Select
                                                disabled={processing}
                                                sx={{ mt: 1}}
                                                size="small"
                                                variant="outlined"
                                                //sx={{ mt: 1}}
                                                //variant="standart"
                                                component="select"
                                                margin="dense"
                                                id="SourceId"
                                                name="SourceId"
                                                onChange={formikCampaign.handleChange}
                                                value={formikCampaign.values.SourceId}
                                                label="Origen"
                                            >
                                                {sources?.map((source) => (
                                                    <MenuItem key={source.id} value={source.id}>{source.name}</MenuItem>
                                                ))}
                                            </Select>
                                            <DialogContentText className={classes.validaciones}>
                                                {formikCampaign.touched.SourceId && formikCampaign.errors.SourceId}
                                            </DialogContentText>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="origen-label">FlowType</InputLabel>
                                            <Select
                                                disabled={processing}
                                                sx={{ mt: 1}}
                                                size="small"
                                                variant="outlined"
                                                //sx={{ mt: 1}}
                                                //variant="outlined"
                                                component="select"
                                                margin="dense"
                                                id="flow_type"
                                                name="flow_type"
                                                onChange={formikCampaign.handleChange}
                                                value={formikCampaign.values.flow_type}
                                                label="Origen"
                                                labelId='origen-label'
                                            >
                                                <MenuItem key={0} value={'S'}>Semiautomático</MenuItem>
                                                <MenuItem key={1} value={'A'}>Asistido</MenuItem>

                                            </Select>
                                            <DialogContentText className={classes.validaciones}>
                                                {formikCampaign.touched.flow_type && formikCampaign.errors.flow_type}
                                            </DialogContentText>
                                        </FormControl>
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

export default ComponentModalCreate