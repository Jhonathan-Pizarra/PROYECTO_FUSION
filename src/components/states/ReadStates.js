import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CreateStates from "./CreateStates";
import CreateTipification from "./CreateTipifications";
import CreateSubTipification from "./CreateSubTifications";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 2),
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    detail:{
        color: "#3f51b5",
    },
    head: {
        backgroundColor: "#f44336",
    },
    overrides: {
        color: "rgba(0, 0, 0, 0.87)",
        display: "table",
        fontSize: "0.875rem",
        fontFamily: "Neuton",
        fontWeight: "400",
        verticalAlign: "inherit",
        boxSizing: "inherit",
        width: "320%",
        textAlign: "left",
    },
    titles:{
        color: "#FFFFFF",
        textAlign: "left",
    },
    alineacion:{
        textAlign: "center"
    }
}));

function createData(name, calories, fat, crabs) {
    return { name, calories, fat, crabs };
}

const rows = [
    createData('Suptificación A', 'Suptificación A', 'Suptificación C', 'Suptificación B'),
    createData('Suptificación B', 'Suptificación C', 'Suptificación D', 'Suptificación E'),
    createData('Suptificación C', 'Suptificación D', 'Suptificación B', 'Suptificación C'),
    createData('Suptificación D', 'Suptificación B', 'Suptificación E', 'Suptificación A'),
    createData('Suptificación E', 'Suptificación E', 'Suptificación A', 'Suptificación D'),
];

const ReadState = () => {
    const classes = useStyles();

    return (
        <>
            <h1>Tipificaciones</h1>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Stack spacing={2} direction="row" sx={{ marginBottom: 7 }}>
                     <CreateStates/>
                     <CreateTipification/>
                     <CreateSubTipification/>
                </Stack>
            </Grid>
            <h2>Estado: ABC</h2>
            <TableContainer component={Paper}>

                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Button variant="contained"  style={{backgroundColor: "#FAC800", color: "white"}} >Editar Tipificación</Button>
                    <Button variant="contained"  style={{backgroundColor: "#f50057", color: "white"}} >Eliminar Tipificación</Button>
                </Grid>

                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell style={{color: "white"}}>Tipificación 1</TableCell>
                            <TableCell style={{color: "white"}}>Tipificación 2</TableCell>
                            <TableCell style={{color: "white"}}>Tipificación&nbsp;(3)</TableCell>
                            <TableCell style={{color: "white"}}>Tipificación&nbsp;(n)</TableCell>
                            {/*<TableCell className={classes.titles} align="right">Protein&nbsp;(g)</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.name}
                                    <IconButton aria-label="editar" size="small" style={{ color: '#FAC800' }} >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="eliminar" size="small" style={{ color: '#f50057' }} >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="left">{row.calories}
                                    <IconButton aria-label="editar" size="small" style={{ color: '#FAC800' }} >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="eliminar" size="small" style={{ color: '#f50057' }} >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="left">{row.fat}
                                    <IconButton aria-label="editar" size="small" style={{ color: '#FAC800' }} >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="eliminar" size="small" style={{ color: '#f50057' }} >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="left">{row.crabs}
                                    <IconButton aria-label="editar" size="small" style={{ color: '#FAC800' }} >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="eliminar" size="small" style={{ color: '#f50057' }} >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    {/*<TableBody>*/}
                    {/*    {rows.map((row) => (*/}
                    {/*        <TableRow*/}
                    {/*            key={row.name}*/}
                    {/*            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/}
                    {/*        >*/}
                    {/*            <TableCell component="th" scope="row">*/}
                    {/*                {row.name}*/}
                    {/*            </TableCell>*/}
                    {/*            <TableCell align="left">{row.calories}</TableCell>*/}
                    {/*            <TableCell align="left">{row.fat}</TableCell>*/}
                    {/*            <TableCell align="left">{row.carbs}</TableCell>*/}
                    {/*        </TableRow>*/}
                    {/*    ))}*/}
                    {/*</TableBody>*/}
                </Table>
            </TableContainer>

            <h2>Estado: B5C</h2>
            <TableContainer component={Paper}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Button variant="contained" style={{backgroundColor: "#FAC800", color: "white"}} >Editar Tipificación</Button>
                </Grid>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell style={{color: "white"}}>Tipificación 1</TableCell>
                            <TableCell style={{color: "white"}}>Tipificación 2</TableCell>
                            <TableCell style={{color: "white"}}>Tipificación&nbsp;(3)</TableCell>
                            <TableCell style={{color: "white"}}>Tipificación&nbsp;(n)</TableCell>
                            {/*<TableCell className={classes.titles} align="right">Protein&nbsp;(g)</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="left">{row.calories}</TableCell>
                                <TableCell align="left">{row.fat}</TableCell>
                                <TableCell align="left">{row.crabs}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    {/*<TableBody>*/}
                    {/*    {rows.map((row) => (*/}
                    {/*        <TableRow*/}
                    {/*            key={row.name}*/}
                    {/*            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/}
                    {/*        >*/}
                    {/*            <TableCell component="th" scope="row">*/}
                    {/*                {row.name}*/}
                    {/*            </TableCell>*/}
                    {/*            <TableCell align="left">{row.calories}</TableCell>*/}
                    {/*            <TableCell align="left">{row.fat}</TableCell>*/}
                    {/*            <TableCell align="left">{row.carbs}</TableCell>*/}
                    {/*        </TableRow>*/}
                    {/*    ))}*/}
                    {/*</TableBody>*/}
                </Table>
            </TableContainer>
        </>

    );
}

export default ReadState