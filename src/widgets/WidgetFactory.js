import React from "react";

import StringWidget from "./StringWidget";
import ObjectWidget from "./ObjectWidget";
import ArrayWidget from "./ArrayWidget";
import NumberWidget from "./NumberWidget";
import IntegerWidgetHOC from "./IntegerWidgetHOC";
import ValidationsHOC from "./ValidationsHOC";
import NullWidget from "./NullWidget";
import OneOfWidget from "./OneOfWidget";
import Dropdown from "./Dropdown";

const IntegerWidget = IntegerWidgetHOC(NumberWidget);

const create = (schema, name) => {
  let objType = schema.type;

  if (schema.hasOwnProperty("oneOf")) {
    objType = "oneOf";
  } else if (schema.hasOwnProperty("enum")) {
    objType = "enum";
  }

  let Widget;

  switch (objType) {
    case "object":
      const propEntries = Object.entries(schema.properties);
      const objChildren = propEntries.reduce((acc, [prop, value]) => {
        acc[prop] = create(value, prop);
        return acc;
      }, {});

      Widget = ValidationsHOC(ObjectWidget);
      return (
        <Widget
          name={name}
          title={schema.title}
          description={schema.description}
          properties={objChildren}
        />
      );
    case "array":
      const item = create(schema.items, name);
      Widget = ValidationsHOC(ArrayWidget);
      return (
        <Widget
          name={name}
          title={schema.title}
          description={schema.description}
          item={item}
        />
      );
    case "integer":
      Widget = ValidationsHOC(IntegerWidget);
      return (
        <Widget
          name={name}
          title={schema.title}
          description={schema.description}
        />
      );
    case "number":
      Widget = ValidationsHOC(NumberWidget);
      return (
        <Widget
          name={name}
          title={schema.title}
          description={schema.description}
        />
      );
    case "string":
      Widget = ValidationsHOC(StringWidget);
      return (
        <Widget
          name={name}
          title={schema.title}
          description={schema.description}
        />
      );
    case "oneOf":
      const oneOfChildren = schema.oneOf.map(element => create(element));
      const { options } = schema.__ui__;
      Widget = ValidationsHOC(OneOfWidget);
      return (
        <Widget
          name={name}
          title={schema.title}
          description={schema.description}
          options={options}
          properties={oneOfChildren}
        />
      );

    case "enum": {
      Widget = ValidationsHOC(Dropdown);

      return (
        <Widget
          name={name}
          title={schema.title}
          description={schema.description}
          options={schema.enum}
        />
      );
    }

    default:
      Widget = ValidationsHOC(NullWidget);
      return (
        <Widget
          name={name}
          title={schema.title}
          description={schema.description}
        />
      );
  }
};

export default { create };
