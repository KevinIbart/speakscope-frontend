import { Box, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Navbar from "./Navbar";

import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";

const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
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
    fontSize: "64px",
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
        <CustomBox>
          <Box sx={{ flex: "2", marginRight: '6rem' }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500"
              }}
            >
              Bienvenido a SpeakScope
            </Typography>
            <Title variant="h1">
              Una nueva herramienta para tus discursos
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
              Prueba esta aplicación innovadora y mejora con Nosotros
            </Typography>
            <CustomButton
              backgroundColor="#1a4ed2"
              color="#fff"
              buttonText="Empieza Ahora"
              heroBtn={true}
              component={Link} to="/register"
            />
          </Box>

          <Box sx={{ flex: "1.25" }}>
            <img
              src="../../../img/logo-oficial.png"
              alt="heroImg"
              style={{ width: "100%", maxWidth: "400px", marginBottom: "3rem" }}
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;