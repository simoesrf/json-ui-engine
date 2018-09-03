import GenericData from './GenericData';
import ObjectData from './ObjectData';
import ArrayData from './ArrayData';


const create = (schema, value) => {
    const objType = schema.type;
    let builder;
    switch (objType) {
        case 'object':
            const entries = Object.entries(schema.properties);
            const properties = entries.reduce((acc, [prop, value]) => {
                acc[prop] = create(value);
                return acc;
            }, {});

            builder = new ObjectData.Builder(properties);

            if (!!value) {
                const valueEntries = Object.entries(value);
                valueEntries.forEach(([prop, val]) => {
                    builder.setValue(prop, val);
                });
            }

            break;
        case 'array':
            const items = create(schema.items);
            const defaultValues = schema.default && create(schema.default);
            builder = new ArrayData.Builder(items, defaultValues);
            value && value.forEach((item) => builder.setValue(item));
            break;
        default:
            builder = new GenericData.Builder(schema.default);
            builder.setValue(value);
            break;
    }
    return builder;
}

export default { create };