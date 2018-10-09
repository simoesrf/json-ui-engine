class GenericData {
    constructor(value, defaultValue, validator) {
        this._value = value;
        this._default = defaultValue;
        this._changed = false;
        this._validator = validator
        this._validator.validate(this._value);
    }

    setValue(value) {
        this._value = value;
        this._validator.validate(this._value);
        this._changed = true;
    }

    getValue() {
        return this._value;
    }

    hasChanges() {
        return this._changed;
    }

    getDefaultValue() {
        return this._default;
    }

    getValueOrDefault() {
        return this.hasChanges() ? this._value : this._value || this._default;
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
        return new GenericData({ ...this });
    }

    static get Builder() {
        return class Builder {
            constructor(defaultValue, validator) {
                this._default = defaultValue;
                this._validator = validator;
                this._validator.validate(this._default);
            }

            setValue(value) {
                this._value = value;
                // this._validator.validate(this._value);
                return this;
            }

            build() {
                return new GenericData(this._value, this._default, this._validator);
            }

            clone() {
                return new Builder(this._default, this._validator);
            }
        }
    }
}

export default GenericData;