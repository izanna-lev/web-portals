import styles from "./index.module.scss";

type InputProps = {
  inputFields: {
    name: string;
    maxlength: number;
    type: string;
    id: string;
    max?: number;
    ref?: any;
  };
};

const InputForm = ({ inputFields }: InputProps) => {
  return (
    <div className={styles["input-form"]}>
      <div className={styles["feild-heading"]}>{inputFields.name}</div>
      <input
        name={inputFields.id}
        type={inputFields.type}
        maxLength={inputFields.maxlength}
        max={inputFields.max}
        className={styles["field-value"]}
        ref={inputFields.ref}
        autoFocus
        required
      />
    </div>
  );
};

export default InputForm;
