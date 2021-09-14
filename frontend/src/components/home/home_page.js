import React from 'react';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <h1 className="form-header">Welcome, {this.props.user}</h1>
            </div>
        )
    }
}

export default HomePage;