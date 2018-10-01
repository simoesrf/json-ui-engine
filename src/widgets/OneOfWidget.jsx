import React from 'react';
import Header from './Header';

const OneOfWidget = ({ name, data, onDataChange, title, options, description, properties }) => {

    const handleSelectOption = (index) => {
        data.setOption(index);
        onDataChange(name, data);
    }

    const handleDataChange = (_, value) => {
        data.setValue(value);
        onDataChange(name, data);
    }
    const property = properties[data.getSelectedOption()];

    return <div className="widget-element widget-oneOf">
        <Header title={title} description={description} />
        <div className="widget-element-options">
            {options.map(({ label }, index) =>
                <button key={index} className={data.getSelectedOption() === index ? 'selected' : ''} onClick={() => handleSelectOption(index)}>{label}</button>
            )}
        </div>
        {property && React.cloneElement(property, { data: data.getValue(), onDataChange: handleDataChange })}
    </div>
}

export default OneOfWidget;