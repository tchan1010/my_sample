// InputButton.js

import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Style from './Style';

export default class InputButton extends Component {
    
    render() {
        return (
           <TouchableHighlight style={[this.props.style,
                      this.props.backgroundColor,
                      this.props.highlight ? Style.inputButtonHighlighted : null]}
                      underlayColor="#193441"
                      onPress={this.props.onPress}>
                <Text style={this.props.textStyle}>{this.props.value}</Text>
            </TouchableHighlight>
        )
    }
}
