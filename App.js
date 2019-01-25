/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';
import Style from './Style.js';
import InputButton from './InputButton';

// Define the input buttons that will be displayed in the calculator.
const inputButtons = [
    ['AC', 'BP',  '+/-', '%'], 
    [7, 8, 9, '/'],
    [4, 5, 6, '*'],
    [1, 2, 3, '-'],
    [0, '.', '=', '+']
];


export default class App extends Component<Props> {

  constructor(props) {
        super(props);
        
        this.state = {
            previousInputValue: 0,
            inputValue: 0,
            selectedSymbol: null,
            base : 10,
            sign : 1
        }
   }
  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.blankContainer}>
        </View>
        <View style={Style.displayContainer}>
              <Text style={Style.displayText}>{this._composeOutput()}</Text>
        </View>
        <View style={Style.inputContainer}>
             {this._renderInputButtons()}
        </View>
        <View style={Style.blankContainer}>
        </View>
      </View>
    );
  }
   _composeOutput() {
       if (this.state.selectedSymbol != null) {
          if (this.state.inputValue != 0) {
              return this.state.previousInputValue + this.state.selectedSymbol +
                    this.state.inputValue
          }
          else {
              return this.state.previousInputValue + this.state.selectedSymbol 
          }

       }
       else {
           return this.state.inputValue
       }
   }
   /**
     * For each row in `inputButtons`, create a row View and add create an InputButton for each input in the row.
   **/
    _renderInputButtons() {
        let views = [];

        for (var r = 0; r < inputButtons.length; r ++) {
            let row = inputButtons[r];

            let inputRow = [];
            for (var i = 0; i < row.length; i ++) {
                let input = row[i];

                if ((typeof input) == 'number' || input.indexOf(".") != -1) {
                      inputRow.push(
                           <InputButton value={input}
                              highlight={this.state.selectedSymbol === input}
                              style={Style.inputButton} 
                              backgroundColor={Style.whiteButton}
                              textStyle={Style.inputButtonText}
                              onPress={this._onInputButtonPressed.bind(this, input)}
                              key={r + "-" + i}/>
                            );
                } else if (input.indexOf("AC") != -1) {
                      inputRow.push(
                           <InputButton value={input}
                              highlight={this.state.selectedSymbol === input}
                              style={Style.inputButton} 
                              backgroundColor={Style.redButton}
                              textStyle={Style.keyButtonText}
                              onPress={this._onInputButtonPressed.bind(this, input)}
                              key={r + "-" + i}/>
                            );

                } else if (input.indexOf("BP") != -1) {
                      inputRow.push(
                           <InputButton value={input}
                              highlight={this.state.selectedSymbol === input}
                              style={Style.inputButton} 
                              backgroundColor={Style.yellowButton}
                              textStyle={Style.inputButtonText}
                              onPress={this._onInputButtonPressed.bind(this, input)}
                              key={r + "-" + i}/>
                            );

                } else if (input.indexOf("=") != -1) {
                      inputRow.push(
                           <InputButton value={input}
                              highlight={this.state.selectedSymbol === input}
                              style={Style.inputButton} 
                              backgroundColor={Style.greenButton}
                              textStyle={Style.keyButtonText}
                              onPress={this._onInputButtonPressed.bind(this, input)}
                              key={r + "-" + i}/>
                            );

                } else {
                      inputRow.push(
                           <InputButton value={input}
                              highlight={this.state.selectedSymbol === input}
                              style={Style.inputButton} 
                              backgroundColor={Style.orangeButton}
                              textStyle={Style.keyButtonText}
                              onPress={this._onInputButtonPressed.bind(this, input)}
                              key={r + "-" + i}/>
                            );
                }
            }

            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
        }

        return views;
    }
     _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input)
            case 'string':
                return this._handleStringInput(input)
        }
    }
    _handleNumberInput(num) {
        var inputValue = 0
        if (this.state.base == 10) {
          inputValue = (this.state.inputValue * this.state.base) + (this.state.sign * num);
        } 
        else {
           let str = String(this.state.inputValue)
           if (str.indexOf(".") == -1) {
              inputValue = parseFloat(this.state.inputValue + '.' + num)
           }
           else {
              str = str + String(num)
              inputValue = parseFloat(str)
           }
        }
        this.setState({ inputValue: inputValue })
     }
     _handleStringInput(str) {
        if (str.indexOf(".") != -1) {
                if (this.state.base < 10) {
                   alert("Decimal point pressed already")
                }
                else {
                   this.setState( { base : 0.1 } )
                }
        }
        else if (str.indexOf("BP") != -1) {
                  let str = String(this.state.inputValue * this.state.sign)
                  if (this.state.inputValue == 0 && this.state.selectedSymbol != null) {
                      let old = this.state.previousInputValue
                      this.setState( {
                          selectedSymbol: null,
                          previousInputValue: 0,
                          inputValue: old,
                          base: String(old).indexOf('.') == -1 ? 10 : 0.1,
                          sign: old >= 0 ? 1 : -1
                      });
                  }
                  else if (str.length > 1) {
                     let val = parseFloat(str.substr(0,str.length-1)) * this.state.sign
                     let base = 10
                     if (String(val).indexOf(".") != -1) {
                         base = 0.1
                     }
                     this.setState({
                          inputValue : val,
                          base : base 
                     });
                  }
                  else {
                     this.setState({
                          inputValue : 0,
                          base : 10, 
                          sign : 1
                     });
                  }
        }
        else if (str.indexOf("AC") != -1) {
                this.setState({
                    selectedSymbol: null,
                    previousInputValue: 0,
                    inputValue: 0,
                    base: 10,
                    sign: 1
                });
        }
        else if (str.indexOf("+/-") != -1) {
                this.setState({
                   inputValue : -this.state.inputValue,
                   sign : this.state.sign * -1
                 });
        }
        else if (str.indexOf("=") != -1) {
                this._evalEqual()
        }
        else {
                if (this.state.selectedSymbol != null) {
                   alert("Operator has been entered") 
                }
                else {
                   this.setState({
                      selectedSymbol: str,
                      previousInputValue: this.state.inputValue,
                      inputValue: 0,
                      base: 10,
                      sign: 1
                  });
                }
        }
    }
    _evalEqual() {
                let symbol = this.state.selectedSymbol,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;
                if (!symbol) {
                    return;
                }
                let result = eval(previousInputValue + symbol + inputValue)
                this.setState({
                    previousInputValue: 0,
                    inputValue: result,
                    selectedSymbol: null,
                    base: 10,
                    sign: 1
                });
                if (result < 0) {
                     this.setState( { sign: -1 })
                }
                else {
                     this.setState( { sign: 1 })
                }
                let str = String(result)
                if (str.indexOf(".") >= 0) {
                    this.setState( { base : 0.1 } ) 
                }
                else {
                    this.setState( { base : 10 } ) 
                }

    }
}
