import React, { Component } from 'react'

class FabricSerialization extends Component {
  constructor(props) {
    super(props);
    this.myCanvas = React.createRef();
  }

  componentDidMount() {
    var canvas = new window.fabric.Canvas('c');

    canvas.loadFromJSON('{"version":"2.4.6","objects":[{"type":"rect","version":"2.4.6","originX":"left","originY":"top","left":50,"top":50,"width":20,"height":20,"fill":"green","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"circle","version":"2.4.6","originX":"left","originY":"top","left":100,"top":100,"width":100,"height":100,"fill":"red","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"radius":50,"startAngle":0,"endAngle":6.283185307179586}]}')
    // canvas.add(new window.fabric.Rect({
    //   left: 50,
    //   top: 50,
    //   height: 20,
    //   width: 20,
    //   fill: 'green'
    // }));

    // canvas.add(new window.fabric.Circle({
    //   left: 100,
    //   top: 100,
    //   radius: 50,
    //   fill: 'red'
    // }));
    // console.log("Stringify: ", JSON.stringify(canvas));
    // console.log("ToSVG: ", canvas.toSVG());
    // canvas.add(group);

  }

  render() {
    return (
      <div>
        <canvas id="c" ref={this.myCanvas} width="800px" height="500px" style={{ border: "1px solid #000000" }} />
      </div>


    )
  }
}

export default FabricSerialization