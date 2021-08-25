import React, { useState, useEffect } from "react";
import Router from "./Router";
import { authService } from "../fBase";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        if (user.displayName === null) {
          const ind = user.email.indexOf("@");
          const end = user.email.substring(0, ind);
          user.updateProfile({ displayName: end });
        }
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    setUserObj(authService.currentUser);
  };
  return (
    <>
      {init ? (
        <Router
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing"
      )}
    </>
  );
};

export default App;
