class ArrayData {
    constructor(items, values, defaultValue, validator) {
        this._items = items;
        this._values = values.length ? values : defaultValue;
        this._default = defaultValue;
        this._changed = false;
        this._validator = validator;
    }

    addItem() {
        this._values.push(this._items.clone().build());
        this._validator.validate(this._values);
        this._changed = true;
    }

    removeItem(index) {
        this._values.splice(index, 1);
        this._validator.validate(this._values);
        this._changed = true;
    }

    hasChanges() {
        return this._changed;
    }

    getDefaultValue() {
        return this._default;
    }

    setValue(index, value) {
        this._values[index] = value;
        this._validator.validate(this._values);
        this._changed = true;
        this._validator.validate(this._value);
    }

    getValue() {
        return [...this._values];
    }

    getValueOrDefault() {
        const values = this._values.map((item) => item.getValueOrDefault()).filter(item => !!item);
        const defaultValues = this._default.map((item) => item.getValueOrDefault()).filter(item => !!item);

        return values.length > 0 ? values : defaultValues.length > 0 ? defaultValues : [];
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
        return new ArrayData({ ...this });
    }

    static get Builder() {
        return class Builder {
            constructor(items, defaultValue, validator) {
                this._items = items;

                this._default = defaultValue;
                this._values = [];
                this._validator = validator;
                this._validator.validate(this._default);
            }

            setValue(values) {
                this._values = values.map((value) => this._items.clone().setValue(value));
                this._validator.validate(this._values);
                return this;
            }

            build() {
                const values = this._values.map((value) => value.build());
                const defaultValues = this._default.map((value) => value.build());
                return new ArrayData(this._items, values, defaultValues, this._validator);
            }

            clone() {
                return new Builder(this._items, this._default, this._validator);
            }
        }
    }
}

export default ArrayData;