import styles from "./index.module.scss";

type InputProps = {
  inputFeilds: {
    name: string
    maxlength: number
    type: string
    id: string
    max?: number
  }
}

const InputForm = ({inputFeilds}:InputProps) => {
  return (
    <div className={styles["input-form"]}>
      <div className={styles["feild-heading"]}>{inputFeilds.name}</div>
      <input
        name={inputFeilds.id}
        type={inputFeilds.type}
        maxLength={inputFeilds.maxlength}
        max={inputFeilds.max}
        className={styles["field-value"]}
        autoFocus
        required
      />
    </div>
  );
};

export default InputForm;
