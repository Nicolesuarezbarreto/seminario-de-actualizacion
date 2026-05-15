class FormularioFactura extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; font-family: sans-serif; padding: 20px; border: 1px solid #ccc; max-width: 400px; }
                .campo { margin-bottom: 15px; display: flex; flex-direction: column; }
                label { font-weight: bold; font-size: 14px; }
                input, select { padding: 8px; margin-top: 5px; border: 1px solid #999; border-radius: 4px; }
                button { 
                    background-color: #005588; color: white; border: none; 
                    padding: 10px; border-radius: 4px; cursor: pointer; width: 100%;
                }
                button:hover { background-color: #003366; }
            </style>

            <div class="form">
                <h3>Carga de Factura B</h3>
                <div class="campo">
                    <label>Punto de Venta (4 dígitos):</label>
                    <input type="text" id="puntoVenta" value="0002">
                </div>
                <div class="campo">
                    <label>Condición frente al IVA (Receptor):</label>
                    <select id="condicionIva">
                        <option value="IVA Sujeto Exento">IVA Sujeto Exento</option>
                        <option value="Consumidor Final">Consumidor Final</option>
                        <option value="Responsable Inscripto">Responsable Inscripto</option>
                    </select>
                </div>
                <div class="campo">
                    <label>Nombre/Razón Social Receptor:</label>
                    <input type="text" id="receptor" placeholder="Nombre del cliente">
                </div>
                <div class="campo">
                    <label>CUIT Receptor:</label>
                    <input type="text" id="cuit" placeholder="30-00000000-0">
                </div>
                <div class="campo">
                    <label>Importe Total ($):</label>
                    <input type="number" id="total" value="0.00">
                </div>
                <button id="btnGenerar">Generar factura</button>
            </div>
        `;

        this.shadowRoot.querySelector('#btnGenerar').onclick = () => this.generarFactura();
    }

    generarFactura() {
        const datos = {
            puntoVenta: this.shadowRoot.querySelector('#puntoVenta').value.padStart(4, '0'),
            condicionIva: this.shadowRoot.querySelector('#condicionIva').value,
            receptor: this.shadowRoot.querySelector('#receptor').value,
            cuit: this.shadowRoot.querySelector('#cuit').value,
            total: this.shadowRoot.querySelector('#total').value,
            fecha: new Date().toLocaleDateString()
        };

        const contenidoHTML = `
            <html>
            <head>
                <title>Factura B - ${datos.puntoVenta}</title>
                <style>
                    body { font-family: Arial; padding: 20px; border: 2px solid black; width: 700px; margin: auto; }
                    .header { border-bottom: 2px solid black; display: flex; justify-content: space-between; padding-bottom: 10px; }
                    .tipo { border: 1px solid black; padding: 5px 15px; font-size: 40px; font-weight: bold; text-align:center; }
                    .tipo span { font-size: 10px; display: block; border-top: 1px solid black; }
                    .info-receptor { margin-top: 20px; border: 1px solid black; padding: 10px; line-height: 1.6; }
                    .total-box { text-align: right; font-size: 22px; font-weight: bold; margin-top: 50px; border-top: 2px solid black; padding-top: 10px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div>
                        <h1 style="margin:0;">Empresa Test S.A.</h1>
                        <p>IVA Responsable Inscripto</p>
                    </div>
                    <div class="tipo"> B <span>COD. 06</span> </div>
                    <div style="text-align: right;">
                        <h2 style="margin:0;">FACTURA</h2>
                        <p>Punto de Venta: ${datos.puntoVenta} &nbsp; Comp. Nro: 00000641</p>
                        <p>Fecha de Emisión: ${datos.fecha}</p>
                    </div>
                </div>
                
                <div class="info-receptor">
                    <strong>CUIT:</strong> ${datos.cuit} &nbsp;&nbsp;&nbsp; 
                    <strong>Apellido y Nombre / Razón Social:</strong> ${datos.receptor.toUpperCase()}<br>
                    <strong>Condición frente al IVA:</strong> ${datos.condicionIva}
                </div>

                <div style="height: 300px; border-left: 1px solid black; border-right: 1px solid black; margin-top: 10px; padding: 10px;">
                    <p><em>Detalle de conceptos facturados...</em></p>
                </div>

                <div class="total-box">
                    Importe Total: $ ${datos.total}
                </div>
                <p style="font-size: 11px; margin-top: 20px;">Comprobante Autorizado - CAE N°: 66304278833647</p>
            </body>
            </html>
        `;

        const nuevaVentana = window.open('', '_blank');
        nuevaVentana.document.write(contenidoHTML);
        nuevaVentana.document.close();
        return "Factura profesional generada";
    }
}

customElements.define('formulario-factura', FormularioFactura);