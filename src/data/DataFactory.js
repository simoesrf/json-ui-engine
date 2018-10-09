import GenericData from './GenericData';
import ObjectData from './ObjectData';
import ArrayData from './ArrayData';
import OneOfData from './OneOfData';
import ConstData from './ConstData';

function DataFactory(ValidatorFactory) {
    const create = (schema) => {
        const objType = schema.hasOwnProperty('oneOf') ? 'oneOf' : schema.hasOwnProperty('const') ? 'const' : schema.type;
        let validator = ValidatorFactory.create(schema);

        switch (objType) {
            case 'object':
                const entries = Object.entries(schema.properties);
                const properties = entries.reduce((acc, [prop, value]) => {
                    acc[prop] = create(value);
                    return acc;
                }, {});

                return new ObjectData.Builder(properties, validator);

            case 'array':
                const items = create(schema.items);
                const defaultValues = (schema.default || []).map((value) => items.clone().setValue(value));
                return new ArrayData.Builder(items, defaultValues, validator);

            case 'oneOf':
                const oneOfItems = schema.oneOf.map((item) => create(item));
                return new OneOfData.Builder(oneOfItems, 0, ValidatorFactory.create({}));

            case 'const':
                return new ConstData.Builder(schema.const);

            default:

                return new GenericData.Builder(schema.default, validator);
        }
    }

    return { create };
}



export default DataFactory;
