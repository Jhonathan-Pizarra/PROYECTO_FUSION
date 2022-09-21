// ** MUI Imports


// Styled component for Blank Layout component
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import Image from "../../public/fondo-login.jpg";

const BlankLayoutWrapper = styled(Box)(({ theme }) => ({
  height: '50vh',

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    //padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    minHeight: '50vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

const BlankLayout = ({ children }) => {
  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <Box className='app-content' sx={{ minHeight: '50vh',overflowX: 'hidden', position: 'relative', backgroundImage: `url(${Image.src})` }}>
        {children}
      </Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
