// 31. Deformación lateral vertical (Skew Y): Utilizar la matriz de transformación ctx.transform(1, tanY, 0, 1, 0, 0) 
// para aplicar una inclinación oblicua sobre el eje Y a un rectángulo, simulando una proyección de perspectiva lateral. 

class RectanguloSkewY extends HTMLElement {
    constructor() {
        super();
        
        var shadow = this.attachShadow({ mode: 'open' });

        var canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        
        var style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                text-align: center;
                margin-top: 20px;
            }
            canvas {
                border: 1px solid #ccc;
                background-color: #fafafa;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(canvas);

        var ctx = canvas.getContext('2d');
        
        var rectWidth = 120;
        var rectHeight = 70;
        
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;

        var angle = 25 * Math.PI / 180;
        var tanY = Math.tan(angle);

        ctx.save();

        ctx.translate(centerX, centerY);
        ctx.transform(1, tanY, 0, 1, 0, 0);

        ctx.fillStyle = '#8e44ad';
        ctx.fillRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);

        ctx.strokeStyle = '#6c3483';
        ctx.lineWidth = 3;
        ctx.strokeRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);

        ctx.restore();
    }
}

window.customElements.define('rectangulo-skewy', RectanguloSkewY);