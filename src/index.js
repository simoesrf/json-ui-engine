import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import './style.css';
import SCHEMA from './schema.json';

import DataFactory from './data/DataFactory';
import WidgetFactory from './widgets/WidgetFactory';
import ValidatorFactory from './validators/validator-factory';

class Form extends React.Component {
    state = {
        data: null,
        Widgets: null
    }

    componentDidMount() {
        const { schema } = this.props;

        this.setState({
            data: new DataFactory(ValidatorFactory).create(schema).setValue({
                "name": "Manue",
                "friends": [],
                "test2": {
                    "__id__": "option1",
                    "city": "Portugal"
                }
            }).build(),
            Widgets: new WidgetFactory.create(schema)
        });
    }

    render() {
        const { onDataChange } = this.props;
        const { data, Widgets } = this.state;

        return !!Widgets ? React.cloneElement(Widgets, { data, onDataChange }) : null;
    }
}

class App extends React.Component {
    state = { value: {}, tmp: undefined };

    onDataChange = (_, data) => {
        const value = data.getValueOrDefault();
        this.setState({ value, tmp: JSON.stringify(value, null, '\t') });
    }

    updateValue = (value) => {
        this.setState((prev) => {
            try {
                return { value: JSON.parse(prev.tmp), tmp: value };
            } catch (e) {
                return { tmp: value };
            }
        });
    }

    render() {
        const { value, tmp } = this.state;

        return <div className="main-container">
            <div className="json-schema"><Form schema={SCHEMA} value={value} onDataChange={this.onDataChange} /></div>
            <div className="json-data">
                <textarea value={tmp} />
            </div>

        </div>;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
