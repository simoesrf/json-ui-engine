class OneOfData {

    constructor(options, selectedOption, validator) {
        this._options = options;
        this._selectedOption = selectedOption;
        this._validator = validator;
    }

    setOption(index) {
        this._selectedOption = index;
    }

    getSelectedOption() {
        return this._selectedOption;
    }

    setValue(value) {
        this._options[this._selectedOption] = value
        this._validator.validate(this._options[this._selectedOption]);
    }

    getValue() {
        return this._options[this._selectedOption];
    }

    getValueOrDefault() {
        return this.getValue().getValueOrDefault();
    }

    validate() {
        this._validator.validate(this.getValue());
    }

    isInvalid() {
        return this._validator.isInvalid();
    }

    errors() {
        return this._validator.errors();
    }

    clone() {
        return new OneOfData
            ({ ...this });
    }

    static get Builder() {
        return class Builder {
            constructor(options, selectedOption, validator) {
                this._options = options; // Array<SchemaData>
                this._selectedOption = selectedOption || 0;
                this._validator = validator;
                // this._validator.validate(this._default);
            }

            setValue(value) {
                // this._values.push(this._items.clone().setValue(value).build());
                // this._validator.validate(this._values);
                return this;
            }

            build() {
                return new OneOfData(this._options, this._selectedOption, this._validator);
            }

            clone() {
                return new Builder(this._options, this._selectedOption, this._validator);
            }
        }
    }
}

export default OneOfData;