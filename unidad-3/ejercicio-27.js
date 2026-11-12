class RectanguloRotado extends HTMLElement {
    constructor() {
        super();
        
        var shadow = this.attachShadow({ mode: 'open' });

        var canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        
        var style = document.createElement('style');
        style.textContent = `
            host {
                display: block;
                text-align: center;
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

        ctx.save();

        ctx.translate(centerX, centerY);

        ctx.rotate(Math.PI / 4);

        ctx.fillStyle = '#3498db';
        ctx.fillRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);

        ctx.strokeStyle = '#2980b9';
        ctx.lineWidth = 3;
        ctx.strokeRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);

        ctx.restore();
    }
}

window.customElements.define('rectangulo-rotado', RectanguloRotado);