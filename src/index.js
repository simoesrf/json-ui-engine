import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import './style.css';

import DataFactory from './data/DataFactory';
import WidgetFactory from './views/WidgetFactory';
import Header from './views/Header';

const schema = {
    "$id": "https://example.com/person.schema.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Person",
    "type": "object",
    "properties": {
        "firstName": {
            "type": "string",
            "default": "FirstName",
            "description": "The person's first name."
        },
        "lastName": {
            "type": "string",
            "default": "LastName",
            "description": "The person's last name."
        },
        "age": {
            "description": "Age in years which must be equal to or greater than zero.",
            "type": "integer",
            "minimum": 0,
            "default": 100
        },
        "hobbies": {
            "title": "Hobbies",
            "description": "A list of hobbies that you like",
            "type": "array",
            "items": {
                "type": "string"
            }
        }
    }
}

class App extends React.Component {
    state = {
        schema: JSON.stringify(schema),
        data: DataFactory.create(schema).build(),
        WidgetTree: WidgetFactory.create(schema),
        value: null
    }

    onDataChange = (name, value) => {
        console.log(name, value.getValueOrDefault())
        this.setState({ data: value, value: value.getValueOrDefault() });
    }

    onSchemaChange = ({ target: { value } }) => {
        try {
            const schema = JSON.parse(value);
            this.setState((prevState) => {

                return {
                    schema: value,
                    data: DataFactory.create(schema, prevState.value).build(),
                    WidgetTree: WidgetFactory.create(schema)
                };
            });
        } catch (e) {
            this.setState({
                schema: value
            });
        }
    }

    onInputDataChange = ({ target: { value } }) => {
        try {
            this.setState((prevState) => {
                const schema = JSON.parse(prevState.schema);
                return {
                    value: JSON.parse(value),
                    data: DataFactory.create(schema, JSON.parse(value)).build(),
                    WidgetTree: WidgetFactory.create(schema)
                };
            });
        } catch (e) {
            this.setState({
                value: JSON.parse(value)
            });
        }
    }

    render() {
        const { schema = '', data, WidgetTree, value = '' } = this.state;

        return <div className="main-container">
            <Header title="JSON Schema" />
            <textarea value={schema} onChange={this.onSchemaChange} className="json-schema"></textarea>
            <Header title="JSON Data" />
            <textarea value={JSON.stringify(value)} onChange={this.onInputDataChange} className="json-data"></textarea>
            {React.cloneElement(WidgetTree, { data, onDataChange: this.onDataChange })}
        </div>;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
