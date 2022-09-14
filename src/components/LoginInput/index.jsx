import React, { useState } from "react";
import styles from "./index.module.scss";
const LoginInput = ({ placeholder, textRef, buttonText, submitHandler }) => {
  const [text, setText] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    submitHandler();
    setText("");
  };

  const changeHandler = (event) => {
    setText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles["text-input"]}
        ref={textRef}
        type="text"
        placeholder={placeholder}
        onChange={changeHandler}
      />

      {/*
       *  Input button will be disabled if :
       *  - it's not exist
       *  - it's length smaller than 3
       *  - an http request is active (isLoading = true);
       */}
      {text && text.length > 2 && text.length < 15 ? (
        <button type="submit">{buttonText}</button>
      ) : (
        <button type="submit" disabled>
          {buttonText}
        </button>
      )}
    </form>
  );
};

export default LoginInput;
