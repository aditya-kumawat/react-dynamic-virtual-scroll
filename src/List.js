import * as React from 'react';
import './list.css';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.listRef = React.createRef();
        this.state = {
            offset: 0,
            length: 20,
            inView: 0
        }
    }

    renderListItems(offset, length) {
        const {
            data,
            minRowHeight = 40
        } = this.props;

        const renderedData = data.slice(offset, offset + length);

        return (
            <>
                {data.slice(offset, offset + length).map((d, index) => {
                    const rI = offset + index;
                    return (
                        <div
                            className="List-item"
                            key={rI}
                            style={{
                                height: rI % 2 === 1 ? `${minRowHeight}px` : `${minRowHeight}px`,
                                background: rI % 2 === 1 ? 'white' : '#d5d5d5'
                            }}
                        >
                            {/* <p>{d.firstName}</p> */}
                            <p>List item:- {rI}</p>
                        </div>
                    )
                })}
            </>
        )
    }

    onScrollHandler({ target: { scrollTop } }) {
        if (this.listRef.current) {
            const {
                data,
                minRowHeight = 40
            } = this.props;

            const el = this.listRef.current;
            const topPaddingEl = el.querySelector(".List-topPadding");
            const bottomPaddingEl = el.querySelector(".List-bottomPadding");

            const offset = Math.floor(scrollTop / minRowHeight);
            const inView = Math.floor(el.clientHeight / minRowHeight);
            this.setState({
                offset: offset < data.length - inView + 1 ? offset : this.state.offset,
                inView: inView
            });
        }

    }

    render() {
        const {
            data,
            minRowHeight = 40
        } = this.props;

        const {
            offset,
            inView,
            length
        } = this.state;

        console.log(data.length, inView, offset, length);

        return (
            <div ref={this.listRef} className="List" onScroll={this.onScrollHandler.bind(this)}>
                <div
                    className="List-topPadding"
                    style={{
                        height: `${offset * minRowHeight}px`
                    }}
                />
                {this.renderListItems(offset, length)}
                <div
                    className="List-bottomPadding"
                    style={{
                        height: `${(data.length - inView - offset) * minRowHeight}px`
                    }}
                />
            </div>
        );
    }
}

export default List;