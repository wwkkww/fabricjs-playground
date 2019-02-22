import React, { Component } from 'react'
import { fabric } from 'fabric';


var isRectMode = false;


class FabricSerialization extends Component {
  // state = {
  //   canvasData: []
  // }

  canvasData = []
  canvas;
  
  componentDidMount() {
    this.canvas = new fabric.Canvas('c');

    this.canvas.backgroundColor = 'yellow';

    this.canvas.on(
      "object:added", () => {
        // console.log("added")
        this.updateModifications('added');
      })

    this.canvas.on(
      'object:modified', () => {
        // console.log("modified")
        this.updateModifications('obj modified');
      })

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
    isRectMode = false;
    this.canvas.isDrawingMode = true;
  }

  handleBox = (e) => {
    e.preventDefault();
    console.log("box");
    this.canvas.isDrawingMode = false;
    isRectMode = true;
    let rect, isDown, origX, origY;

    this.canvas.on('mouse:down', function (o) {
      if (!isRectMode) return;
      isDown = true;
      var pointer = this.canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      rect = new fabric.Rect({
        left: origX,
        top: origY,
        originX: 'left',
        originY: 'top',
        width: pointer.x - origX,
        height: pointer.y - origY,
        angle: 0,
        fill: 'rgba(243, 135, 50, 0.6)',
        transparentCorners: false
      });
      this.canvas.add(rect);
    });

    this.canvas.on('mouse:move', function (o) {
      if (!isDown || !isRectMode) return;
      var pointer = this.canvas.getPointer(o.e);

      if (origX > pointer.x) {
        rect.set({ left: Math.abs(pointer.x) });
      }
      if (origY > pointer.y) {
        rect.set({ top: Math.abs(pointer.y) });
      }

      rect.set({ width: Math.abs(origX - pointer.x) });
      rect.set({ height: Math.abs(origY - pointer.y) });
      this.canvas.renderAll();
    });

    this.canvas.on('mouse:up', function (o) {
      isDown = false;
      isRectMode = false;
      rect.setCoords();
      //turn off event listener else will get duplicate rect
      this.canvas.off('mouse:down').off('mouse:move').off('mouse:up')
    });
  }

  handleText = (e) => {
    e.preventDefault();
    console.log("text");
    this.canvas.isDrawingMode = false;
    isRectMode = false;
    var textObject = new fabric.IText('Type...', {
      fontFamily: 'Comic Sans',
      fontSize: 30,
      left: Math.random() * 300,
      top: Math.random() * 500,
      fill: '#00000',
    })
    this.canvas.add(textObject)
  }

  handleColor = (e) => {
    e.preventDefault();
    console.log("color")
  }

  handleUndo = (e) => {
    e.preventDefault();
    console.log("undo")

    const dataArrLength = this.canvasData.length
    if (dataArrLength > 0) {
        this.canvasData.pop()
        this.canvas.loadFromJSON(this.canvasData[this.canvasData.length-1].canvasJSON)

    }

    // let dataArrLength = this.state.canvasData.length
    // if (mods < dataArrLength) {
    //   canvas.clear().renderAll();
    //   // canvas.loadFromJSON(this.state.canvasData[(dataArrLength - 1) - (mods + 1)]);
    //   canvas.loadFromJSON(this.canvasData.slice(0, this.canvasData.length - 1))
    //   canvas.renderAll();
    //   mods += 1;
    // }
  }

  handleRedo = (e) => {
    e.preventDefault();
    console.log("redo")
  }

  handleClear = (e) => {
    e.preventDefault();
    console.log("clear")
    this.canvas.remove(...this.canvas.getObjects());
  }

  handleSave = (e) => {
    e.preventDefault();
    console.log("save");
    // this.updateModifications();

  }

  handleRemove = (e) => {
    e.preventDefault();
    this.canvas.getActiveObjects().forEach((obj) => {
      this.canvas.remove(obj)
    });
    this.canvas.discardActiveObject().renderAll();
  }

  updateModifications(type) {
    const myJSON = {
      type,
      canvasJSON: JSON.stringify(this.canvas)
    }

    this.canvasData = [...this.canvasData, myJSON]

    // this.setState({
    //   canvasData: [...this.state.canvasData, myJSON]
    // })
    // console.log(myJSON);
    console.log(this.canvasData);
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
          <a className="item" href="/" onClick={(e) => this.handleRemove(e)}>
            <i className="trash alternate icon"></i>
            Remove
          </a>
          <a className="item" href="/" onClick={(e) => this.handleSave(e)}>
            <i className="save outline icon"></i>
            Save
          </a>
          <a className="item" href="/" onClick={(e) => this.handleClear(e)}>
            <i className="sync icon"></i>
            Reset
          </a>
        </div>
      </div>


    )
  }
}

export default FabricSerialization