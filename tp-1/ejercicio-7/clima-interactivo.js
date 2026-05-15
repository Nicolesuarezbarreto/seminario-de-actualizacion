// Extendemos el componente del punto 6 (la clase ya existe en la memoria global gracias al HTML)
class ClimaInteractivoMdP extends ClimaTablaMdP {
    constructor() {
        super();
        this.esCelsius = true;
    }

    connectedCallback() {
        super.render(); // Llama al render de la clase padre
        this.agregarBotonAlternar();
    }

    agregarBotonAlternar() {
        const contenedorBoton = document.createElement('div');
        contenedorBoton.style.marginBottom = '15px';

        const boton = document.createElement('button');
        boton.innerText = "Cambiar a Fahrenheit (°F)";
        boton.style.padding = "8px 15px";
        boton.style.cursor = "pointer";
        boton.style.fontWeight = "bold";
        boton.style.backgroundColor = "#0645ad";
        boton.style.color = "white";
        boton.style.border = "none";
        boton.style.borderRadius = "4px";

        boton.onclick = () => {
            this.esCelsius = !this.esCelsius;
            if (this.esCelsius) {
                boton.innerText = "Cambiar a Fahrenheit (°F)";
                this.convertirTablaA('C');
            } else {
                boton.innerText = "Cambiar a Celsius (°C)";
                this.convertirTablaA('F');
            }
        };

        contenedorBoton.appendChild(boton);
        this.shadowRoot.insertBefore(contenedorBoton, this.shadowRoot.querySelector('table'));
    }

    convertirTablaA(unidad) {
        const filas = this.shadowRoot.querySelectorAll('tr');
        for (let i = 1; i <= 3; i++) {
            const celdas = filas[i].querySelectorAll('td');
            for (let j = 1; j < celdas.length; j++) {
                let valorActual = parseFloat(celdas[j].innerText);
                if (unidad === 'F') {
                    let fahrenheit = (valorActual * 1.8) + 32;
                    celdas[j].innerText = fahrenheit.toFixed(1);
                } else {
                    let celsius = (valorActual - 32) / 1.8;
                    celdas[j].innerText = celsius.toFixed(1);
                }
            }
        }
    }
}

customElements.define('clima-interactivo-mdp', ClimaInteractivoMdP);