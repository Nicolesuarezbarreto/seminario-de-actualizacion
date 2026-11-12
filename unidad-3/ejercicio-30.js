class CuadradoDeformado extends HTMLElement {
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
        
        var size = 100;
        
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;

        var angle = 30 * Math.PI / 180;
        var tanX = Math.tan(angle); 

        ctx.save();

        ctx.translate(centerX, centerY);

        ctx.transform(1, 0, tanX, 1, 0, 0);

        ctx.fillStyle = '#27ae60';
        ctx.fillRect(-size / 2, -size / 2, size, size);

        ctx.strokeStyle = '#1e8449';
        ctx.lineWidth = 3;
        ctx.strokeRect(-size / 2, -size / 2, size, size);


        ctx.restore();
    }
}

window.customElements.define('cuadrado-deformado', CuadradoDeformado);