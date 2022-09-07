import "./index.scss";

type InputProps = {
  name: string;
  inputFields: Array<{
    name: string;
    value: number;
  }>;
  refe: any;
};

const Dropdown = ({ inputFields, name, refe }: InputProps) => {
  return (
    <div className="input-form">
      <div className="feild-heading">{name}</div>
      <select className="field-value" ref={refe}>
        {inputFields.map((element, index) => (
          <option value={element.value} key={index}>
            {element.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
