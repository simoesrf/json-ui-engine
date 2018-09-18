import React from 'react';
import Header from './Header';

const OneOfWidget = ({ name, data, onDataChange, title, description, properties }) => {

    return <div className="widget-element widget-oneOf">
        <Header title={title} description={description} />
    </div>
}

export default OneOfWidget;