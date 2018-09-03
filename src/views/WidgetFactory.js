import React from 'react';

import StringWidget from "./StringWidget";
import ObjectWidget from './ObjectWidget';
import ArrayWidget from './ArrayWidget';

const create = (schema, name) => {
    const objType = schema.type;

    switch (objType) {
        case 'object':
            const propEntries = Object.entries(schema.properties);
            const properties = propEntries.reduce((acc, [prop, value]) => {
                acc[prop] = create(value, prop);
                return acc;
            }, {})
            return <ObjectWidget name={name} title={schema.title} description={schema.description} properties={properties} />
        case 'array':
            const item = create(schema.items, name);
            return <ArrayWidget name={name} title={schema.title} description={schema.description} item={item} />
        case 'string':
            return <StringWidget name={name} title={schema.title} description={schema.description} />;
        default:
            return <React.Fragment />
    }
}

export default { create };