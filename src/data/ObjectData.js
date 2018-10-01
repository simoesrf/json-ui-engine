class ObjectData {
    constructor(properties, validator) {
        this.properties = properties;
        this._validator = validator;
    }

    setValue(value) {
        const entries = Object.entries(this.getValue());
        this.properties = entries.reduce((acc, [name, val]) => {
            if (name in value) {
                acc[name] = value[name];
            } else {
                acc[name] = val;
            }
            return acc;
        }, {});
        this._validator.validate(this._values);
    }

    getValue() {
        return this.properties;
    }

    getValueOrDefault() {
        const result = Object.entries(this.getValue()).reduce((acc, [name, value]) => {
            acc[name] = value.getValueOrDefault();
            return acc;
        }, {});

        return Object.keys(result).length > 0 ? result : undefined;
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
        return new ObjectData({ ...this });
    }

    hash() { }

    static get Builder() {
        return class Builder {
            constructor(properties, validator) {
                this.properties = properties;
                this._values = Builder.cloneProps(this.properties);
                this._validator = validator;
            }

            static cloneProps(properties) {
                const entries = Object.entries(properties);
                return entries.reduce((acc, [prop, value]) => {
                    acc[prop] = value.clone();
                    return acc;
                }, {});
            }

            setValue(value) {
                const entries = Object.entries(value);

                entries.forEach(([name, value]) => {
                    this._values[name].setValue(value);
                });
                this._validator.validate(this._values);
                return this;
            }

            build() {
                const entries = Object.entries(this.properties);
                const props = entries.reduce((acc, [name, value]) => {
                    acc[name] = value.build();
                    return acc;
                }, {});
                return new ObjectData(props, this._validator);
            }

            clone() {
                const propCloned = Builder.cloneProps(this.properties, this._validator);
                return new Builder(propCloned, this._validator);
            }
        }
    }
}

export default ObjectData;