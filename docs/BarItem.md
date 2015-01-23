### BarItem

Item on a Bar.

- `children` used for text
- `icon` string or element
- `display`:
  - text: Text only
  - icon: Icon only
  - icon-text: Icon above text
  - icon-text-right: Icon left of text

Props:
```
propTypes: {
  icon: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  iconProps: React.PropTypes.object,
  children: React.PropTypes.string,
  display: React.PropTypes.oneOf([
    'text', 'icon', 'icon-text', 'icon-text-right'
  ]),
  active: React.PropTypes.bool
}
```