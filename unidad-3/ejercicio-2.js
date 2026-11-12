import { Model, View, Controller} from './MVCCanvas.js';

function dibujarTriangulo (ctx) {
    ctx.beginPath();
    ctx.moveTo(200,500);
    ctx.lineTo(400,200);
    ctx.lineTo(600,500);
    ctx.closePath();
    ctx.stroke();
}

class ViewEjercicio2 extends View {
    constructor() {
        super();
        let ctx = this._canvas.getContext('2d');
        dibujarTriangulo(ctx, this._canvas.width, this._canvas.height);
    }

}
customElements.define('x-view-ej2', ViewEjercicio2);

function main() {
    let myModel = new Model();
    let myView = new ViewEjercicio2();
    let myController = new Controller(myView, myModel);
    myController.enable();
    document.body.appendChild(myView);
}
window.onload = main;