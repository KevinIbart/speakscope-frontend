import { Box, Button, Divider, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Navbar from "./Navbar";

import CustomButton from "../LandingComponent/CustomButton";
import { Link } from "react-router-dom";

const Hero = () => {
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

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "45px",
    color: "#1a4ed2",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "80vh" }}>
      <Container>
        <Navbar />
        <CustomBox sx={{textAlign:'center'}}>
          <Box sx={{ flex: "2", marginRight: '1rem' }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "25px",
                color: "#687690",
                fontWeight: "500"
              }}
            >
              Comencemos
            </Typography>
            <Title variant="h1">
              A partir de ahora tienes el mejor aliado para tus presentaciones
            </Title>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500"
              }}
            >
              Transcribimos, te mostramos lo más relevante de tu discurso, y después te damos una retroalimentación exacta para que
              mejores tu discurso
            </Typography>
            <Divider/>
            <Box sx={{ mt:2, flex: "2", marginRight: '1rem'}}>
                <Button component={Link} to="/dashboard/transcription">
                  <CustomButton
                  backgroundColor="#1a4ed2"
                  color="#fff"
                  buttonText="Transcribir mi audio"
                  heroBtn={true}
                  />
                </Button>
            </Box>
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;