import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useRouter} from "next/router";
import Routes from "@/constants/routes";

const NewUser = () => {
    const [modal, setModal] = useState(true);
    const router = useRouter();

    const handleClose = () => {
        router.push(`${Routes.DASHBOARD}`)
        setModal(false);
    };

    return(
        <Dialog open={modal} onClose={handleClose}>
                <Box
                    className='content-center'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& > :not(style)': { m: 5 },
                    }}
                >
                    <DialogContent>
                        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CheckCircleIcon
                                style={{ color: '#00a135', fontSize: 50  }}
                            />
                        </Box>
                        <DialogTitle id="form-dialog-title">
                            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, textAlign: 'center' }}>
                                ¡Contraseña Actualizada!
                            </Typography>
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText>
                                Tu contraseña <b>ha sido moficiada satisfactoriamente.</b> Ya podrás ingresar con tus datos
                            </DialogContentText>
                        </DialogContent>


                        <Button
                            fullWidth
                            size='large'
                            variant='contained'
                            onClick={handleClose}
                            //sx={{ marginBottom: 7 }}
                            //type='submit'
                        >
                            Aceptar
                        </Button>
                    </DialogContent>
                </Box>
            </Dialog>
    );
}

export default NewUser