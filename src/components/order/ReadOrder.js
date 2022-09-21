import React, {useState} from "react";
import {fetcher} from "../../utils";
import useSWR from "swr";
import {Styles} from '@/styles/MantenedoresStyle';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    ThemeProvider
} from '@mui/material';
import CreateOrder from "./CreateOrder";
import {useFormik} from "formik";
import {MUItheme} from "@/styles/Themes";
import {Castings} from "@/components/others/dates";
import {useRouter} from "next/router";
import Link from "next/link";
import Routes from "@/constants/routes";


const ReadOrder = () => {

    const classes = Styles();
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [pathOrders, setPathOrders] = useState(`/back-obo/orders?`);
    const {data: orders, error, mutate} = useSWR(`${pathOrders}limit=${rowsPerPage}&page=${page+1}`, fetcher);
    const [filtredData, setFiltredData] = useState(false);


    // const {data: origins} = useSWR(`/source`, fetcher);
    // const {data: users} = useSWR(`/users`, fetcher);

    const [ward, setWard] = useState(0);
    const filtredType = {
        0: 'identification',
        1: 'main_cellphone',
        2: 'date',
        3: 'state'
    };

    console.log('Filtrado',filtredData);
    console.log('origianl',orders);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);      
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0); 
    };

    const handleSelector = (event) =>{
        const opcion_escogida = event.target.value;
        setWard(opcion_escogida);

    }

    const handlePath =() =>{
        setFiltredData(false);
        setPathOrders(`/back-obo/orders?`);
        formik.resetForm();
    }

    const onSubmitFilter = async (data) => {
        setFiltredData(true);
        setPathOrders(`/back-obo/orders/filter?type=${data.type}&value=${data.number}&`)
        setPage(0);
        setRowsPerPage(5)
    };

    const formik = useFormik({
        initialValues: {
            type: '',
            number: '',
        },
        onSubmit: values => onSubmitFilter  (values)
    });

    if(error) return <p>No hay el texto...</p>;
    if (!orders) return 'Cargando...';
    // if (!origins) return 'Cargando...';
    // if (!users) return 'Cargando...';
    //if(!filtredData) return "Cargando..";


    return (
        <>
            <ThemeProvider theme={MUItheme}>


            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <h1 className={classes.titleM}>Lista de Pedidos</h1>
            </Grid>

                <form onSubmit={formik.handleSubmit} autoComplete="off">

            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                style={{backgroundColor: '#D3D4D3'}}//F5F5F5
                paddingBottom={2}
            >

                <Grid item xs={5} lg={2}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                            <Select
                                style={{backgroundColor: '#FFFFFF'}}
                                labelId="type"
                                component="select"
                                id="type"
                                name="type"
                                onChange={handleSelector}
                                values={formik.values.type = filtredType[ward]}
                                label="Tipo"
                                fullWidth
                            >
                                <MenuItem value={0}>Cedula</MenuItem>
                                <MenuItem value={1}>Número</MenuItem>
                                <MenuItem value={2}>Fecha</MenuItem>
                            </Select>
                        </FormControl>
                </Grid>

                <Grid item xs={5} lg={3}>
                    <TextField
                        variant="filled"
                        size="small"
                        margin="dense"
                        id="number"
                        name="number"
                        label={ward === 2 ? "": "Buscar"}
                        type={ward === 2 ? "datetime-local": 'text'}
                        onChange={formik.handleChange}
                        values={formik.values.number}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={5} lg={2} textAlign='center'>
                    <Button  variant="contained" type='submit'>
                        Buscar
                    </Button>
                </Grid>
                <Grid item xs={5} lg={2} textAlign='center'>
                    <Button  variant="contained" onClick={handlePath} disabled={!filtredData}>
                        Restablecer
                    </Button>
                </Grid>

            </Grid>
                </form>
            <Grid
                container
                sx={{ padding: theme => `${theme.spacing(2,4,2,4)} !important` }}
            >


                <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell className={classes.titles}>Pedido</TableCell>
                            <TableCell className={classes.titles}>Cédula</TableCell>
                            <TableCell className={classes.titles}>Estado </TableCell>
                            <TableCell className={classes.titles}>Fecha de ingreso</TableCell>
                            <TableCell className={classes.titles}>Campaña</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {orders.data.data?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="left">
                                {/* <UpdateOrder page={page+1} limit={rowsPerPage} id={row.id} {...row} /> */}
                                <Link href={`${Routes.ORDERS}/${row.id}`}>
                                    <Button variant="outlined">
                                        {row.id}
                                    </Button>
                                </Link>
                                {/*<UpdateOrder  orderData={row}>*/}
                                {/*{row.id}*/}
                                {/*</UpdateOrder>*/}
                                </TableCell>
                                <TableCell className={classes.tableContent}>{row.Client?.identification}</TableCell>
                                {row.status === 1 ?
                                    <TableCell align="center" className={classes.actives}><strong>Asignado</strong></TableCell>
                                    :
                                    <TableCell align="center"><strong>No asignado</strong></TableCell>
                                }
                                <TableCell className={classes.tableContent}>{Castings(row.created_date)}</TableCell>
                                <TableCell className={classes.tableContent}>{row.Campaign?.name}</TableCell>
                                {/*<UpdateOrder/>*/}
                            </TableRow>
                        )).slice(0, orders.data.limit)}

                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 25, 100]}
                    component="div"
                    count={orders.data.total}
                    rowsPerPage={orders.data.limit}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </TableContainer>

            </Grid>
            <CreateOrder page={page+1} limit={rowsPerPage}/>
            </ThemeProvider>
        </>
    )
}


export default ReadOrder