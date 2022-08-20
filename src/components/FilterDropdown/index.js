import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ButtonBase from "@material-ui/core/ButtonBase";
import React, { useState } from "react";
import "./index.scss";

const Select = ({
  selectedArrayFunction,
  options,
  selectedOption,
  menuTitle,
  collegeFetchfunction,
}) => {
  const [listValues, setListValues] = useState([]);
  const [selectValues, setSelectValues] = useState([]);
  const [toggle, setToggle] = useState(false);

  const toggleFunction = () => {
    setToggle(!toggle);
  };

  const applyValueFunction = (val) => {
    selectedArrayFunction(val);
    toggleFunction();
  };

  const clearValueFunction = () => {
    selectedArrayFunction([]);
    setSelectValues([]);
    toggleFunction();
  };

  const selectFunction = (e) => {
    let selectArray = [...selectValues];
    if (selectArray.indexOf(e.target.value) === -1) {
      selectArray.push(e.target.value);
    } else {
      selectArray = selectArray.filter((el) => el !== e.target.value);
    }
    setSelectValues(selectArray);
  };

  const clearList = () => {
    setListValues([]);
  };

  const listFunction = (e) => {
    let value = e.target.value;
    collegeFetchfunction(value);

    // if (value.trim().length === 0) {
    //     return clearList();
    // }

    // const getRelevancy = (val, searchTerm) => {
    //     if (val === searchTerm) {
    //         return 2;
    //     } else if (val.startsWith(searchTerm)) {
    //         return 1;
    //     } else if (val.includes(searchTerm)) {
    //         return 0;
    //     } else {
    //         return -1;
    //     }
    // };

    // if (value && value.trim().toLowerCase()) {
    //     const filterValue = options
    //         .filter((el) => el.label.toLowerCase().includes(value.toLowerCase()))
    //         .sort((a, b) =>
    //             getRelevancy(a.label, value) - getRelevancy(b.label, value) ? 1 : -1
    //         );
    //     setListValues(filterValue);
    // }
  };

  const checkStatusFunction = (arrayValue, val) => {
    if (arrayValue.length > 0) {
      let value = arrayValue.filter((el) => el === val);
      if (value.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const filterLabel = selectedOption.map((val) =>
    options.filter((el) => (el.value === val ? el.label : null))
  );

  const flatArray = Array.prototype.concat.apply([], filterLabel);

  return (
    <div className="select__container">
      <div className="select__dropdown" onClick={() => toggleFunction()}>
        <div className="select__menu">
          {selectedOption && selectedOption.length > 0 ? (
            <div className="select__menu-option--show">
              {flatArray.map((el, i) => (
                <div className="select__menu-item--show" key={el.label + i}>
                  {el.label}
                </div>
              ))}
            </div>
          ) : menuTitle ? (
            menuTitle
          ) : (
            "Filter by college name"
          )}
        </div>
        <div className="select__search-icon">
          <KeyboardArrowDownIcon />
        </div>
      </div>

      {toggle && (
        <div className="newName-hustle">
          <div className="dropdown__search">
            <input
              onChange={(e) => listFunction(e)}
              type="text"
              placeholder="Search Here"
            />
          </div>

          <div className="dropdown__options-list">
            {options &&
              options.map((el, index) => (
                <label
                  className="dropdown__option-item"
                  htmlFor={el.label}
                  value={el.value}
                  key={el.label + index}
                >
                  <input
                    type="checkbox"
                    id={el.label}
                    value={el.value}
                    onChange={(e) => selectFunction(e)}
                    checked={checkStatusFunction(selectValues, el.value)}
                    className="dropdown__option-item-input"
                  />
                  <div>{el.label}</div>
                </label>
              ))}
          </div>

          {options && options.length > 0 && (
            <div className="button__search">
              <ButtonBase
                onClick={() => applyValueFunction(selectValues)}
                className="button__apply button"
              >
                Apply
              </ButtonBase>

              <ButtonBase
                onClick={() => clearValueFunction()}
                className="button__clear button"
              >
                Clear
              </ButtonBase>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
