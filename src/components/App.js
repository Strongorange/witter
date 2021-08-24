import React, { useState, useEffect } from "react";
import Router from "./Router";
import { authService } from "../fBase";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return <>{init ? <Router isLoggedIn={isLoggedIn} /> : "Initializing"}</>;
};

export default App;
