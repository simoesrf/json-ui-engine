class IntegerData {
    constructor(value, defaultValue) {
        this.value = value;
        this.defaultValue = defaultValue;
        this.changes = false;
    }

    setValue(value) {
        this.value = Number.isNaN(value) ? this.value : parseInt(value, 10);
        this.changes = true;
    }

    getValue() {
        return this.value;
    }

    hasChanges() {
        return this.changes;
    }

    getDefaultValue() {
        return this.defaultValue;
    }

    getValueOrDefault() {
        return this.value || this.defaultValue;
    }

    clone() {
        return new IntegerData({ ...this });
    }

    static get Builder() {
        return class Builder {
            constructor(defaultValue) {
                this.defaultValue = parseInt(defaultValue, 10);
            }

            setValue(value) {
                this.value = Number.isNaN(value) ? this.value : parseInt(value, 10);;
                return this;
            }

            build() {
                return new IntegerData(this.value, this.defaultValue);
            }

            clone() {
                return new Builder(this.defaultValue);
            }
        }
    }
}

export default IntegerData;