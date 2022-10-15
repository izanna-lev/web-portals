import styles from "./index.module.scss";

type InputProps = {
  name: string;
  inputFields: Array<{
    name: string;
    value: number;
  }>;
  refe?: any;
  checkedVal?: any;
};

const Dropdown = ({ inputFields, name, refe, checkedVal }: InputProps) => {
  return (
    <div className={styles["input-form"]}>
      <div className={styles["feild-heading"]}>{name}</div>
      <select
        className={styles["field-value"]}
        ref={refe}
        defaultValue={checkedVal}
      >
        {inputFields.map((element, index) => (
          <option
            className={styles["dropdown-option"]}
            value={element.value}
            key={index}
          >
            {element.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
