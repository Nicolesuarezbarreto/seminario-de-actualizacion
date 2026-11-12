import { Model, View, Controller} from './MVCCanvas.js';

let misPuntos = [
    {x: 400, y: 150}, 
    {x: 550, y: 300}, 
    {x: 400, y: 450}, 
    {x: 250, y: 300}
];

function dibujarPoligono (ctx, puntos) {
    ctx.beginPath();
    ctx.moveTo(puntos[0].x,puntos[0].y);

    for (let i=1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].x,puntos[i].y);
    }
    ctx.closePath();
    ctx.stroke();
}

class ViewEjercicio3 extends View {
    constructor() {
        super();
        let ctx = this._canvas.getContext('2d');
        dibujarPoligono(ctx, misPuntos);
    }

}
customElements.define('x-view-ej3', ViewEjercicio3);

function main() {
    let myModel = new Model();
    let myView = new ViewEjercicio3();
    let myController = new Controller(myView, myModel);
    myController.enable();
    document.body.appendChild(myView);
}
window.onload = main;