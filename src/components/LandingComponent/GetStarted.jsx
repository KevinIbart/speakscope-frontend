import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import CustomButton from "./CustomButton";

const GetStarted = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    backgroundColor: "#6c94db",
    height: "416px",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      height: "auto",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(3, 3, 0, 3),
      width: "90%",
    },
  }));

  const CustomBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(10, 0, 10, 0),
    margin: theme.spacing(0, 2, 0, 2),
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
  }));

  return (
    <CustomBox>
      <CustomContainer>
        <Box>
          <Typography
            sx={{ fontSize: "35px", color: "white", fontWeight: "700" }}
          >
            Propiedades Destacadas
          </Typography>
          <Typography
            sx={{ fontSize: "16px", color: "#ccc", fontWeight: "500", my: 3, marginBottom: 3}}
          >
            Todo lo que necesitas saber para mejorar tu forma de hablar en público
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', mt:6}}>
            <CustomButton
              backgroundColor="#fff"
              color="#1a4ed2"
              buttonText="Transcripción"
              getStartedBtn={true}
            />
            <CustomButton
              backgroundColor="#fff"
              color="#1a4ed2"
              buttonText="Retroalimentación"
              getStartedBtn={true}
            />
            <CustomButton
              backgroundColor="#fff"
              color="#1a4ed2"
              buttonText="Sugerencias de Mejora"
              getStartedBtn={true}
            />
          </Box>
        </Box>

        <img
          src="https://images.ecestaticos.com/Ic7x2Z4ibBZI025-eebeUmRf7k4=/0x0:2272x1278/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F509%2F2a1%2Fa90%2F5092a1a904d262fedaee586985fb773a.jpg"
          alt="illustration"
          style={{ maxWidth: "35%", borderRadius:"20px"}}
        />
      </CustomContainer>
    </CustomBox>
  );
};

export default GetStarted;
