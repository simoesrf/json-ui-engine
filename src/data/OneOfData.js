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
                // Hack to support oneOf feature
                const { __id__ } = value;
                this._selectedOption = this._options.findIndex((option) => {
                    return option._properties.__id__._value === __id__;
                });

                if (this._selectedOption > -1) {
                    this._options[this._selectedOption].setValue(value);
                    this._validator.validate(this._options[this._selectedOption]);
                } else {
                    this._selectedOption = 0;
                }
                return this;
            }

            build() {
                const options = this._options.map((option) => option.build());
                return new OneOfData(options, this._selectedOption, this._validator);
            }

            clone() {
                return new Builder(this._options, this._selectedOption, this._validator);
            }
        }
    }
}

export default OneOfData;