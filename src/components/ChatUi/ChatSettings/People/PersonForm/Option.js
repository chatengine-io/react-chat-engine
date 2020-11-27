import React from 'react';


export default class Option extends React.Component {
    state = {
        focused: false
    }

    render() {
        return (
            <div 
                onMouseEnter={() => this.setState({ focused: true })}
                onMouseLeave={() => this.setState({ focused: false })}
                onClick={() => this.props.onClick && this.props.onClick()}
                style={{ ...styles.option, ...{ backgroundColor: this.state.focused ? '#f5f5f5' : 'white'} }}
            >
                {this.props.text}
            </div>
        );
    }
}

const styles = {
  option: {
    borderRadius: '24px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '15px'
  },
}