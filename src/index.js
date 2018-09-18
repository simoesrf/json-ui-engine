import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import './style.css';
import SCHEMA from './schema.json';

import DataFactory from './data/DataFactory';
import WidgetFactory from './widgets/WidgetFactory';
import ValidatorFactory from './validators/validator-factory';

class App extends React.Component {

    state = {
        value: null,
        data: new DataFactory(ValidatorFactory).create(SCHEMA).build(),
        Widgets: new WidgetFactory.create(SCHEMA)
    };

    onDataChange = (_, value) => {
        this.setState({ data: value });
        console.log(value.getValueOrDefault());
    }

    render() {
        const { data, Widgets } = this.state;
        return React.cloneElement(Widgets, { data, onDataChange: this.onDataChange });
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
