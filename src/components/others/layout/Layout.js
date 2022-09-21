import {Box, CssBaseline} from '@mui/material';
import SideBar from '../ui/Sidebar';


export const Layout = ({ children }) => {
    return (
        <Box >
            <CssBaseline/>
            <SideBar>
                {children}
            </SideBar>
        </Box>
  )
};