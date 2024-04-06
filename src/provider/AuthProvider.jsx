import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import PropTypes from 'prop-types';


export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading]= useState(true)

    const createUser =(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }



    const signIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const google =()=>{
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = ()=>{
        
        setLoading(false)
        setUser(null)
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe= onAuthStateChanged(auth, currentUser=>{
            if (currentUser) {
                setUser(currentUser)
                setLoading(false)
                console.log(currentUser)
                
                
            }
        });
        return  ()=>{
            unSubscribe();
        }
    },[])

    const allInfo = {user, createUser, signIn, logOut, loading, google}
    return (
        <AuthContext.Provider value={allInfo} >
            {children}

        </AuthContext.Provider>
    );
};

AuthProvider.propTypes={
    children: PropTypes.node,
}

export default AuthProvider;
