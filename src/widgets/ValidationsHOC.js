import React from 'react';


const ValidationsHOC = (WrappedComponent) => {

    return ({ ...props }) => {
        const { data } = props;
        return <div className={`widget-error-report ${data.isInvalid() && 'hasErrors'}`}>
            <WrappedComponent {...props} />
            <ul>
                {data.errors().map((error, index) => <li key={index} className="widget-error-item">{error}</li>)}
            </ul>
        </div>
    }
}

export default ValidationsHOC;