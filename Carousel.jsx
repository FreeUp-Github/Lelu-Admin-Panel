/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Component } from "react";

export class Carousel extends Component {
  state = {
    active: 0,
  };

  render() {
    const images = this.props.images;
    const activeIdx = this.state.active;
    return (
      <div>
        <div>
          <img
            src={images[activeIdx]}
            width="200px"
            height="200px"
            alt="active"
          />
        </div>
        {images.map((img, idx) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <div
            key={img}
            onClick={() =>
              this.setState({
                active: idx,
              })
            }
            role="img"
          >
            <div>{idx === activeIdx ? "active" : ""}</div>
            <img src={img} alt="thumbnail" width="50px" height="50px" />
          </div>
        ))}
      </div>
    );
  }
}
