class MiCalculadora extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.pantalla = "0";
    }

    connectedCallback() {
        this.render();
        this.agregarEventos();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            body {
                display: flex;
                justify-content: center;
                padding-top: 50px;
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
            }

            .contenedor-calculadora {
                background-color: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
                width: 250px;
            }

            #pantalla {
                width: 92%;
                height: 40px;
                font-size: 24px;
                text-align: right;
                margin-bottom: 15px;
                padding: 5px;
                border: 1px solid #ccc;
            }

            table {
                width: 100%;
                border-spacing: 8px;
            }

            button {
                width: 100%;
                height: 50px;
                border-radius: 8px;
                border: none;
                font-weight: bold;
                font-size: 18px;
                color: white;
                cursor: pointer;
            }

            .btn-azul { background-color: #4A90E2; box-shadow: 0px 4px #357ABD; }
            .btn-verde { background-color: #7ED321; box-shadow: 0px 4px #69B01C; }
            .btn-naranja { background-color: #F5A623; box-shadow: 0px 4px #D48C1C; }

            .borrar {
                background-color: red;
                box-shadow: 0px 5px #BB3E22;
                height: 30px;
                margin-top: 10px;
            }

            button:active {
                transform: translateY(2px);
                box-shadow: 0px 2px #333;
            }
        </style>

        <div class="contenedor-calculadora">
            <input type="text" id="pantalla" value="${this.pantalla}" readonly>

            <table>
                <tr>
                    <td><button class="btn-azul" data-valor="7">7</button></td>
                    <td><button class="btn-azul" data-valor="8">8</button></td>
                    <td><button class="btn-azul" data-valor="9">9</button></td>
                    <td><button class="btn-verde" data-valor="+">+</button></td>
                </tr>
                <tr>
                    <td><button class="btn-azul" data-valor="4">4</button></td>
                    <td><button class="btn-azul" data-valor="5">5</button></td>
                    <td><button class="btn-azul" data-valor="6">6</button></td>
                    <td><button class="btn-verde" data-valor="-">-</button></td>
                </tr>
                <tr>
                    <td><button class="btn-azul" data-valor="3">3</button></td>
                    <td><button class="btn-azul" data-valor="2">2</button></td>
                    <td><button class="btn-azul" data-valor="1">1</button></td>
                    <td><button class="btn-verde" data-valor="*">*</button></td>
                </tr>
                <tr>
                    <td><button class="btn-azul" data-valor="0">0</button></td>
                    <td><button class="btn-azul" data-valor=".">.</button></td>
                    <td><button class="btn-naranja" data-accion="igual">=</button></td>
                    <td><button class="btn-verde" data-valor="/">/</button></td>
                </tr>
            </table>

            <button class="borrar" data-accion="limpiar">Borrar</button>
        </div>
        `;
    }

    agregarEventos() {
        this.shadowRoot.addEventListener("click", (e) => {
            const pantalla = this.shadowRoot.getElementById("pantalla");

            if (e.target.dataset.valor) {
                this.agregar(e.target.dataset.valor);
            }

            if (e.target.dataset.accion === "igual") {
                this.calcular();
            }

            if (e.target.dataset.accion === "limpiar") {
                this.limpiar();
            }

            pantalla.value = this.pantalla;
        });
    }

    agregar(valor) {
        if (this.pantalla === "0") {
            this.pantalla = valor;
        } else {
            this.pantalla += valor;
        }
    }

    limpiar() {
        this.pantalla = "0";
    }

    calcular() {
        try {
            this.pantalla = eval(this.pantalla).toString();
        } catch {
            this.pantalla = "Error";
            setTimeout(() => {
                this.limpiar();
                this.render();
            }, 1500);
        }
    }
}

customElements.define("mi-calculadora", MiCalculadora);