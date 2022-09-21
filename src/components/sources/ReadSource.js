import React, {useState} from "react";
import {fetcher} from "../../utils";
import useSWR from "swr";
import {Styles} from '@/styles/MantenedoresStyle';
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
} from '@mui/material';

import UIValidate from '@/components/uiauthvalidate'
import CreateSource from "@/components/sources/CreateSource";
import UpdateSource from "@/components/sources/UpdateSource";
import DeleteSource from "@/components/sources/DeleteSource";

//Get Callcenters

const ReadSource = () => {
    const classes = Styles();
    const {data: sources, error} = useSWR(`/back-obo/source`, fetcher);
    //const [currentCallcenters, setCallcenters] =  useState(callcenters);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (

        <>
            <UIValidate error={error} data={sources}>

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
                        <h1 className={classes.titleM}>Lista de Orígenes</h1>
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        sx={{ padding: theme => `${theme.spacing(5,0)} !important` }}
                        columns={{ xs: 8, md: 12 }}
                    >
                        <TextField id="standard-basic" label="Buscar" variant="standard" />
                        <Button variant="contained">Buscar</Button>
                    </Grid>

                    <TableContainer component={Paper} >
                        <Table size="small" aria-label="a dense table">
                            <TableHead className={classes.head}>
                                <TableRow>
                                    <TableCell className={classes.titles}>Nombre</TableCell>
                                    <TableCell className={classes.titles}> Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {sources?.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className={classes.tableContent}>{row.name}</TableCell>
                                        <TableCell align="center">
                                            <Grid container spacing={0}>
                                                <Grid item xs>
                                                    <UpdateSource id={row.id} {...row}/>
                                                </Grid>
                                                <Grid item xs>
                                                    <DeleteSource id={row.id}/>
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
                            //count={10}
                            count = {sources?.length ? sources.length : 100 }
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                    <CreateSource/>

                </Grid>
            </UIValidate>

        </>
    )
}

export default ReadSource