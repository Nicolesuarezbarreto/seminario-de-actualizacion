class CalculadoraModelo {
    constructor() {
        this.resetear();
    }

    resetear() {
        this.pantalla = "0";
        this.operador = null;
        this.operandoAnterior = null;
    }

    obtenerPantalla() {
        return this.pantalla;
    }

    agregarValor(valor) {
        if (this.pantalla === "0" || this.pantalla === "Error") {
            this.pantalla = valor;
        } else {
            this.pantalla += valor;
        }
    }

    agregarOperador(operador) {
        this.pantalla += " " + operador + " ";
        this.operador = operador;
    }

    calcular(n1, n2, operador) {
        if (operador === "+") return n1 + n2;
        if (operador === "-") return n1 - n2;
        if (operador === "*") return n1 * n2;
        if (operador === "/") return n2 === 0 ? "Error" : n1 / n2;
        return n2;
    }

    resolver() {
        const partes = this.pantalla.split(' ');
        if (partes.length < 3) return;
        
        const n1 = parseFloat(partes[0]);
        const op = partes[1];
        const n2 = parseFloat(partes[2]);
        
        const resultado = this.calcular(n1, n2, op);
        this.pantalla = String(resultado);
        this.operador = null;
    }
}