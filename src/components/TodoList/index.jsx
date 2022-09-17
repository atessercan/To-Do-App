import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/data-context";
import ThemeContext from "../context/theme-context";
import TodoItem from "../TodoItem";
import useLocalStorage from '../Hooks/useLocalStorage';
import { TbSortDescending, TbSortAscending } from "react-icons/tb";
import { MdSettingsInputAntenna } from "react-icons/md";
import {
  MdCloudDone,
  MdOutlineCloudDone,
  MdOutlineCloud,
} from "react-icons/md";
import { RiSunFill, RiMoonFill } from "react-icons/ri";
import Spinner from "../Spinner";
import styles from "./index.module.scss";

const TodoList = () => {
  const { todos, setTodos, getTodos, isLoading } = useContext(DataContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [sort, setSort] = useState("asc");
  const [listType, setListType] = useState("all");
  const [,setLocalStorage] = useLocalStorage("theme");
  const sortHandler = () => {
    if (sort === "asc") setSort("desc");
    else setSort("asc");
  };

  const listChanger = () => {
    if (listType === "completed") setListType("uncompleted");
    else if (listType === "uncompleted") setListType("all");
    else setListType("completed");
  };

  const themeChanger = () => {
    if (theme === "dark")
    {
      setTheme("light");
      setLocalStorage("light");
    }
    else
    {
      setTheme("dark");
      setLocalStorage("dark");
    }
  };

  useEffect(() => {
    const tempArr = [...todos];
    if (sort === "asc") setTodos(tempArr.sort((a, b) => b.id - a.id));
    else setTodos(tempArr.sort((a, b) => a.id - b.id));
    // eslint-disable-next-line
  }, [sort, setTodos]);

  useEffect(() => {
    (async () => {
      await getTodos();
    })();
  }, [getTodos, setTodos]);

  return (
    <>
      <div className={styles["list-header"]}>
        <div className={styles["spinner-container"]}>
          <div>
            <MdSettingsInputAntenna fill={theme === "dark" ? "#d6f8cd" : "#282c34"} />
          </div>
          <div className={styles.spinner}>{isLoading && <Spinner />}</div>
          <div className={styles.sync}>Sync.</div>
        </div>
        <div className={styles["button-group"]}>
          <button className={`${styles['theme-button']} ${theme === 'dark' ? styles['button-dark'] : styles['button-light']}`} onClick={themeChanger}>
            {theme === "dark" ? <RiMoonFill /> : <RiSunFill />}
          </button>
          <button
            className={`${styles['list-changer-button']} ${theme === 'dark' ? styles['button-dark'] : styles['button-light']}`}
            onClick={listChanger}
          >
            {listType === "all" ? (
              <MdOutlineCloud />
            ) : listType === "completed" ? (
              <MdCloudDone />
            ) : (
              <MdOutlineCloudDone />
            )}
          </button>
          <button className={`${styles['sort-button']} ${theme === 'dark' ? styles['button-dark'] : styles['button-light']}`} onClick={sortHandler}>
            {sort === "asc" ? (
              <div>
                <span>Newest</span>
                <TbSortAscending />
              </div>
            ) : (
              <div>
                <span>Oldest</span> <TbSortDescending />
              </div>
            )}
          </button>
        </div>
      </div>
      <ul className={styles["list"]}>
        {/* Conditional rendering for "all" list type */}
        {todos &&
          todos.length !== 0 &&
          listType === "all" &&
          todos.map((todo, index) => (
            <li key={todo.id}>
              <TodoItem>{{ todo, index }}</TodoItem>
            </li>
          ))}
        {/* Conditional rendering for "completed" list type */}
        {todos &&
          todos.length !== 0 &&
          listType === "completed" &&
          todos
            .filter((todo) => todo.isCompleted)
            .map((todo, index) => (
              <li key={todo.id}>
                <TodoItem>{{ todo, index }}</TodoItem>
              </li>
            ))}
        {/* Conditional rendering for "uncompleted" list type */}
        {todos &&
          todos.length !== 0 &&
          listType === "uncompleted" &&
          todos
            .filter((todo) => !todo.isCompleted)
            .map((todo, index) => (
              <li key={todo.id}>
                <TodoItem>{{ todo, index }}</TodoItem>
              </li>
            ))}
        {!todos && <span>Something went wrong...</span>}
      </ul>
    </>
  );
};

export default React.memo(TodoList);
