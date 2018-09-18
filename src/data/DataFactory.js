import GenericData from './GenericData';
import ObjectData from './ObjectData';
import ArrayData from './ArrayData';

function DataFactory(ValidatorFactory) {
    const create = (schema, data) => {
        const objType = schema.type;

        switch (objType) {
            case 'object':
                const entries = Object.entries(schema.properties);
                const properties = entries.reduce((acc, [prop, value]) => {
                    acc[prop] = create(value, data && data[prop]);
                    return acc;
                }, {});

                return new ObjectData.Builder(properties, ValidatorFactory.create(schema));

            case 'array':
                const items = create(schema.items);
                const defaultValues = schema.default && create(schema.default, data || []);
                return new ArrayData.Builder(items, defaultValues, ValidatorFactory.create(schema));

            default:
                let validator = ValidatorFactory.create(schema);
                validator = ValidatorFactory.create(schema);
                const builder = new GenericData.Builder(schema.default, validator);
                builder.setValue(data);
                return builder;
        }
    }

    return { create };
}



export default DataFactory;
