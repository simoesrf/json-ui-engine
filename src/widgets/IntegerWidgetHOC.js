import React from 'react';

const IntegerWidgetHOC = (WrappedComponent) => {
    return ({ onDataChange, ...props }) => {

        const handleOnDataChange = (name, value) => {
            const numb = value.getValue();
            value.setValue(numb && parseInt(numb, 10));
            onDataChange(name, value);
        }

        return <WrappedComponent {...props} onDataChange={handleOnDataChange} />
    }
}

export default IntegerWidgetHOC;