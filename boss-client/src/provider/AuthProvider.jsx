import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../useMenu/useAxiosPublic";
export const AuthContext = createContext(null);
const Auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();
  const createuser = (email, password) => {
    return createUserWithEmailAndPassword(Auth, email, password);
  };

  const signInwithoGoogle = () => {
    return signInWithPopup(Auth, provider);
  };
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(Auth, email, password);
  };
  const logOut = () => {
    return signOut(Auth);
  };
  const updateUserProfile = (name, photo) => {
    return updateProfile(Auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
      setUser(currentUser);
      console.log("current users", currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        console.log(userInfo);
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access_token", res.data.token);
          }
        });
      } else {
        localStorage.removeItem("access_token");
      }

      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);
  const authInfo = {
    user,
    loading,
    createuser,
    logIn,

    logOut,
    updateUserProfile,
    signInwithoGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
