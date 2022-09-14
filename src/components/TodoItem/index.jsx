import React, { useContext } from "react";
import styles from "./index.module.scss";
import DataContext from "../context/data-context";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdCloudDone, MdOutlineCloudDone } from "react-icons/md";
import ThemeContext from "../context/theme-context";
const TodoItem = ({ children }) => {
  const { id, date, content, isCompleted } = children.todo;
  const index = children.index;

  const { editTodo, deleteTodo, setIsLoading, isLoading } =
    useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const formattedDate = new Date(date).toLocaleDateString("en-US", options);

  const completeTask = async () => {
    setIsLoading(true);
    await editTodo(id, index, !isCompleted);
    setIsLoading(false);
  };

  const deleteTask = async () => {
    setIsLoading(true);
    await deleteTodo(id);
    setIsLoading(false);
  };

  return (
    <div
      className={`${styles.card} ${
        theme === "dark"
        ? styles["card-dark"]
        : styles["card-light"]
      }`}
    >
      <div className={styles["card-header"]}>
        <div>
          <span className={`${styles.date} ${
        theme === "dark"
        ? styles["date-dark"]
        : styles["date-light"]
      }`}>{formattedDate}</span>
        </div>
        <div className={styles["button-group"]}>
          {isLoading ? (
            <button
              disabled
              className={`${styles.button} ${styles.delete} ${
                theme === "dark"
                  ? styles["button-dark"]
                  : styles["button-light"]
              }`}
              onClick={deleteTask}
            >
              <RiDeleteBin6Line />
            </button>
          ) : (
            <button
              className={`${styles.button} ${styles.delete} ${
                theme === "dark"
                  ? styles["button-dark"]
                  : styles["button-light"]
              }`}
              onClick={deleteTask}
            >
              <RiDeleteBin6Line />
            </button>
          )}
          {isLoading ? (
            <button
              disabled
              className={`${styles.button} ${styles["is-completed"]} ${
                theme === "dark"
                  ? styles["button-dark"]
                  : styles["button-light"]
              }`}
              onClick={completeTask}
            >
              {isCompleted ? <MdCloudDone /> : <MdOutlineCloudDone />}
            </button>
          ) : (
            <button
              className={`${styles.button} ${styles["is-completed"]} ${
                theme === "dark"
                  ? styles["button-dark"]
                  : styles["button-light"]
              }`}
              onClick={completeTask}
            >
              {isCompleted ? <MdCloudDone /> : <MdOutlineCloudDone />}
            </button>
          )}
        </div>
      </div>
      <div className={styles.content}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default TodoItem;
