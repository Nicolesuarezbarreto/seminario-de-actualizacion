const pantalla = document.getElementById('pantalla');

function agregar(valor) {
    if (pantalla.value === "0") {
        pantalla.value = valor;
    } else {
        pantalla.value += valor;
    }
}

function limpiar() {
    pantalla.value = "0";
}

function calcular() {
    try {
        // eval() toma un texto (ej: "2+2") y lo resuelve matemáticamente
        pantalla.value = eval(pantalla.value);
    } catch (error) {
        pantalla.value = "Error";
        setTimeout(limpiar, 1500); // Borra el error después de un segundo y medio
    }
}