import React from 'react'
import {
    DialogActions,
    DialogContent,
    DialogContentText,
    Grid,
    IconButton,
    InputLabel,
    Select,
    Button,
    Dialog,
    DialogTitle,
    FormControl,
    MenuItem,
    TextField,
    ThemeProvider,
    CircularProgress
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {MUItheme} from "@/styles/Themes";
import useUpdateCampaign from '../Hooks/useUpdateCampaign';
import {Styles} from "@/styles/MantenedoresStyle";

export const ComponentModalUpdate = ({id, name, status, SourceId, ChannelId, flow_type, page}) => {

    const classes = Styles();
    const {handleOpen,modal,channels,formikCampaign,processing,sources,handleClose} = useUpdateCampaign({id, name, status, SourceId, ChannelId, flow_type, page})

  return (
    <>
        <IconButton aria-label="editar"  size="small" onClick={handleOpen} style={{ color: '#50535A' }}>
            <EditIcon />
        </IconButton>

        <ThemeProvider theme={MUItheme}>
            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" disableEnforceFocus maxWidth={'xs'}>
                <form onSubmit={formikCampaign.handleSubmit} >

                    <DialogContent>
                        <DialogTitle id="form-dialog-title">
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                Editar Campaña
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
                                    {formikCampaign.errors.name}
                                    {formikCampaign.touched.name}
                                </DialogContentText>
                                </Grid>

                                <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                    <Select
                                        disabled={processing}
                                        sx={{ mt: 1}}
                                        size="small"
                                        variant="outlined"
                                        component="select"
                                        margin="dense"
                                        id="status"
                                        name="status"
                                        label="Estado"
                                        onChange={formikCampaign.handleChange}
                                        value={formikCampaign.values.status}

                                    >
                                        <MenuItem value={1}>Activo</MenuItem>
                                        <MenuItem value={0}>Inactivo</MenuItem>
                                    </Select>
                                    <DialogContentText className={classes.validaciones}>
                                        {formikCampaign.errors.status}
                                        {formikCampaign.touched.status}
                                    </DialogContentText>
                                </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Canal</InputLabel>
                                    <Select
                                        disabled={processing}
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

                                    >
                                        {channels?.map((channel) => (
                                            <MenuItem key={channel.id} value={channel.id}>{channel.name}</MenuItem>
                                        ))}
                                    </Select>
                                    <DialogContentText className={classes.validaciones}>
                                        {formikCampaign.errors.ChannelId && formikCampaign.touched.ChannelId}
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
                                        {formikCampaign.errors.SourceId && formikCampaign.touched.SourceId}
                                    </DialogContentText>
                                </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">FlowType</InputLabel>
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
                                            defaultValue={flow_type}
                                            onChange={formikCampaign.handleChange}
                                            value={formikCampaign.values.flow_type}
                                            label="Origen"
                                        >
                                            <MenuItem key={0} value={'S'}>Semiautomático</MenuItem>
                                            <MenuItem key={1} value={'A'}>Asistido</MenuItem>

                                        </Select>
                                        <DialogContentText className={classes.validaciones}>
                                            {formikCampaign.errors.flow_type && formikCampaign.touched.flow_type}
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
                                    Editar
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
