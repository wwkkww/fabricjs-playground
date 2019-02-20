import React, { Component } from 'react'

class FabricPath extends Component {
  constructor(props) {
    super(props);
    this.myImage = React.createRef();
    this.myCanvas = React.createRef();
  }

  componentDidMount() {
    var canvas = new window.fabric.Canvas('c');
    // var path = new window.fabric.Path('M 0 0 L 200 100 L 150 200 z');
    var path = new window.fabric.Path('M121.32,0L44.58,0C36.67,0,29.5,3.22,24.31,8.41\
    c-5.19,5.19-8.41,12.37-8.41,20.28c0,15.82,12.87,28.69,28.69,28.69c0,0,4.4,\
    0,7.48,0C36.66,72.78,8.4,101.04,8.4,101.04C2.98,106.45,0,113.66,0,121.32\
    c0,7.66,2.98,14.87,8.4,20.29l0,0c5.42,5.42,12.62,8.4,20.28,8.4c7.66,0,14.87\
    -2.98,20.29-8.4c0,0,28.26-28.25,43.66-43.66c0,3.08,0,7.48,0,7.48c0,15.82,\
    12.87,28.69,28.69,28.69c7.66,0,14.87-2.99,20.29-8.4c5.42-5.42,8.4-12.62,8.4\
    -20.28l0-76.74c0-7.66-2.98-14.87-8.4-20.29C136.19,2.98,128.98,0,121.32,0z');
    path.set({ left: 120, top: 120 });
    path.set({ fill: 'red', stroke: 'green', opacity: 0.5 });
    canvas.add(path);

    var comicSansText = new window.fabric.Text("Hello Comic Sans", {
      fontFamily: 'Comic Sans',
      fontSize: 80
    });
    canvas.add(comicSansText);
  }

  addText = () => {
    var canvas = new window.fabric.Canvas('c');

    var comicSansText = new window.fabric.Text("Hello Comic Sans", {
      fontFamily: 'Comic Sans'
    });

    var italicText = new window.fabric.Text("A very fancy italic text", {
      fontStyle: 'italic',
      fontFamily: 'Delicious'
    });

    var anotherItalicText = new window.fabric.Text("another italic text", {
      fontStyle: 'italic',
      fontFamily: 'Hoefler Text'
    });

    canvas.add(anotherItalicText);
  }

  render() {
    return (
      <div>
        <canvas id="c" ref={this.myCanvas} width="800px" height="500px" style={{ border: "1px solid #000000" }} />
        <button
          onClick={() => this.addText()}
        >Hello Fabric</button>
      </div>


    )
  }
}

export default FabricPath