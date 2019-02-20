import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Data from './Data';

class Canvas extends Component {
  state = {
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    currentSlide: Data.mySlides[1],
    plots: [],
    endpoint: "localhost:5000",
    color: "blue"
  }

  componentDidMount() {

    const socket = socketIOClient(this.state.endpoint);
    socket.emit("color", this.state.color)

    socket.on("connect", function () {
      console.log('Connected to server')
    });
    
    socket.on("disconnect", function () {
      console.log("Disconnected from server")
    });

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = this.state.currentSlide.url
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      // ctx.font = "30px Courier"
      // ctx.fillText("Some Text", 210, 75)
    }
  }

  handleMouseDown = (e) => {
    const canvas = this.refs.canvas;
    // e.stopPropagation();
    this.setState({
      isDrawing: true,
      lastX: e.clientX - canvas.offsetLeft,
      lastY: e.clientY - canvas.offsetTop
    })
    console.log("e.clientX", e.clientX)
    console.log("e.clientY", e.clientY)
  }

  handleMouseMove = e => {
    // e.stopPropagation();
    this.draw(e);
  }

  handleMouseUp = e => {
    console.log("mouseUp");
    this.setState({
      isDrawing: false
    })
  }

  handleMouseOut = e => {
    console.log("mouseOut")
    this.setState({
      isDrawing: false
    })

  }

  draw = (e) => {
    const { lastX, lastY, isDrawing } = this.state;

    if (!isDrawing) return;
      
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    // ctx.imageSmoothingEnabled = true;
    // ctx.translate(0.5, 0.5);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();

    console.log("Sending " + (e.clientX - canvas.offsetLeft) + " , " + (e.clientY - canvas.offsetTop));
    const socket = socketIOClient(this.state.endpoint);

    var drawData = {
      x: e.clientX - canvas.offsetLeft,
      y: e.clientY - canvas.offsetTop
    }

    socket.emit("drawData", drawData);

    this.setState({
      lastX: e.clientX - canvas.offsetLeft,
      lastY: e.clientY - canvas.offsetTop
    })

    // var x = e.offsetX || e.layerX - this.canvas.offsetLeft;
    // var y = e.offsetY || e.layerY - this.canvas.offsetTop;
    // this.state.plots.push({ x: x, y: y });
    // console.log(this.state.plots);
    // drawOnCanvas(plots);
  }

  render() {

    const socket = socketIOClient(this.state.endpoint);
    socket.on('change color', (col) => {
      console.log("canvas:", col)
      // document.body.style.backgroundColor = col
    })

    return (
      <div>
        <canvas
          ref="canvas"
          width={800}
          height={600}
          onMouseDown={e => this.handleMouseDown(e)} //start
          onMouseMove={e => this.handleMouseMove(e)} //draw
          onMouseUp={e => this.handleMouseUp(e)} //end
          onMouseOut={e => this.handleMouseOut(e)} //out of boundaries
        />

        <button onClick={() => this.send()}>Yellow</button>

      </div>
    )
  }
}

export default Canvas