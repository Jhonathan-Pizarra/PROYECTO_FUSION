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
import CreateUsers from "./CreateUsers";
import UpdateUser from "./UpdateUsers";


const ReadUsers = () => {

    const classes = Styles();
    //const {data: users, error} = useSWR(`/users`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const {data: users, error} = useSWR(`/back-obo/users?limit=${rowsPerPage}&page=${page + 1}`, fetcher);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if(error) return <p>No hay el texto...</p>;
    if (!users) return 'Cargando...';

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
                <h1 className={classes.titleM}>Lista de Usuarios</h1>
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

            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell className={classes.titles}>Usuario</TableCell>
                            <TableCell className={classes.titles}>Nombre</TableCell>
                            <TableCell className={classes.titles}>Email</TableCell>
                            <TableCell className={classes.titles}>Rol</TableCell>
                            <TableCell className={classes.titles}>Estado</TableCell>
                            <TableCell className={classes.titles}> Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {users.data.data?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className={classes.tableContent}>{row.username}</TableCell>
                                <TableCell className={classes.tableContent}>{row.given_name} {row.family_name}</TableCell>
                                <TableCell className={classes.tableContent}>{row.email}</TableCell>
                                <TableCell className={classes.tableContent}>{row.Rol.name}</TableCell>
                                {row.status === 1 ?
                                    <TableCell align="center" className={classes.actives}><strong>Activo</strong></TableCell>
                                    :
                                    <TableCell align="center"><strong>Inactivo</strong></TableCell>
                                }
                                <TableCell align="center">
                                    <Grid container
                                          direction="row"
                                          justifyContent="flex-end"
                                          alignItems="center"
                                          sx={{ padding: theme => `${theme.spacing(0,2,0,7)} !important` }}
                                          spacing={0}>
                                        <Grid item xs>
                                            <UpdateUser id={row.id} {...row} rol={row.Rol.name}/>
                                        </Grid>
                                        <Grid item xs>
                                            {/*<DeleteCampaing id={row.id}/>*/}
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
                    count={users.data.total}
                    //count = {users?.length ? users.length : 100 }
                    //rowsPerPage={rowsPerPage}
                    rowsPerPage={users.data.limit}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <CreateUsers page={page+1} limit={rowsPerPage}/>
            </Grid>
        </>
    )
}


export default ReadUsers
