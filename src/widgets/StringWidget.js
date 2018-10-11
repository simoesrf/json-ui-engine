import React from 'react';
import Header from './Header';

const StringWidget = ({ name, data, onDataChange, title, description, handleOnBlur }) => {

    const value = data.hasChanges() ? data.getValue() : (data.getValue() || data.getDefaultValue() || '');

    const handleOnDataChange = ({ target: { value } }) => {
        data.setValue(value);
        onDataChange(name, data);
    }

    return <div className="widget-element widget-string">
        <Header title={title} description={description} />
        <input type="text" value={value} onChange={handleOnDataChange} onBlur={() => handleOnBlur(name)} />
    </div>
}

export default StringWidget;