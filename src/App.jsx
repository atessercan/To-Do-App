import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import NameContext from "./components/context/name-context";
import ThemeContext from "./components/context/theme-context";
import Main from "./components/Main";
import "./styles/global.scss";

function App() {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    (async () => {
      const localStorageItem = await JSON.parse(localStorage.getItem("name"));
      setName(localStorageItem);
    })();
  }, []);

  return (
    <NameContext.Provider value={{ name, setName }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`app ${theme === "dark" ? "app-dark" : "app-light" }`}>
          <div className="container">{name ? <Main /> : <Login />}</div>
        </div>
      </ThemeContext.Provider>
    </NameContext.Provider>
  );
}

export default App;
