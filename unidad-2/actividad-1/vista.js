class CalculadoraVista extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.contenedor = document.createElement('div');
        this.contenedor.className = 'contenedor-calculadora';

        this.inputPantalla = document.createElement('input');
        this.inputPantalla.type = 'text';
        this.inputPantalla.id = 'pantalla';
        this.inputPantalla.value = "0";
        this.inputPantalla.readOnly = true;
        this.contenedor.appendChild(this.inputPantalla);

        this.tabla = document.createElement('table');
        this.botones = []; 

        const estructuraBotones = [
            [{ val: '7', cls: 'btn-azul' }, { val: '8', cls: 'btn-azul' }, { val: '9', cls: 'btn-azul' }, { val: '+', cls: 'btn-verde' }],
            [{ val: '4', cls: 'btn-azul' }, { val: '5', cls: 'btn-azul' }, { val: '6', cls: 'btn-azul' }, { val: '-', cls: 'btn-verde' }],
            [{ val: '3', cls: 'btn-azul' }, { val: '2', cls: 'btn-azul' }, { val: '1', cls: 'btn-azul' }, { val: '*', cls: 'btn-verde' }],
            [{ val: '0', cls: 'btn-azul' }, { val: '.', cls: 'btn-azul' }, { val: '=', cls: 'btn-naranja' }, { val: '/', cls: 'btn-verde' }]
        ];

        for (let i = 0; i < estructuraBotones.length; i++) {
            let fila = document.createElement('tr');
            for (let j = 0; j < estructuraBotones[i].length; j++) {
                let celda = document.createElement('td');
                let boton = document.createElement('button');
                let datos = estructuraBotones[i][j];

                boton.innerText = datos.val;
                boton.className = datos.cls;
                boton.dataset.valor = datos.val;

                this.botones.push(boton);
                celda.appendChild(boton);
                fila.appendChild(celda);
            }
            this.tabla.appendChild(fila);
        }
        this.contenedor.appendChild(this.tabla);

        this.btnBorrar = document.createElement('button');
        this.btnBorrar.innerText = 'Borrar';
        this.btnBorrar.className = 'borrar';
        this.contenedor.appendChild(this.btnBorrar);

        const estilos = document.createElement('style');
        estilos.textContent = `
            .contenedor-calculadora {
                background-color: white; padding: 20px; border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0,0,0,0.1); width: 250px;
                margin: 50px auto; font-family: Arial, sans-serif;
            }
            #pantalla {
                width: 92%; height: 40px; font-size: 24px; text-align: right;
                margin-bottom: 15px; padding: 5px; border: 1px solid #ccc;
            }
            table { width: 100%; border-spacing: 8px; }
            button {
                width: 100%; height: 50px; border-radius: 8px; border: none;
                font-weight: bold; font-size: 18px; color: white; cursor: pointer;
            }
            .btn-azul { background-color: #4A90E2; }
            .btn-verde { background-color: #7ED321; }
            .btn-naranja { background-color: #F5A623; }
            .borrar { background-color: red; width: 100%; height: 40px; margin-top: 10px; }
            button:active { transform: translateY(2px); }
        `;

        this.shadowRoot.appendChild(estilos);
        this.shadowRoot.appendChild(this.contenedor);
        this.manejador = null;
    }

    registrarControlador(fn) { this.manejador = fn; }

    connectedCallback() {
        for (let i = 0; i < this.botones.length; i++) {
            this.botones[i].onclick = this.clickBtn.bind(this);
        }
        this.btnBorrar.onclick = this.clickBorrar.bind(this);
    }

    disconnectedCallback() {
        for (let i = 0; i < this.botones.length; i++) this.botones[i].onclick = null;
        this.btnBorrar.onclick = null;
    }

    clickBtn(e) { if(this.manejador) this.manejador(e.target.dataset.valor); }
    clickBorrar() { if(this.manejador) this.manejador('BORRAR'); }
    actualizar(val) { this.inputPantalla.value = val; }
}
customElements.define("calculadora-vista", CalculadoraVista);