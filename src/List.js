import * as React from 'react';
import './list.css';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
      offset: 0,
      length: 30,
      avgRowHeight: 40,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.init !== this.state.init) {
      this.setState({ inView: this.listRef.scrollHeight / this.state.avgRowHeight });
    }

    if (prevState.offset > this.state.offset && this.state.offset > 0) {
      const el = this.listRef;
      const items = el.querySelectorAll(".List-item");
      const diff = prevState.offset - this.state.offset;
      let height = 0;

      for (let i = 0; i < diff && i < items.length; i++) {
        height += items[i].clientHeight;
      }
      const newAvgHeight = ((this.state.avgRowHeight * prevState.offset) - (height)) / this.state.offset;
      this.setState({
        avgRowHeight: newAvgHeight,
      });
    }
  }

  renderListItems(offset, length) {
    const {
      data,
    } = this.props;

    const renderedData = data.slice(offset, offset + length);

    return (
      <>
        {renderedData.map((d, index) => {
          const rI = offset + index;
          return (
            <div
              className="List-item"
              key={rI}
              style={{
                height: rI % 2 === 1 ? `${40}px` : `${40 + (rI % 5) * 20}px`,
                background: rI % 2 === 1 ? 'white' : '#d5d5d5'
              }}
            >
              <p>{d}</p>
            </div>
          )
        })}
      </>
    )
  }

  onScrollHandler() {
    if (this.listRef) {
      const {
        data,
      } = this.props;

      const {
        offset,
        avgRowHeight
      } = this.state;

      const el = this.listRef;
      const { scrollTop } = el;
      const items = el.querySelectorAll(".List-item");

      const newScroll = Math.floor(scrollTop - (offset * avgRowHeight));
      let inView = 0;
      let currScroll = 0;
      let i = 0;
      while (i < items.length && currScroll + items[i].clientHeight <= el.clientHeight) {
        const rowHeight = items[i].clientHeight;
        currScroll += rowHeight;
        inView++;
        i++;
      }

      if (newScroll > 0) {
        let currScroll = newScroll;
        let newOffset = offset;
        let newAvgHeight = avgRowHeight;
        let i = 0;
        while (i < items.length && currScroll >= items[i].clientHeight) {
          const rowHeight = items[i].clientHeight;
          currScroll -= rowHeight;
          newAvgHeight = ((newOffset * newAvgHeight) + (rowHeight)) / (newOffset + 1);
          newOffset++;
          i++;
        }

        newOffset = newOffset < data.length - inView ? newOffset : data.length - inView - 1;
        if (newOffset > offset) {
          this.setState({
            inView,
            offset: newOffset,
            avgRowHeight: newAvgHeight,
          })
        }
      } else {
        if (avgRowHeight) {
          const diff = Math.floor(newScroll / avgRowHeight) || -1;
          const newOffset = offset + diff;
          if (newOffset < offset) {
            this.setState({
              inView,
              offset: newOffset < 0 ? 0 : newOffset,
            })
          }
        }
      }
    }

  }

  render() {
    const {
      data,
    } = this.props;

    const {
      offset,
      inView,
      length,
      avgRowHeight
    } = this.state;

    const buffer = 5;

    const topPadding = Math.max(0, (offset - buffer) * avgRowHeight);
    const bottomPadding = Math.max(0, (data.length - inView - (offset + buffer) - 1) * avgRowHeight);

    return (
      <div
        ref={(el) => {
          this.listRef = el;
          if (el && !this.state.init) this.setState({ init: true });
        }}
        className="List"
        onScroll={this.onScrollHandler.bind(this)}
      >
        <div
          className="List-topPadding"
          style={{
            height: topPadding
          }}
        />
        {this.renderListItems(Math.max(0, offset - buffer), length)}
        <div
          className="List-bottomPadding"
          style={{
            height: bottomPadding
          }}
        />
      </div>
    );
  }
}

export default List;