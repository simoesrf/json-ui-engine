import React from 'react';

const Header = ({ title, description }) => {
    return <div className="widget-header">
        <h3 className="widget-title">{title}</h3>
        <label className="widget-description">{description}</label>
    </div>
}

export default Header;