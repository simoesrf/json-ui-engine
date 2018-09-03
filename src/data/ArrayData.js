class ArrayData {
    constructor(items, values, defaultValue) {
        this.items = items;
        this.values = values.length ? values : defaultValue;
        this.defaultValue = defaultValue;
        this.changes = false;
    }

    addItem() {
        this.values.push(this.items.clone().build());
        this.changes = true;
    }

    removeItem(index) {
        this.values.splice(index, 1);
        this.changes = true;
    }

    hasChanges() {
        return this.changes;
    }

    getDefaultValue() {
        return this.defaultValue;
    }

    setValue(index, value) {
        this.values[index] = value;
        this.changes = true;
    }

    getList() {
        return [...this.values];
    }

    getValueOrDefault() {
        const values = this.values.map((item) => item.getValueOrDefault()).filter(item => !!item);
        const defaultValues = this.defaultValue.map((item) => item.getValueOrDefault()).filter(item => !!item);

        return values.length > 0 ? values : defaultValues;
    }

    clone() {
        return new ArrayData({ ...this });
    }

    static get Builder() {
        return class Builder {
            constructor(items, defaultValue = []) {
                this.items = items;

                this.defaultValue = defaultValue.length > 0 ?
                    defaultValue.map((item) => this.items.clone().setValue(item).build()) :
                    [this.items.clone().build()];
                this.values = [];
            }

            setValue(value) {
                this.values.push(this.items.clone().setValue(value).build());
                return this;
            }

            build() {
                return new ArrayData(this.items, this.values, this.defaultValue);
            }

            clone() {
                return new Builder(this.items, this.defaultValue);
            }
        }
    }
}

export default ArrayData;