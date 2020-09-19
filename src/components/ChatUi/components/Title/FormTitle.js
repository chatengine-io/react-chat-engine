// import React, { Component } from 'react'

// export default class TextInput extends Component {
//     state = {
//         focused: false
//     }

//     render() {
//         const customStyle = this.props.style ? this.props.style : {}
//         const defaultStyle = this.state.focused ? styles.focusInput : styles.input

//         return (
//             // NOTE: You may need to make a div the searchContainer to put icons in...
//             <input 
//                 value={this.props.value} 
//                 placeholder={this.props.label}
//                 style={{ ...defaultStyle, ...customStyle }}
//                 onChange={(e) => this.props.handleChange(e)} 
//                 onBlur={() => this.setState({ focused: false })}
//                 onFocus={() => this.setState({ focused: true })}
//                 type={this.props.type ? this.props.type : "text" }
//             />
//         )
//     }
// }

// const styles = {
//     title: {

//     }
// }