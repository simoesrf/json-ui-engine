import React from "react";
import Header from "./Header";

const Dropdown = ({
  name,
  data,
  onDataChange,
  title,
  description,
  options
}) => {
  const value = data.hasChanges()
    ? data.getValue()
    : data.getValue() || data.getDefaultValue() || "";

  const handleOnDataChange = ({ target: { value } }) => {
    data.setValue(value);
    onDataChange(name, data);
  };

  return (
    <div className="widget-element widget-string">
      <Header title={title} description={description} />
      <select onChange={handleOnDataChange} value={value}>
        {options.map(option => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
