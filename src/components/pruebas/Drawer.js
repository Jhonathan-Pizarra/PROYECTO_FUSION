import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Routes from "../../constants/routes";
import Link from "next/link";
import ReadCallcenter from "../callcenter/ReadCallcenter";
import {Styles} from "@/styles/MantenedoresStyle";

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CampaignIcon from '@mui/icons-material/Campaign';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import InventoryIcon from '@mui/icons-material/Inventory';

const pages = [
    {
        text: "Inicio",
        to: Routes.HOME,
    },
    {
        text: "Callcenters",
        to: Routes.CALLCENTERS,
    },
    {
        text: "Campañas",
        to: Routes.CAMPAINGS,
    },
    {
        text: "Tipo Ventas",
        to: Routes.SALESTYPES,
    },
    {
        text: "Usuarios",
        to: Routes.USERS,
    },
    {
        text: "Pedidos",
        to: Routes.ORDERS,
    },
];

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
        marginTop: theme.spacing(2),
    },
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    //padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const classes = Styles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [divider, setDivider] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
        setDivider(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setDivider(false);
    };

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <Drawer sx={{ padding: '0px'}} variant="permanent" open={open}>
                <Toolbar sx={{ width: '100rem'}}  >
                    {
                        open == false
                        ?
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{...(open && { display: 'none' })}}
                            >
                                <MenuIcon />
                            </IconButton>
                        :
                            <DrawerHeader>
                                <Typography sx={{p:0.5}} variant="h6" noWrap component="div">
                                    Gestor de Leads
                                </Typography>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerClose}
                                    edge="end"
                                    sx={{
                                        ...(open && { display: 'none' }),
                                    }}
                                >
                                    <ChevronLeftIcon />
                                </IconButton>
                            </DrawerHeader>
                    }
                </Toolbar>
                {divider === false ? <Divider/> : <Root><Divider textAlign="left"></Divider></Root>}
                <List>
                    {
                        pages.map((text) => (
                            <ListItem key={text.text} disablePadding>
                                <ListItemButton sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    pl: 2.5,
                                }}>
                                    <ListItemIcon sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        pl: 2.5,
                                            color: '#0B2739'
                                    }}>
                                        {
                                            text.text === 'Inicio'
                                                ? <HomeIcon />
                                                : text.text === 'Callcenters'
                                                    ? <ContactPhoneIcon />
                                                    : text.text === 'Campañas'
                                                        ? <CampaignIcon />
                                                        : text.text === 'Tipo de Ventas'
                                                            ? <LoyaltyIcon />
                                                            : text.text === 'Usuarios'
                                                                ? <InventoryIcon />
                                                                : <MailIcon />
                                        }
                                    </ListItemIcon>
                                    <ListItemText sx={{ opacity: open ? 1 : 0}}>
                                        <Link href={text.to}>
                                            {text.text}
                                        </Link>
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <ReadCallcenter/>
            </Box>
        </Box>
    );
}
