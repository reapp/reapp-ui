## InputArray

An array of inputs component for reapp-ui

### Usage

For an array of inputs:

```javascript
import { React, Reapp, InputArray } from 'reapp-kit';
export class chooseColor extends React.Component {
  constructor(props, context) {

    this.styles = {
      phoneInputContainerStyles: {
        maxHeight: '120px',
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch',
      },
      phoneInputStyles: {
        color: "",
      }
    }

    var owner = {};
    var owner.phoneNumbers = [
      {number: '3175551234'},
      {number: '3175559191'},
      {number: '3175559134'}
    ];

    var phoneArray = owner.phoneNumbers.map((item, index) => {
      return ({
        defaultValue: item.number,
        disabled: false,
        validator: 'phone',
        type: 'tel',
      })
    });

    this.setState({
      phoneArray: phoneArray,
    });

  }

  updatePhoneArray(phoneArray) {
    this.setState({
      phoneArray: phoneArray,
    });
  }

  addPhoneArray(phoneArray) {
    var addedIndex = phoneArray.length - 1;
    React.findDOMNode(this.refs.phoneInputArray.refs.inputArrayInputs.refs[phoneArray[addedIndex].inputName]).focus();
  }

  render(
    <InputArray ref="phoneInputArray"
                inputs={this.state.phoneArray}
                disabled={false}
                inputsCb={this.updatePhoneArray}
                inputContainerStyles={this.styles.phoneInputContainerStyles}
                inputStyles={this.styles.phoneInputStyles}
                defaultValidator="phone"
                addInputCb={this.addPhoneArray}
                addInputChromeless={true}
                addInputIcon={addInputIcon}
                addInputTextStyles={this.styles.addPhoneInputTextStyles}
                addInputText="Add Number"
                addInputType="tel" />
  );
}
```

### API

#### InputArray(props)

Type: React Component

Basic InputArray input list.

##### props.inputs

Type: `Array of Objects`
Default: []
Allowed Keys: `defaultValue`, `disabled`, `validator`, `type`

Pass in html to be shown for each input array item into the "defaultValue" property.

##### props.disabled

Type: `Bool`

Indicates whether the input array should be disabled or enabled (for read only/editable).

##### props.inputsCb

Type: `Func`

A function to run on the returned input array. This would be a good place to set state for your input array.

##### props.phoneInputContainerStyles

Type: `Object`

An object containing custom styles for the container element of the input array.

##### props.inputStyles

Type: `Object`

An object containing custom styles for the input elements of each item in the input array.

##### props.defaultValidator

Type: `String`

Use a default validation method instead of a seperate validation for each input element.

##### props.addInputCb

Type: `Function`

Callback to perform UI changes once the input array has updated.

##### props.addInputChromeless

Type: `Bool`

Ability to make the input elements chromeless.

##### props.addInputIcon

Type: `Object`

Add an image to the "New Input" button.

##### props.addInputTextStyles

Type: `Object`

Style the "New Input" button.

##### props.addInputType

Type: `String`

Specify a type for the input.
