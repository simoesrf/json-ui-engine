class GenericData {
    constructor(value, defaultValue) {
        this.value = value;
        this.defaultValue = defaultValue;
        this.changes = false;
    }

    setValue(value) {
        this.value = value;
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
        return new GenericData({ ...this });
    }

    static get Builder() {
        return class Builder {
            constructor(defaultValue) {
                this.defaultValue = defaultValue;
            }

            setValue(value) {
                this.value = value;
                return this;
            }

            build() {
                return new GenericData(this.value, this.defaultValue);
            }

            clone() {
                return new Builder(this.defaultValue);
            }
        }
    }
}

export default GenericData;