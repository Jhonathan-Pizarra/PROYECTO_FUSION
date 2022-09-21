import Link from "next/link";
import React, {useState} from "react";
import Routes from "../../constants/routes";
import {fetcher} from "../../utils";
import useSWR from "swr";
import {Styles} from "@/styles/MantenedoresStyle";
import {
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import CreateClient from "./CreateClient";


const ReadClient = () => {

    const classes = Styles();
    const {data: clients, error} = useSWR(`/clients`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if(error) return <p>No hay el texto...</p>;
    if (!clients) return 'Cargando...';

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <h1 className={classes.titleM}>Lista de Clientes</h1>
            </Grid>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell className={classes.titles}>ID </TableCell>
                            <TableCell className={classes.titles}>Nombre</TableCell>
                            <TableCell className={classes.titles}>Apellido </TableCell>
                            <TableCell className={classes.titles}>Cédula</TableCell>
                            <TableCell className={classes.titles}>Teléfono</TableCell>
                            <TableCell className={classes.titles}>Email</TableCell>
                            <TableCell align="center" style={{color: "white"}}> Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {clients?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="left">{row.id}</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.lastname}</TableCell>
                                <TableCell align="left">{row.identification}</TableCell>
                                <TableCell align="left">{row.main_cellphone}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="center">
                                    <Grid container spacing={0}>
                                        <Grid item xs>
                                            <Link href={`${Routes.CLIENTS}`}>
                                                <IconButton aria-label="ver"  size="small" style={{ color: '#50535A' }}>
                                                    <FindInPageIcon />
                                                </IconButton>
                                            </Link>
                                        </Grid>
                                        <Grid item xs>
                                            {/*<UpdateCampaing id={row.id} {...row}/>*/}
                                        </Grid>
                                        <Grid item xs>
                                          {/*  <DeleteCampaing id={row.id}/>*/}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={10}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <CreateClient/>
        </>
    )
}


export default ReadClient
