import React from 'react';
import Header from './Header';

const ObjectWidget = ({ name, data, onDataChange, title, description, properties }) => {
    const dataEntries = Object.entries(data.getValue());

    const handleOnDataChange = (prop, value) => {
        data.setValue({ [prop]: value });
        onDataChange(name, data);
    }
    return <div className="widget-element widget-object">
        <Header title={title} description={description} />
        <ul>{dataEntries.map(([name, value], index) => {
            return <li key={index} className="widget-item">{React.cloneElement(properties[name], { data: value, onDataChange: handleOnDataChange })}</li>
        })}</ul>
    </div>
}

export default ObjectWidget;