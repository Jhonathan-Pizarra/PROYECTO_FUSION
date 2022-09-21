import React, {useState} from "react";
import {fetcher} from "../../utils";
import useSWR from "swr";
import {Styles} from "@/styles/MantenedoresStyle";
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from "@mui/material";
import UpdateSaleType from "./UpdateSalesType";
import DeleteSaleType from "./DeleteSalesType";

const ReadSalesType = () => {

    const classes = Styles();
    const {data: salesType, error} = useSWR(`/back-obo/salestype`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if(error) return <p>No hay el texto...</p>;
    if (!salesType) return 'Cargando...';

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <>
            <Grid
                container
                sx={{ padding: theme => `${theme.spacing(2,4,2,4)} !important` }}
            >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <h1>Lista de Ventas</h1>
            </Grid>

            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                //sx={{ padding: theme => `${theme.spacing(5,0)} !important` }}
                columns={{ xs: 8, md: 12 }}
            >
                <TextField id="standard-basic" label="Buscar" variant="standard" />
                <Button variant="contained">Buscar</Button>
            </Grid>

            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell className={classes.titles}>Descripción</TableCell>
                            <TableCell className={classes.titles}>Estado</TableCell>
                            <TableCell className={classes.titles}>Validación Equifax</TableCell>
                            <TableCell className={classes.titles}> Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {salesType?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className={classes.tableContent}>{row.description}</TableCell>
                                {row.status === 1 ?
                                    <TableCell align="center" className={classes.actives}><strong>Activo</strong></TableCell>
                                    :
                                    <TableCell align="center"><strong>Inactivo</strong></TableCell>
                                }

                                {row.user_validate === 1 ?
                                    <TableCell align="center" className={classes.actives}><strong>Activo</strong></TableCell>
                                    :
                                    <TableCell align="center"><strong>Inactivo</strong></TableCell>
                                }

                                <TableCell align="center">
                                    <Grid container spacing={0}>
                                        <Grid item xs>
                                            <UpdateSaleType id={row.id} {...row}/>
                                        </Grid>
                                        <Grid item xs>
                                            <DeleteSaleType id={row.id}/>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        )).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}

                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 25, 100]}
                    component="div"
                    count = {salesType.length? salesType.length : 100 }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            {/*<CreateSaleType/>*/}

            </Grid>
        </>
    )
}


export default ReadSalesType