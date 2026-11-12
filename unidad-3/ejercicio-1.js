import { Model, View, Controller} from './MVCCanvas.js';

function dibujarCruz (ctx, width, height) {
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(width,height);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(width,0);
    ctx.lineTo(0,height);
    ctx.stroke();
    ctx.closePath();
}

class ViewEjercicio1 extends View {
    constructor() {
        super();
        let ctx = this._canvas.getContext('2d');
        dibujarCruz(ctx, this._canvas.width, this._canvas.height);
    }

}
customElements.define('x-view-ej1', ViewEjercicio1);

function main() {
    let myModel = new Model();
    let myView = new ViewEjercicio1();
    let myController = new Controller(myView, myModel);
    myController.enable();
    document.body.appendChild(myView);
}
window.onload = main;


