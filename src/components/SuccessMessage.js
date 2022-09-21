import {useState} from 'react'
import {Snackbar, SnackbarContent} from "@mui/material";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    toor: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    fondo: {
       backgroundColor: '#4caf50'
    }
}));

const SuccessMessage = ({ message,state }) => {

    const classes = useStyles();
    const [position] = useState({
        vertical: 'bottom',
        horizontal: 'left',
    });
    const { vertical, horizontal } = position;
    const [open, setOpen] = useState(state);

    function handleClose(event, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                //variant="warning"
                // ContentProps={{
                //     "aria-describedby": "message-id"
                // }}
                message={message}
                /* action={[
                     <IconButton key="close" onClick={handleClose}>
                         <CloseIcon />
                     </IconButton>
                 ]}*/
            >
                <SnackbarContent
                    className={classes.fondo}
                    message={message}
                />
                {/*<Alert elevation={6} variant="filled" onClose={handleClose} severity="success">*/}
                {/*    {message}*/}
                {/*</Alert>*/}
            </Snackbar>
        </div>
    );
}

export default SuccessMessage