import React, { useCallback, useContext, useRef, useState } from "react";
import axios from "axios";
import Header from "../Header";
import Input from "../Input";
import NameContext from "../context/name-context";
import TodoList from "../TodoList";
import DataContext from "../context/data-context";
import { CgLogIn } from "react-icons/cg";
import styles from "./index.module.scss";

const Main = () => {
  const { name } = useContext(NameContext);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const idRef = useRef(null);
  const textRef = useRef("");

  const getTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "get",
        url: "https://631c727d1b470e0e1201fa1b.mockapi.io/api/todos",
        responseType: "stream",
      });
      const todosArray = await response.data;

      // if todosArray has 1 and more element, next todo's id
      // going to be incremented value of current id.
      // just as mockapi does on backend.
      if (todosArray.length > 0) {
        idRef.current =
          Number(
            todosArray
              .map((item) => item.id)
              .sort((a, b) => a - b)
              .splice(-1)[0]
          ) + 1;
        // if there is no element in the array next id will be 1
      } else {
        idRef.current = 1;
      }
      setTodos(todosArray.reverse()); //newest todos going to be at first place
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setTodos(null);
      setIsLoading(false);
    }
  }, [setTodos]);

  const postTodo = async (task) => {
    setIsLoading(true);
    setTodos((prev) => [
      {
        content: task,
        isCompleted: false,
        date: Date.now(),
        id: idRef.current,
      },
      ...prev,
    ]);
    try {
      await axios({
        method: "post",
        url: "https://631c727d1b470e0e1201fa1b.mockapi.io/api/todos",
        data: {
          content: task,
          isCompleted: false,
          date: Date.now(),
        },
      });
      idRef.current += 1;
    } catch (error) {
      console.log(error.message);
      setTodos((prev) => prev.pop);
    }
    setIsLoading(false);
  };

  const editTodo = async (todoId, index, newValue) => {
    try {
      await axios({
        method: "put",
        url: `https://631c727d1b470e0e1201fa1b.mockapi.io/api/todos/${todoId}`,
        data: {
          isCompleted: newValue,
        },
      });
      const newArr = [...todos];
      newArr[index].isCompleted = newValue;
      await setTodos(newArr);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios({
        Authorization: "Bearer my-token",
        method: "delete",
        url: `https://631c727d1b470e0e1201fa1b.mockapi.io/api/todos/${todoId}`,
      });
      const newArr = [...todos].filter((item) => item.id !== todoId);
      setTodos(newArr);
      // mockapi automatically changes last items id to 1
      // so we should guarantee if we have just 1 item
      // it's id will always be 1.
      if (newArr.length === 1) idRef.current = 1;
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = () => {
    const task = textRef.current.value;
    textRef.current.value = "";
    postTodo(task);
  };

  const values = {
    todos,
    isLoading,
    setTodos,
    getTodos,
    editTodo,
    deleteTodo,
    setIsLoading,
  };

  return (
    <>
      <Header name={name} />
      <DataContext.Provider value={values}>
        <div className={styles.main}>
          <Input
            placeholder="Type your new task..."
            buttonText={<CgLogIn />}
            submitHandler={submitHandler}
            textRef={textRef}
          />
          <TodoList />
        </div>
      </DataContext.Provider>
    </>
  );
};

export default Main;
