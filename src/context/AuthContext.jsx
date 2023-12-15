import { useContext, createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    getIdToken,
    updateProfile} 
from "firebase/auth";
import { auth } from "../firebase";

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    console.log(context);
    if(!context){
        console.log("No auth context")
    }
    return context;
};

export function AuthProvider({children}){
    const [user, setUser] = useState(null);

    const getToken = async () => {
      if (user === null) {
        console.error('User not logged in');
        return null;
      }
    
      try {
        
        const token = await getIdToken(auth.currentUser);
        console.log(token);
        return token;
      } catch (error) {
        console.error('Error fetching token:', error);
        return null;
      }
    };


    const register = async (email, password, firstName, lastName) => {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(response.user, {
          displayName: `${firstName} ${lastName}`,
        });
        console.log(response);
    }

    const login = async(email, password) => {
        const respuesta = await signInWithEmailAndPassword(auth, email, password);
        console.log(respuesta);
        setUser({ isAuthenticated: true });
        
    }

    const loginWithGoogle = async () => {
        try {
          const googleProvider = new GoogleAuthProvider();
          const responseGoogle = await signInWithPopup(auth, googleProvider);
          console.log(responseGoogle);
          setUser({ isAuthenticated: true });
        } catch (error) {
          console.error("Google sign-in error:", error);
        }
      };

    const logout = async () => {
        try {
          const responseOut = await signOut(auth);
          console.log(responseOut);
        } catch (error) {
          console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => unsubscribe();
      }, []);
      
    return (
        <authContext.Provider value={{user, register, login, loginWithGoogle, logout, getToken }}>
            { children}
        </authContext.Provider>
        )
}