import { useState } from "react";
import { nanoid } from "nanoid";
import styles from "./Main.module.css";

const Main = () => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  let isValueValid = value.length > 3 || false;

  const onInputButtonClick = () => {
    const promptValue = prompt("Введите значение");
    // console.log(promptValue);
    if (promptValue === "" || promptValue === null || promptValue.length <= 3) {
      setError(() => "Строка должна быть длиннее 3-х символов");
    } else {
      setValue(() => promptValue);
      setError(() => "");
    }
  };

  const onAddButtonClick = () => {
    if (value) {
      const id = nanoid();
      setList([...list, { id, value }]);
      setValue("");
      setError("");
    }
  };

  return (
    <div className={styles.app}>
      <h1 className={styles["page-heading"]}>Ввод значения</h1>
      <p className={styles["no-margin-text"]}>
        Текущее значение <code>value</code>: "
        <output className={styles["current-value"]}>{value}</output>"
      </p>
      {error !== "" ? <div className={styles.error}>{error}</div> : null}
      <div className={styles["buttons-container"]}>
        <button className={styles.button} onClick={onInputButtonClick}>
          Ввести новое
        </button>
        <button
          className={styles.button}
          disabled={!isValueValid}
          onClick={onAddButtonClick}
        >
          Добавить в список
        </button>
      </div>
      <div className={styles["list-container"]}>
        <h2 className={styles["list-heading"]}>Список:</h2>
        {list.length < 1 ? (
          <p className={styles["no-margin-text"]}>Нет добавленных элементов</p>
        ) : null}
        <ul className={styles.list}>
          {list.map((el) => {
            return (
              <li key={el.id} className={styles["list-item"]}>
                {el.value}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Main;
