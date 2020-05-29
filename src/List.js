import * as React from 'react';
import './list.css';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.listRef = React.createRef();
        this.state = {
            scrollTop: 0,
            offset: 0,
            length: 20,
            inView: 15,
            avgRowHeight: 40
        }
    }

    renderListItems(offset, length) {
        const {
            data,
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
                                height: rI % 2 === 1 ? `${40}px` : `${40 +20}px`,
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
            } = this.props;

            const {
                offset,
                avgRowHeight
            } = this.state;

            const el = this.listRef.current;
            const topPaddingEl = el.querySelector(".List-topPadding");
            const bottomPaddingEl = el.querySelector(".List-bottomPadding");
            const items = el.querySelectorAll(".List-item");
            const firstItem = el.querySelector(".List-item");

            console.log(avgRowHeight);

            const newScroll = scrollTop - (offset * avgRowHeight);
            let inView = 0;
            let currScroll = 0;
            let i = 0;
            while (i < items.length && currScroll + items[i].clientHeight <= el.clientHeight) {
                const rowHeight = items[i].clientHeight;
                currScroll += rowHeight;
                inView++;
                i++;
            }
            this.setState({
                inView
            })
            if (newScroll >= 0) {
                let currScroll = newScroll;
                let newOffset = offset;
                let newAvgHeight = avgRowHeight;
                let i = 0;
                while (currScroll > items[i].clientHeight) {
                    const rowHeight = items[i].clientHeight;
                    currScroll -= rowHeight;
                    newAvgHeight = Math.floor(((newOffset * newAvgHeight) + (rowHeight)) / (newOffset + 1));
                    newOffset++;
                    i++;
                }
                this.setState({
                    offset: newOffset,
                    avgRowHeight: newAvgHeight
                })
                // if (newScroll > firstItem.clientHeight) {
                //     this.setState({
                //         offset: offset + 1,
                //         avgRowHeight: Math.floor(((offset * avgRowHeight) + (firstItem.clientHeight)) / (offset + 1))
                //     })
                // }
            } else {
                const diff = Math.floor(newScroll / avgRowHeight);
                const newOffset = offset + (diff > -1 ? -1 : diff);
                this.setState({
                    offset: newOffset < 0 ? 0 : newOffset,
                })
            }


            // console.log(scrollTop, firstItem.clientHeight);
            // if (scrollTop - firstItem.clientHeight >= 0) {

            //     this.setState({
            //         scrollTop,
            //         offset: this.state.offset+1,
            //         inView: 15
            //     });
            // }
            // const offset = Math.floor(scrollTop / avgRowHeight);
            // const inView = Math.floor(el.clientHeight / avgRowHeight);
            // console.log(offset, inView);
            // this.setState({
            //     offset: offset < data.length - inView + 1 ? offset : this.state.offset,
            //     inView: inView
            // });
        }

    }

    render() {
        const {
            data,
            avgRowHeight = 40
        } = this.props;

        const {
            scrollTop,
            offset,
            inView,
            length
        } = this.state;

        // console.log(data.length, inView, offset, length);

        return (
            <div ref={this.listRef} className="List" onScroll={this.onScrollHandler.bind(this)}>
                <div
                    className="List-topPadding"
                    style={{
                        height: `${offset * avgRowHeight}px`
                        // height: `${offset * avgRowHeight}px`
                    }}
                />
                {this.renderListItems(offset, length)}
                <div
                    className="List-bottomPadding"
                    style={{
                        height: `${(data.length - inView - offset) * avgRowHeight}px`
                    }}
                />
            </div>
        );
    }
}

export default List;