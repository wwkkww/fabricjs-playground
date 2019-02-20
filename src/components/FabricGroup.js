import React, { Component } from 'react'

class FabricGroup extends Component {
  constructor(props) {
    super(props);
    this.myCanvas = React.createRef();
    this.state = {
      isDrawing: false
    }

  }

  componentDidMount() {
    var canvas = new window.fabric.Canvas('c');

    var circle = new window.fabric.Circle({
      radius: 100,
      fill: '#eef',
      scaleY: 0.4, //vertically squeezed 
      originX: 'center',
      originY: 'center'
    });

    var text = new window.fabric.Text('hello world', {
      fontSize: 30,
      originX: 'center',
      originY: 'center'
    });

    var group = new window.fabric.Group([circle, text], {
      left: 200,
      top: 200,
      angle: -40
    });


    canvas.add(group);

    group.item(0).set('fill', 'red');
    group.item(1).set({
      text: 'trololo',
      fill: 'white'
    });

    // canvas.clear().renderAll();
    canvas.add(group);

    canvas.isDrawingMode = true;

    canvas.add(new window.fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
    // canvas.backgroundColor = 'rgba(0,0,255,0.3)';
    canvas.setBackgroundImage('/images/lecture1/image2.jpg', canvas.renderAll.bind(canvas));
    // canvas.renderAll();

  }

  freeDrawing = () => {
    this.setState(prevState => ({
      isDrawing: !prevState.isDrawing
    }))

    var canvas = new window.fabric.Canvas('c');
    canvas.isDrawingMode = true;
    canvas.add(new window.fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
    // canvas.backgroundColor = 'rgba(0,0,255,0.3)';
    canvas.setBackgroundImage('/images/lecture1/image2.jpg', canvas.renderAll.bind(canvas));
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <canvas id="c" ref={this.myCanvas} width="800px" height="500px" style={{ border: "1px solid #000000" }} />
        <button onClick={() => this.freeDrawing()}>Draw</button>
      </div>

    )
  }
}

export default FabricGroup