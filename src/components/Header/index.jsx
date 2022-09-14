import React, { useContext } from "react";
import NameContext from "../context/name-context";
import ThemeContext from '../context/theme-context';
import styles from "./index.module.scss";

const Header = ({ name }) => {
  const { setName } = useContext(NameContext);
  const { theme } = useContext(ThemeContext);
  // To increase responsiveness i've called
  // window.pixelRatio api to fit the text to
  // device screen
  const pixelRatio = window.devicePixelRatio.toFixed();

  const logoutHandler = () => {
    localStorage.removeItem("name");
    setName(null);
  };

  return (
    <header className={styles["App-header"]}>
      <button className={`${styles['logout-button']} ${theme === 'dark' ? styles['logout-button-dark'] : styles['logout-button-light']}`}onClick={logoutHandler}>
        Logout
      </button>
      {name && name !== " " && (
        <>
          <div className={styles.welcome}>
            <strong className={styles.greeting}>
              <a href=".">Hello! </a>
            </strong>
            <span
              className={styles.name}
              style={{
                // Responsive font size setting:
                fontSize:
                  name.length > 10
                    ? 2.5/pixelRatio+"rem"
                    : name.length > 7
                    ? 3.6/pixelRatio+"rem"
                    : name.length > 5
                    ? 3.9/pixelRatio+"rem"
                    : 4.5/pixelRatio+"rem",
              }}
            >
              <a href=".">{name}</a>
            </span>
          </div>
          <span className={styles.pipe}>|</span>
          <strong className={styles.motivate}>Let's get some work done!</strong>
        </>
      )}
    </header>
  );
};

export default Header;
