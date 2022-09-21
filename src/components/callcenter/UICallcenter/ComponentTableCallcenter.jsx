import React from 'react'
import useReadCallCenter from '../Hooks/useReadCallCenter'
import {Styles} from '@/styles/MantenedoresStyle';
import UIValidate from '@/components/uiauthvalidate'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Paper,
    Grid, TextField, Button
} from '@mui/material';
import ComponentModalUpdate from './ComponentModalUpdate';
import ComponentModalDelete from './ComponentModalDelete';


const ComponentTableCallcenter = () => {
    const classes = Styles();
    const {
        callcenters,
        error,
        filtrado,
        filterCallcenter,
        rowsPerPage,
        page,
        handleChangePage,
        handleChangeRowsPerPage
    }=useReadCallCenter()

  return (
    <>
    <UIValidate error={error} data={callcenters}>

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
            <h1 className={classes.titleM}>Lista de Callcenters</h1>
        </Grid>

        <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ padding: theme => `${theme.spacing(5,0)} !important` }}
            columns={{ xs: 8, md: 12 }}
        >
            
            <TextField id="standard-basic" label="Buscar" variant="standard" onInput={filtrado}/>
            <Button variant="contained" onClick={filtrado}>Buscar</Button>
        </Grid>

        <TableContainer component={Paper} >
            <Table size="small" aria-label="a dense table">
                <TableHead className={classes.head}>
                    <TableRow>
                        <TableCell className={classes.titles}>Nombre</TableCell>
                        <TableCell className={classes.titles}>Estado </TableCell>
                        <TableCell className={classes.titles}>Nombre contacto</TableCell>
                        <TableCell className={classes.titles}>Correo de contacto</TableCell>
                        <TableCell className={classes.titles}>Celular de contacto</TableCell>
                        <TableCell className={classes.titles}> Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {
                    filterCallcenter?.length > 0
                    ?
                    filterCallcenter?.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className={classes.tableContent}>{row.name}</TableCell>
                            {/*{row.estado === 'Activo' ?*/}
                            {/*    <TableCell align="left" className={classes.actives}><strong>{row.estado}</strong></TableCell>*/}
                            {/*    :*/}
                            {/*    <TableCell align="left"><strong>{row.estado}</strong></TableCell>*/}
                            {/*}*/}
                            {row.status === 1 ?
                                <TableCell align="center" className={classes.actives}><strong>Activo</strong></TableCell>
                                :
                                <TableCell align="center"><strong>Inactivo</strong></TableCell>
                            }
                            <TableCell className={classes.tableContent}>{row.contact_person}</TableCell>
                            <TableCell className={classes.tableContent}>{row.contact_email}</TableCell>
                            <TableCell className={classes.tableContent}>{row.contact_cellphone}</TableCell>
                            <TableCell align="center">
                                <Grid container spacing={0}>
                                    <Grid item xs>
                                        <ComponentModalUpdate id={row.id} {...row}/>
                                        
                                    </Grid>
                                    <Grid item xs>
                                        <ComponentModalDelete id={row.id}/>
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    )).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    :
                    <TableRow >
                        <TableCell className={classes.tableContent}>No results</TableCell>

                    </TableRow>
                            
                }

                </TableBody>
            </Table>

            <TablePagination
                rowsPerPageOptions={[5, 25, 100]}
                component="div"
                count = {callcenters?.length ? callcenters.length : 100 }
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>

        </Grid>
    </UIValidate>
    </>
  )
}

export default ComponentTableCallcenter