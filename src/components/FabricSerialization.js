import React, { Component } from 'react'
import { fabric } from 'fabric';

var canvas

class FabricSerialization extends Component {
  constructor(props) {
    super(props);
    this.myCanvas = React.createRef();
  }

  componentDidMount() {
    canvas = new fabric.Canvas('c');

    canvas.backgroundColor = 'red';

    // canvas.loadFromJSON('{"objects":[{"type":"rect","version":"2.4.6","originX":"left","originY":"top","left":50,"top":50,"width":20,"height":20,"fill":"green","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"circle","version":"2.4.6","originX":"left","originY":"top","left":100,"top":100,"width":100,"height":100,"fill":"red","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"radius":50,"startAngle":0,"endAngle":6.283185307179586}]}')

    // canvas.add(new fabric.Rect({
    //   left: 50,
    //   top: 50,
    //   height: 20,
    //   width: 20,
    //   fill: 'green'
    // }));

    // canvas.add(new fabric.Circle({
    //   left: 100,
    //   top: 100,
    //   radius: 50,
    //   fill: 'White'
    // }));

    // console.log("Stringify: ", JSON.stringify(canvas));
    // console.log("ToSVG: ", canvas.toSVG());
    // console.log("ToDataURL: ", canvas.toDataURL('png'));
    // canvas.renderAll();
  }

  componentWillMount() {
  }

  handlePencil = (e) => {
    e.preventDefault();
    console.log("pencil")
    canvas.isDrawingMode = true;
  }

  handleBox = (e) => {
    e.preventDefault();
    console.log("box");
    canvas.isDrawingMode = false;
    var rect, isDown, origX, origY;

    canvas.on('mouse:down', function (o) {
      isDown = true;
      var pointer = canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      var pointer = canvas.getPointer(o.e);
      rect = new fabric.Rect({
        left: origX,
        top: origY,
        originX: 'left',
        originY: 'top',
        width: pointer.x - origX,
        height: pointer.y - origY,
        angle: 0,
        fill: 'rgba(35,110,150,0.2)',
        transparentCorners: false
      });
      canvas.add(rect);
    });

    canvas.on('mouse:move', function (o) {
      if (!isDown) return;
      var pointer = canvas.getPointer(o.e);

      if (origX > pointer.x) {
        rect.set({ left: Math.abs(pointer.x) });
      }
      if (origY > pointer.y) {
        rect.set({ top: Math.abs(pointer.y) });
      }

      rect.set({ width: Math.abs(origX - pointer.x) });
      rect.set({ height: Math.abs(origY - pointer.y) });


      canvas.renderAll();
    });

    canvas.on('mouse:up', function (o) {
      isDown = false;
    });

  }

  handleText = (e) => {
    e.preventDefault();
    console.log("text");
    canvas.isDrawingMode = false;
    var textObject = new fabric.IText('Type...', {
      fontFamily: 'Comic Sans',
      fontSize: 40,
      left: 100,
      top: Math.random() * 1000,
      fill: localStorage.getItem('fillColor') || '#00000',
    })
    canvas.add(textObject)
  }

  handleColor = (e) => {
    e.preventDefault();
    console.log("color")
  }

  handleUndo = (e) => {
    e.preventDefault();
    console.log("undo")
  }

  handleRedo = (e) => {
    e.preventDefault();
    console.log("redo")
  }

  handleClear = (e) => {
    e.preventDefault();
    console.log("clear")
    // const canvas = new fabric.Canvas('c');
    // canvas.isDrawingMode = false;
    canvas.remove(...canvas.getObjects());
    // const activeObject = canvas.getActiveObject();
    // const activeGroup = canvas.getActiveGroup();
    // if (activeObject) {
    //   canvas.remove(activeObject);
    // }
    // else if (activeGroup) {
    //   var objectsInGroup = activeGroup.getObjects();
    //   canvas.discardActiveGroup();
    //   objectsInGroup.forEach(function(object) {
    //   canvas.remove(object);
    //   });
    // }
  }

  handleSave = (e) => {
    e.preventDefault();
    console.log("save");

    console.log(canvas.getActiveObjects());
  }

  render() {
    return (
      <div>
        <canvas id="c" ref={this.myCanvas} width="800px" height="500px" style={{ border: "1px solid #000000" }} />
        {/* <button className="ui button" onClick={() => this.clearCanvas()}>
          Clear
        </button>
        <button className="ui button" onClick={() => this.clearCanvas()}>
          Clear
        </button> */}
        <div className="ui compact menu">
          <a className="item" href="/" onClick={(e) => this.handlePencil(e)}>
            <i className="pencil alternate icon"></i>
            Pen
          </a>
          <a className="item" href="/" onClick={(e) => this.handleBox(e)}>
            <i className="square outline icon"></i>
            Box
          </a>
          <a className="item" href="/" onClick={(e) => this.handleText(e)}>
            <i className="font icon"></i>
            Text
          </a>
          <a className="item" href="/" onClick={(e) => this.handleColor(e)}>
            <i className="eye dropper icon"></i>
            Color
          </a>
          <a className="item" href="/" onClick={(e) => this.handleUndo(e)}>
            <i className="undo icon"></i>
            Undo
          </a>
          <a className="item" href="/" onClick={(e) => this.handleRedo(e)}>
            <i className="redo icon"></i>
            Redo
          </a>
          <a className="item" href="/" onClick={(e) => this.handleClear(e)}>
            <i className="window close outline icon"></i>
            Clear
          </a>
          <a className="item" href="/" onClick={(e) => this.handleSave(e)}>
            <i className="save outline icon"></i>
            Save
          </a>
        </div>
      </div>


    )
  }
}

export default FabricSerialization