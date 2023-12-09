import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter"
import LinkedIn from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    gap: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  const IconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  }));

  const FooterLink = styled("span")(() => ({
    fontSize: "16px",
    color: "#7A7A7E",
    fontWeight: "300",
    cursor: "pointer",
    "&:hover": {
      color: "#000",
    },
  }));

  return (
    <Box sx={{ py: 10 }}>
      <CustomContainer>
        <CustomContainer>
          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Productos
            </Typography>

            <FooterLink>Transcripción</FooterLink>
            <br />
            <FooterLink>Retroalimentación</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Fuentes
            </Typography>

            <FooterLink>Nosotros</FooterLink>
            <br />
            <FooterLink>Historias</FooterLink>
            <br />
            <FooterLink>Prueba Gratuita</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Empresa
            </Typography>

            <FooterLink>Términos de Uso</FooterLink>
            <br />
            <FooterLink>Privacidad</FooterLink>
            <br />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              CONOCÉNOS MÁS
            </Typography>

            <Typography
              sx={{
                fontSize: "16px",
                color: "#7A7A7E",
                fontWeight: "500",
                mb: 2,
              }}
            >
             ¡Visita alguna de nuestras redes sociales!
            </Typography>

            <IconBox>
              <Facebook/>
              <Twitter/>
              <LinkedIn/>
            </IconBox>
          </Box>
        </CustomContainer>
      </CustomContainer>
    </Box>
  );
};

export default Footer;