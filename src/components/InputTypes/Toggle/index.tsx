import "./index.scss";

type InputProps = {
  inputFields: {
    name: string;
    type: string;
    id: string;
    ref?: any;
    default?: any;
  };
};

const Toggle = ({ inputFields }: InputProps) => {
  return (
    <div className="input-toggle-form">
      <div className="feild-heading">{inputFields.name}</div>
      <input
        name={inputFields.id}
        type={inputFields.type}
        ref={inputFields.ref}
        defaultChecked={inputFields.default}
        className="field-toggle-value"
        autoFocus
        required
      />
    </div>
  );
};

export default Toggle;
