## react-dynamic-virtual-scroll

React component available to implement virtual-scroll at any page without worrying about the dynamic item height.

You can play with the library over here: [Codesandbox](https://codesandbox.io/s/virtual-scroll-simple-list-27om6)

### Installation

```js
npm install react-dynamic-virtual-scroll
```

No external dependencies so no need to worry about security and package size.

### Usage

- Import component.

  ```jsx
  import VirtualScroll from "react-dynamic-virtual-scroll";
  ```

- Add component as follows in your render method:

  ```jsx
  <VirtualScroll
      className="List"
      minItemHeight={40}
      totalLength={100}
      renderItems={(start, end) => {
          return Array.from({ length: end - start + 1 }, (_, index) => {
            const rowIndex = start + index;
            return (
              <div
                key={rowIndex}
                className="List-item"
              >
                <h3>List item: {rowIndex}</h3>
              </div>
            );
          })
      }}
  />
  ```

### Props Table

| name          | type                            | required | default | description                                                  |
| ------------- | ------------------------------- | -------- | ------- | ------------------------------------------------------------ |
| minItemHeight | number                          | true     |         | Minimum item height to calculate the placeholder spacing.    |
| totalLength   | number                          | true     |         | Total number of items to be rendered.                        |
| renderItems   | (start, end) => React.ReactNode | true     |         | Callback to render items for specified index values. Both 'start' and 'end' are inclusive. |
| length        | number                          |          | 30      | Total number of items to be rendered in the dom.             |
| buffer        | number                          |          | 10      | Total number of items to be rendered in the dom before and after your required dom items. |

