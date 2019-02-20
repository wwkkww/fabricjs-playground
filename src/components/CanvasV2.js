import React, { Component } from 'react';
import image2 from './image2.jpg'


class CanvasV2 extends Component {
  constructor(props) {
    super(props);
    this.myImage = React.createRef();
    this.canvas = React.createRef();
  }

  componentDidMount() {
    // const canvas = this.refs.canvas;
    // const ctx = canvas.getContext("2d");
    // ctx.fillStyle = "red";
    // ctx.fillRect(100, 100, 50, 50);

    var canvas = new window.fabric.Canvas('c');
    var imgEl = this.myImage.current;
    var imgInstance = new window.fabric.Image(imgEl, {
      left: 100,
      top: 100,
      angle: 30,
      opacity: 0.5
    })
    
    canvas.add(imgInstance);

    window.fabric.Image.fromURL('/images/lecture1/image2.jpg', (oImg) => {
      oImg.scale(0.3).set('flipX', true);
      canvas.add(oImg);
    });

    // var rect = new window.fabric.Rect({
    //   left: 100,
    //   top: 100,
    //   fill: 'red',
    //   width: 50,
    //   height: 50,
    //   angle: 45
    // });

    // canvas.add(rect);
    // default values
    // rect.get('width'); // 0
    // rect.get('height'); // 0

    // rect.get('left'); // 0
    // rect.get('top'); // 0

    // rect.get('fill'); // rgb(0,0,0)
    // rect.get('stroke'); // null

    // rect.get('opacity'); // 1

    // rect.set({left:50, top:80});
    // canvas.renderAll();
    // rect.set('fill', 'red');
    // rect.set({ strokeWidth: 5, stroke: 'rgba(100,200,200,0.5)' });
    // rect.set('angle', 15).set('flipY', true);
  }

  render() {
    return (
      <div>
        <h1>TEST</h1>
        <canvas id="c" ref={this.canvas} width="500px" height="500px" />
        <img ref={this.myImage} src="/images/lecture1/image2.jpg" alt="myimage" id="myimage" />
      </div>
    )
  }
}

export default CanvasV2