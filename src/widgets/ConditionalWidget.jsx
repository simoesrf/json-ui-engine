import React from 'react';
import Header from './Header';

class ConditionalWidget extends React.Component {

    render() {
        const { name, fields, data, onDataChange, title, options, description, properties } = this.props;

        const handleSelectOption = (index, newValue) => {
            const oldData = data.getValue().getValue();
            oldData[fields.primary].setValue(undefined);
            oldData[fields.condition].setValue(undefined);
            oldData[fields.secondary].setValue(undefined);
            data.setOption(index);
            data.getValue().getValue()[fields.primary].setValue(newValue);
        }

        const handleDataChange = (_, value) => {
            const leftOperand = value.getValue()[fields.primary].getValue();
            const optionType = isNaN(leftOperand) ?
                ((leftOperand === 'true' || leftOperand === 'false') ? 'boolean' : 'string') : 'number';
            const index = options.findIndex(({ label }) => label === optionType);

            if (!!leftOperand && index > -1 && index !== data.getSelectedOption()) {
                handleSelectOption(index, leftOperand);
            } else {
                data.setValue(value);
            }

            onDataChange(name, data);
        }

        const property = properties[data.getSelectedOption()];

        return <div className="widget-element widget-oneOf">
            <Header title={title} description={description} />
            {property && React.cloneElement(property, { data: data.getValue(), onDataChange: handleDataChange })}
        </div>
    }
}
export default ConditionalWidget;