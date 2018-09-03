class ObjectData {
    constructor(properties) {
        this.properties = properties;
    }

    setValue(value) {
        const entries = Object.entries(value);
        entries.forEach(([name, val]) => this.properties[name] = val);
    }

    getProperties() {
        return this.properties;
    }

    getValueOrDefault() {
        const entries = Object.entries(this.properties);
        return entries.reduce((acc, [name, value]) => {
            const val = value.getValueOrDefault();
            if (val) {
                acc[name] = value.getValueOrDefault();
            }
            return acc;
        }, {});
    }

    clone() {
        return new ObjectData({ ...this });
    }

    static get Builder() {
        return class Builder {
            constructor(properties) {
                this.properties = properties;
                this.values = Builder.cloneProps(this.properties);
            }

            static cloneProps(properties) {
                const entries = Object.entries(properties);
                return entries.reduce((acc, [prop, value]) => {
                    acc[prop] = value.clone();
                    return acc;
                }, {});
            }

            setValue(name, value) {
                this.values[name].setValue(value);
                return this;
            }

            build() {
                const entries = Object.entries(this.properties);
                const props = entries.reduce((acc, [name, value]) => {
                    acc[name] = value.build();
                    return acc;
                }, {});
                return new ObjectData(props);
            }

            clone() {
                return new Builder(Builder.cloneProps(this.properties));
            }
        }
    }
}

export default ObjectData;