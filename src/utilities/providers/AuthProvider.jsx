import React, { createContext, useEffect, useState } from 'react';
import { app } from '../../config/firebase.init';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile, 
    GoogleAuthProvider, 
    signInWithPopup,
    onAuthStateChanged
} from "firebase/auth";
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState('');

    const auth = getAuth(app);

    // SignUp new user
    // SignUp new user
const signUp = async (email, password) => {
    try {
        setLoader(true);
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            setError('This email address is already in use. Please sign in or use a different email address.');
        } else {
            setError(error.message);
        }
        throw error;
    }
}

    // Login user
const login = async (email, password) => {
    try {
        setLoader(true);
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            setError('Invalid email or password. Please try again.');
        } else {
            setError(error.message);
        }
        throw error;
    }
}


    // Logout user
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null); // Clear user state
            localStorage.removeItem('token'); // Clear token from local storage
        } catch (error) {
            setError(error.code);
            throw error;
        }
    }

    // Update user profile
    const updateUser = async (name, photo) => {
        try {
            await updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
            setUser(auth.currentUser);
        } catch (error) {
            setError(error.code);
            throw error;
        }
    }

    // Google login
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = async () => {
        try {
            setLoader(true);
            return await signInWithPopup(auth, googleProvider);
        } catch (error) {
            setError(error.code);
            throw error;
        }
    }

    // Observer for users
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                axios.post("https://yoga-master-server-991u.onrender.com/api/set-token", { email: user.email, name: user.displayName })
                    .then((data) => {
                        if (data.data.token) {
                            localStorage.setItem('token', data.data.token);
                            setLoader(false);
                        }
                    })
                    .catch((error) => {
                        setError(error);
                        setLoader(false);
                    });
            } else {
                localStorage.removeItem('token');
                setLoader(false);
            }
        });

        return () => unsubscribe(); // Unsubscribe from observer
    }, []);

    const contextValue = { user, signUp, login, logout, updateUser, googleLogin, error, setError, loader, setLoader };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
