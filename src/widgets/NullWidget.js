import React from 'react';
import Header from './Header';

const NullWidget = ({ title, description }) => {
    return <div className="widget-element null-widget">
        <Header title={title} description={description} />
        NullWidget
    </div>
}

export default NullWidget;