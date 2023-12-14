import { Box, Container, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function DashboardContent() {
    const CustomBox = styled(Box)(({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", 
        gap: theme.spacing(5),
        marginTop: theme.spacing(3),
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        },
    }));
  

  return (
    <>
    <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "80vh" }}>
      <Container>
        <CustomBox sx={{textAlign:'center'}}>
          <Box sx={{ flex: "2", marginRight: '1rem' }}>
            <Outlet/>
          </Box>
        </CustomBox>
      </Container>
    </Box>
    </>
  );
}
