import "./index.scss";

type InputProps = {
  name: string,
  inputFeilds: Array<{
    name: string
    value: number;
  }>;
};

const Dropdown = ({inputFeilds, name}:InputProps) => {
  return (
    <div className="input-form">
      <div className="feild-heading">{name}</div>
      <select className="field-value">
    {inputFeilds.map((element) => {
      return (
    <option value={element.value}>{element.name}</option>
      )
    })}
    </select>
    </div>
  );
};

export default Dropdown;
