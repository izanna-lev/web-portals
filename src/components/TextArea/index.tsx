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

const TextArea = ({ inputFields }: InputProps) => {
  return (
    <div className={styles["input-form"]}>
      <div className={styles["feild_heading"]}>{inputFields.name}</div>
      <textarea
        name={inputFields.id}
        maxLength={inputFields.maxlength}
        className={styles["textarea-value"]}
        ref={inputFields.ref}
        autoFocus
        required
      />
    </div>
  );
};

export default TextArea;
