import React, { Component } from 'react'

class Authentication extends Component {
    render() {
        if (!this.props.login) return null;
        console.log(this.props);
        return (
            <div>

            </div>
        )
    }
}

export default Authentication