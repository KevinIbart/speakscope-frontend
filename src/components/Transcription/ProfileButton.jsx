
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { Box, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";

export function ProfileButton() {

    const { user } = useContext(authContext);
   
  
    const getFirstWord = (fullName) => {
      if (!fullName || typeof fullName !== 'string') {
        return ""; // Return an empty string if fullName is undefined or not a string
      }
    
      const words = fullName.split(" ");
      return words.length > 0 ? words[0] : ""; // Return the first word
    };

    const StyledLinkContainer = styled(Box)(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
        textDecoration: "none",
        color: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: "#1a4ed2",
          color: theme.palette.common.white,
        },
      }));

    return(
        <StyledLinkContainer component={Link} to="/dashboard/profile">
          <AccountCircle/>
          <Typography variant="body1" sx={{ marginLeft: 1, fontWeight: "bold",}}>
            {user ? getFirstWord(user.displayName) : "Perfil"}
          </Typography>
        </StyledLinkContainer>
    )
}