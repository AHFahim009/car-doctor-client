import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../Firebase/firebase.confiq";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //-------------------------------------------

  const googleProvider = new GoogleAuthProvider();

  // create user form sign up
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user form login page

  const singIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login with google pop up

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // observe user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("observed current user is:", currentUser);
      setLoading(false);
      //---------------------
      if (currentUser && currentUser.email) {
        //-

        const loggedUser = {
          email: currentUser.email,
        };
        console.log(loggedUser);

        // [ (create) => loggedUser data to server site "/jwt" & res.send =>  jwt.sign(token)  / set the token in local storage ]

        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("jwt response", data);

            // after res.send => set token data in local storage =>
            // step 1: setItem

            localStorage.setItem("car-access-token", data.token);
          });
      } else {
        // when user don't found remove token form local storage
        localStorage.removeItem("car-access-token");
      }
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  // logout user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    createUser,
    singIn,
    logOut,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
