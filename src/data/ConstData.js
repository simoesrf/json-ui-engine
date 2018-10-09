class ConstData {
    constructor(value) {
        this._value = value;
    }

    setValue() { }

    getValue() { return this._value; }

    hasChanges() { return false; }

    getDefaultValue() {
        return this.getValue();
    }

    getValueOrDefault() { return this.getValue(); }

    validate() { }

    isInvalid() {
        return false;
    }

    errors() {
        return [];
    }

    clone() {
        return new ConstData({ ...this });
    }

    static get Builder() {
        return class Builder {
            constructor(value) {
                this._value = value;
            }

            setValue() {
                return this;
            }

            build() {
                return new ConstData(this._value);
            }

            clone() {
                return new Builder(this._value);
            }
        }
    }
}

export default ConstData;