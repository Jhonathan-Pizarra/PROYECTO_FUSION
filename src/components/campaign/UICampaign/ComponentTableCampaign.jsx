import React from 'react'
import useReadCampaign from '../Hooks/useReadCampaign'
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Button
} from '@mui/material';
import {Styles} from '@/styles/MantenedoresStyle';
import UIValidate from '@/components/uiauthvalidate'
import { ComponentModalUpdate } from './ComponentModalUpdate';
import ComponentModalDelete from './ComponentModalDelete';
//import {router} from "next/client";


const ComponentTableCampaign = () => {
    const classes = Styles();
    const {
        handleChangePage,
        handleChangeRowsPerPage,
        filterDataCampaign,
        campains,
        page,
        error,
        filterCampaigns,
        rowsPerPage
      } = useReadCampaign()
  return (
    <UIValidate error={error} data={campains}>
        <Grid
            container
            padding={3}
        >

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <h1 className={classes.titleM}>Lista de Campañas</h1>
            </Grid>

            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                marginY={3}
                columns={{ xs: 8, md: 12 }}
            >
                <TextField id="standard-basic" label="Buscar" variant="standard" onInput={filterDataCampaign}/>
                <Button variant="contained">Buscar</Button>

            </Grid>

            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell className={classes.titles}>Campaña</TableCell>
                            <TableCell className={classes.titles}>Origen</TableCell>
                            <TableCell className={classes.titles}>Canal</TableCell>
                            <TableCell className={classes.titles}>Estado </TableCell>
                            <TableCell className={classes.titles}> Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {filterCampaigns?.length > 0
                        ?
                        filterCampaigns?.map((row) => (
                            <TableRow key={row.id}>
                                    <TableCell className={classes.tableContent}>{row.name}</TableCell>
                                    <TableCell className={classes.tableContent}>{row.Source.name}</TableCell>
                                    <TableCell className={classes.tableContent}>{row.Channel.name}</TableCell>
                                    {row.status === 1 ?
                                        <TableCell align="center" className={classes.actives}><strong>Activo</strong></TableCell>
                                        :
                                        <TableCell align="center"><strong>Inactivo</strong></TableCell>
                                    }
                                    <TableCell align="center">
                                        <Grid container spacing={0}>
                                            <Grid item xs>
                                                <ComponentModalUpdate id={row.id} {...row} page={page+1} limit={rowsPerPage}/>
                                            </Grid>
                                            <Grid item xs>
                                                <ComponentModalDelete id={row.id} page={page+1} limit={rowsPerPage}/>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                        )).slice(0, filterCampaigns?.data?.limit)
                        :
                        <TableRow>
                            <TableCell colSpan={5} align='center'>No data</TableCell>
                        </TableRow>
                    }

                    </TableBody>
                </Table>

                <TablePagination
                    count={campains?.data?.total ? campains?.data?.total : 0}
                    rowsPerPageOptions={[5, 25, 100]}
                    component="div"
                    rowsPerPage={campains?.data?.limit ? campains?.data?.limit :0}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            {/* <CreateCampaing page={page+1} limit={rowsPerPage}/> */}

        </Grid>
    </UIValidate>
  )
}

export default ComponentTableCampaign