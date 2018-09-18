import React from 'react';

import StringWidget from "./StringWidget";
import ObjectWidget from './ObjectWidget';
import ArrayWidget from './ArrayWidget';
import NumberWidget from './NumberWidget';
import IntegerWidgetHOC from './IntegerWidgetHOC';
import ValidationsHOC from './ValidationsHOC';
import NullWidget from './NullWidget';
import OneOfWidget from './OneOfWidget';

const IntegerWidget = IntegerWidgetHOC(NumberWidget);

const create = (schema, name) => {
    const objType = schema.hasOwnProperty('oneOf') ? 'oneOf' : schema.type;
    let Widget;

    switch (objType) {
        case 'object':
            const propEntries = Object.entries(schema.properties);
            const properties = propEntries.reduce((acc, [prop, value]) => {
                acc[prop] = create(value, prop);
                return acc;
            }, {})

            Widget = ValidationsHOC(ObjectWidget);
            return <Widget name={name} title={schema.title} description={schema.description} properties={properties} />
        case 'array':
            const item = create(schema.items, name);
            Widget = ValidationsHOC(ArrayWidget);
            return <Widget name={name} title={schema.title} description={schema.description} item={item} />
        case 'integer':
            Widget = ValidationsHOC(IntegerWidget);
            return <Widget name={name} title={schema.title} description={schema.description} />;
        case 'number':
            Widget = ValidationsHOC(NumberWidget);
            return <Widget name={name} title={schema.title} description={schema.description} />;
        case 'string':
            Widget = ValidationsHOC(StringWidget);
            return <Widget name={name} title={schema.title} description={schema.description} />;
        case 'oneOf':
            Widget = ValidationsHOC(OneOfWidget);
            return <Widget name={name} title={schema.title} description={schema.description} />;
        default:
            Widget = ValidationsHOC(NullWidget);
            return <Widget name={name} title={schema.title} description={schema.description} />
    }
}

export default { create };