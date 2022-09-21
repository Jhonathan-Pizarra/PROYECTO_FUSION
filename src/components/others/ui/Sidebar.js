import {useState} from 'react'
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Routes from "../../../constants/routes";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CampaignIcon from '@mui/icons-material/Campaign';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import TornadoIcon from '@mui/icons-material/Tornado';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: '#0B2739',
  color:'white',
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
  backgroundColor: '#0B2739',
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
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#0B2739',
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


const SideBar = ({children}) => {
    const theme = useTheme();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [divider, setDivider] = useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };
    
    const MenuOptions = [
        {
            text:'Inicio',
            icon:<HomeIcon style={{color:'white'}}/>,
            url:Routes.HOME,
        },
        {
            text:'Callcenters',
            icon:<ContactPhoneIcon style={{color:'white'}}/>,
            url:Routes.CALLCENTERS,
        },
        {
            text:'Campañas',
            icon:<CampaignIcon style={{color:'white'}}/>,
            url:Routes.CAMPAINGS,
        },
        {
            text:'Tipo Ventas',
            icon:<LoyaltyIcon style={{color:'white'}}/>,
            url:Routes.SALESTYPES,
        },
        {
            text:'Usuarios',
            icon:<GroupIcon style={{color:'white'}}/>,
            url:Routes.USERS,
        },
        {
            text:'Pedidos',
            icon:<InventoryIcon style={{color:'white'}}/>,
            url:Routes.ORDERS,
        },
        {
            text:'Origenes',
            icon:<TornadoIcon style={{color:'white'}}/>,
            url:Routes.SOURCES,
        }
    ]
  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Fusión
          </Typography>
        </Toolbar>
      </AppBar>
    <Drawer variant="permanent" open={open}>
    
      <DrawerHeader>
        
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronRightIcon style={{color:'white'}}/> : <ChevronLeftIcon style={{color:'white'}}/>}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {
        MenuOptions.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={()=>router.push(item.url)}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </Drawer>

      <Grid container spacing={2}>
        <DrawerHeader />
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>

  </Box>
  )
}

export default SideBar