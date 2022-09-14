import React, { useContext, useState } from "react";
import DataContext from "../context/data-context";
import ThemeContext from "../context/theme-context";
import styles from "./index.module.scss";

const Input = ({ submitHandler, textRef, placeholder, buttonText }) => {
  const [text, setText] = useState();
  const { isLoading } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const changeHandler = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitHandler();
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles["text-input"]}
        ref={textRef}
        type="text"
        placeholder={placeholder}
        onChange={changeHandler}
        maxLength="111"
      />
      <span className={styles["text-length"]}>
        {text ? text.length : "0"} chrs.
      </span>
      {/*
       *  Input button will be disabled if :
       *  - it's not exist
       *  - it's length smaller than 3
       *  - an http request is active (isLoading = true);
       */}
      {text && text.length > 2 && text.length < 111 && !isLoading ? (
        <button
          className={`button ${
            theme === "dark" ? styles["button-dark"] : styles["button-light"]
          }`}
          type="submit"
        >
          {buttonText}
        </button>
      ) : (
        <button
          className={`button ${
            theme === "dark" ? styles["button-dark"] : styles["button-light"]
          }`}
          type="submit"
          disabled
        >
          {buttonText}
        </button>
      )}
    </form>
  );
};

export default Input;
