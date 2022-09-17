import React, { useRef, useContext, useEffect } from 'react';
import useLocalStorage from '../Hooks/useLocalStorage';
import NameContext from '../context/name-context';
import ThemeContext from '../context/theme-context';
import LoginInput from '../LoginInput';
import { CgLogIn } from 'react-icons/cg';
import styles from './index.module.scss';

const Login = () => {
  const [, setLocalStorage] = useLocalStorage('name', '');

  const {setName} = useContext(NameContext);
  const { setTheme } = useContext(ThemeContext);

  const textRef = useRef();

  const submitHandler = (event) => {
    // event.preventDefault();
    setLocalStorage(textRef.current.value);
    setName(textRef.current.value);
  }

  useEffect(()=>{
    (async()=> {
      const theme = await JSON.parse(localStorage.getItem("theme"));
      setTheme(theme || "dark")
    })();
  },[setTheme])

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h2>How can i call you? </h2>
        <LoginInput submitHandler={submitHandler} textRef={textRef} placeholder='Name' buttonText={<CgLogIn />} />
      </div>
    </div>
  );
};

export default Login;