import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const setLocalStorageState = (newState) => {
    try {
      const newStateValue =
        newState === 'function' ? newState(state) : newState;
      setState(newStateValue);
      localStorage.setItem(key, JSON.stringify(newStateValue));
    } catch (error) {
      console.error(`Unable to store new value.`);
    }
  };
  return [state, setLocalStorageState];
};

export default useLocalStorage;