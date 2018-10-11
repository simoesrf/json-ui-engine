import React from 'react';
import Header from './Header';

const ConditionalWidget = ({ name, fields, data, onDataChange, title, options, description, properties }) => {

    const resetDataValues = () => {
        const oldData = data.getValue().getValue();
        oldData[fields.primary].setValue(undefined);
        oldData[fields.condition].setValue(undefined);
        oldData[fields.secondary].setValue(undefined);
    }

    const setValueToNextOption = (index, value) => {
        data.setOption(index);
        data.getValue().getValue()[fields.primary].setValue(value);
    }

    const getOptionType = (value) => {
        if (!isNaN(value)) {
            return 'number';
        } else if ((value === 'true' || value === 'false')) {
            return 'boolean';
        }

        return 'string';
    }

    const handleSelectOption = () => {
        const leftOperand = data.getValue().getValue()[fields.primary].getValue();
        const optionType = getOptionType(leftOperand);
        const index = options.findIndex(({ label }) => label === optionType);

        if (!!leftOperand && index > -1 && index !== data.getSelectedOption()) {
            resetDataValues();
            setValueToNextOption(index, leftOperand);
            onDataChange(name, data);
        }
    }

    const handleOnPrimaryOptionBlur = (name) => {
        // This approach causes a re-render of the children, so the input object lose focus.
        // One option is https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components
        // Another one (current approach) is to allow the user to edit data on the primary field and then, on blur, change the object data.

        if (name === fields.primary) {
            handleSelectOption();
        }
    }

    const handleDataChange = (_, value) => {
        data.setValue(value);
        onDataChange(name, data);
    }

    const property = properties[data.getSelectedOption()];

    return <div className="widget-element widget-oneOf">
        <Header title={title} description={description} />
        {property && React.cloneElement(property, { data: data.getValue(), onDataChange: handleDataChange, handleOnBlur: handleOnPrimaryOptionBlur })}
    </div >
}
export default ConditionalWidget;