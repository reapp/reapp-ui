# typeahead

> A typeahead/autocomplete component for reapp-ui

## Usage

For a typeahead input:

```javascript
import { React, Reapp, Typeahead } from 'reapp-kit';
export class chooseColor extends React.Component {
  constructor(props, context) {

    this.colors = [
      { displayElements: '<div>Apricot</div>', display: 'Apricot', value: [0] },
      { displayElements: '<div>Beige</div>', display: 'Beige', value: [1] },
      { displayElements: '<div>Black</div>, display: 'Black', value: [2] },
      { displayElements: '<div>Blonde</div>', display: 'Blonde', value: [3] },
      { displayElements: '<div>Blue</div>', display: 'Blue', value: [4] },
      { displayElements: '<div>Blue Merle</div>', display: 'Blue Merle', value: [5] },
      { displayElements: '<div>Brindle</div>', display: 'Brindle', value: [6] }

  }

  render(
    <Typeahead
      ref="color"
      disabled={(this.state.mode == 0)?true:false}
      name="colorTypeahead"
      placeholder='Color'
      className="flex colorTypeahead"
      inputStyles={this.styles.inputStyles}
      listStyles={this.styles.colorTypeaheadListStyles}
      allowCustomValues={1}
      staticCustomValue={null}
      defaultValue={this.state.colorActive}
      customValue=""
      options={this.colors}
      maxVisible={0}
      onOptionSelected={this.colorSelected}
      clearOnOptionSelected={false}/>
  );
}
```

## API

### Typeahead(props)

Type: React Component

Basic typeahead input and results list.

#### props.options

Type: `Array of Objects`
Default: []
Allowed Keys: `displayElements`, `display`, `value`

Pass in html to be shown for each list item into the "displayElements" property, pass in what gets shown in the typeahead input box into the "display" property, and pass in the value that gets sent back into the "value" property of each array element.

#### props.defaultValue

Type: `String`

A default value used when the component has no value. If it matches any options a option list will show.

#### props.maxVisible

Type: `Number`

Limit the number of options rendered in the results list.

#### props.listStyles

Type: `Object`

An object containing custom styles for the list of elements that is shown in the typeahead.

#### props.placeholder

Type: `String`

Placeholder text for the typeahead input.

#### props.onKeyDown

Type: `Function`

Event handler for the `keyDown` event on the typeahead input.

#### props.onBlur

Type: `Function`

Event handler for the `blur` event on the typeahead input.

#### props.onFocus

Type: `Function`

Event handler for the `focus` event on the typeahead input.

#### props.onOptionSelected

Type: `Function`

Event handler triggered whenever a user picks an option.

#### props.clearOnOptionSelected

Type: `bool`

Depict if the typeahead input box should be cleared when an option is selected.

#### props.disabled

Type: `bool`

Depict if the typeahead input box should be disabled, and only show default value.

#### props.filterOption

Type: `String` or `Function`

A function to filter the provided `options` based on the current input value. For each option, receives `(inputValue, option)`. If not supplied, defaults to [fuzzy string matching](https://github.com/mattyork/fuzzy).

If provided as a string, it will interpret it as a field name and fuzzy filter on that field of each option object.

#### props.staticCustomValue

Type: `String`

Set the default customValue display property.

## Developing

### Setting Up

You will need to get a reapp project up and running to use the typeahead component.

```

### Contributing

Basically, fork the repository and send a pull request.  It can be difficult to review these, so
here are some general rules to follow for getting your PR accepted more quickly:

- All new properties and exposed component function should be documented in the README.md
- Break your changes into smaller, easy to understand commits.
- Send separate PRs for each commit when possible.
- Feel free to rebase, merge, and rewrite commits to make them more readible.
- Add comments explaining anything that's not painfully obvious.
- Add unittests for your change if possible.

[reactecf]: https://facebook.github.io/react/tips/expose-component-functions.html
