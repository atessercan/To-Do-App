import React from 'react';
import styles from './index.module.scss';
const Spinner=()=> {

  return (
    <div className={styles['lds-ripple']}><div></div><div></div></div>
  );
}

export default Spinner;