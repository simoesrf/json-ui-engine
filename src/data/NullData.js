class NullData {
    constructor() {
        this.value = null;
        this.defaultValue = null;
        this.changes = false;
    }

    setValue() { }

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
        return new NullData({ ...this });
    }

    static get Builder() {
        return class Builder {
            setValue() {
                return this;
            }

            build() {
                return new NullData();
            }

            clone() {
                return new Builder();
            }
        }
    }
}

export default NullData;