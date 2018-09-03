import React from 'react';
import Header from './Header';

const ArrayWidget = ({ name, data, onDataChange, title, description, item }) => {

    const handleOnDataChange = (index, value) => {
        data.setValue(index, value);
        onDataChange(name, data);
    }

    const addItem = () => {
        data.addItem();
        onDataChange(name, data);
    }

    const removeItem = (index) => {
        data.removeItem(index);
        onDataChange(name, data);
    }

    const values = data.hasChanges() ? data.getList() : (data.getList() || data.getDefaultValue());

    return <div className="widget-element widget-array">
        <Header title={title} description={description} />
        <ul>{values.map((value, index) => {
            return <li key={index} className="widget-item">
                <div className="widget-item-content">{React.cloneElement(item, { data: value, onDataChange: (_, value) => handleOnDataChange(index, value) })}</div>
                <div className="widget-item-remove-button">
                    <button onClick={() => removeItem(index)}>Remove</button>
                </div>
            </li>
        })}</ul>
        <button onClick={addItem}>Add item</button>
    </div>
}

export default ArrayWidget;