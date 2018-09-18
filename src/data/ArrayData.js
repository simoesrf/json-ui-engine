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
    }

    getValue() {
        return [...this._values];
    }

    getValueOrDefault() {
        const values = this._values.map((item) => item.getValueOrDefault()).filter(item => !!item);
        const defaultValues = this._default.map((item) => item.getValueOrDefault()).filter(item => !!item);

        return values.length > 0 ? values : defaultValues.length > 0 ? defaultValues : undefined;
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
            constructor(items, defaultValue = [], validator) {
                this._items = items;

                this._default = defaultValue.length > 0 ?
                    defaultValue.map((item) => {
                        return this._items.clone().setValue(item.getValue()).build();
                    }) :
                    [this._items.clone().build()];
                this._values = [];
                this._validator = validator;
                this._validator.validate(this._default);
            }

            setValue(value) {
                this._values.push(this._items.clone().setValue(value).build());
                this._validator.validate(this._values);
                return this;
            }

            build() {
                return new ArrayData(this._items, this._values, this._default, this._validator);
            }

            clone() {
                return new Builder(this._items, this._default, this._validator);
            }
        }
    }
}

export default ArrayData;