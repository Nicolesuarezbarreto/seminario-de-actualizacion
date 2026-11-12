vistaEj19 = null;
modeloEj19 = null;
controladorEj19 = null;
contenedorEj19 = null;

function iniciarEjercicio19() {
    if (contenedorEj19) {
        contenedorEj19.remove();
    }

    contenedorEj19 = document.createElement('div');
    contenedorEj19.style.marginTop = '20px';

    vistaEj19 = new View();
    contenedorEj19.appendChild(vistaEj19);

    modeloEj19 = new Model();
    controladorEj19 = new Controller(vistaEj19, modeloEj19);
    controladorEj19.enable();

    document.body.appendChild(contenedorEj19);

    let selectTipo = document.createElement('select');
    selectTipo.style.marginRight = '20px';
    
    let optCirculo = document.createElement('option');
    optCirculo.value = 'circulo';
    optCirculo.innerText = 'Círculo';
    
    let optPoligono = document.createElement('option');
    optPoligono.value = 'poligono';
    optPoligono.innerText = 'Polígono';
    
    let optCake = document.createElement('option');
    optCake.value = 'cakegraph';
    optCake.innerText = 'CakeGraph (Torta)';
    
    selectTipo.appendChild(optCirculo);
    selectTipo.appendChild(optPoligono);
    selectTipo.appendChild(optCake);

    let labelTipo = document.createElement('label');
    labelTipo.innerText = 'Tipo de Figura: ';
    labelTipo.appendChild(selectTipo);

    contenedorEj19.appendChild(labelTipo);
    
    let inputGrosor = document.createElement('input');
    inputGrosor.type = 'number';
    inputGrosor.value = 2;
    inputGrosor.min = 1;
    inputGrosor.style.width = '60px';
    inputGrosor.style.marginRight = '10px';

    let labelGrosor = document.createElement('label');
    labelGrosor.innerText = 'Grosor: ';
    labelGrosor.appendChild(inputGrosor);

    let selectEstilo = document.createElement('select');
    selectEstilo.style.marginRight = '20px';


    
    let optContinua = document.createElement('option');
    optContinua.value = 'continua';
    optContinua.innerText = 'Línea Continua';
    
    let optPunteada = document.createElement('option');
    optPunteada.value = 'punteada';
    optPunteada.innerText = 'Línea Punteada';
    
    selectEstilo.appendChild(optContinua);
    selectEstilo.appendChild(optPunteada);

    let labelEstilo = document.createElement('label');
    labelEstilo.innerText = 'Estilo: ';
    labelEstilo.appendChild(selectEstilo);

    contenedorEj19.appendChild(labelGrosor);
    contenedorEj19.appendChild(labelEstilo);
    contenedorEj19.appendChild(document.createElement('br'));

    let btnCargar = document.createElement('button');
    btnCargar.innerText = 'Cargar Figura (JSON)';
    btnCargar.style.marginRight = '10px';

    let btnLimpiar = document.createElement('button');
    btnLimpiar.innerText = 'Limpiar Canvas';

    contenedorEj19.appendChild(btnCargar);
    contenedorEj19.appendChild(btnLimpiar);

    btnCargar.onclick = function() {
        let tipoElegido = selectTipo.value; 
        
        let mensajeAyuda = '';
        if (tipoElegido === 'cakegraph') {
            mensajeAyuda = 'Estructura: {"datos": [valor1, valor2, valor3]}';
        } else if (tipoElegido === 'circulo') {
            mensajeAyuda = 'Estructura: {"x": 400, "y": 300, "radio": 100}';
        } else if (tipoElegido === 'poligono') {
            mensajeAyuda = 'Estructura: {"puntos": [{"x":100,"y":100}, {"x":200,"y":100}, {"x":150,"y":200}]}';
        }

        let jsonStr = prompt('Cargar ' + tipoElegido.toUpperCase() + '\n' + mensajeAyuda);
        
        if (jsonStr) {
            try {
                let figura = JSON.parse(jsonStr);
                
                figura.tipo = tipoElegido;
                figura.grosor = inputGrosor.value;
                figura.estiloLinea = selectEstilo.value;
                
                vistaEj19.dispatchEvent(new CustomEvent('request', { 
                    detail: { tipo: 'agregar', data: figura } 
                }));
                
            } catch (e) {
            
                alert("JSON inválido. Revisá que la estructura (llaves, corchetes y comillas) sea correcta.");
            }
        }
    };

    btnLimpiar.onclick = function() {
        vistaEj19.dispatchEvent(new CustomEvent('request', { 
            detail: { tipo: 'limpiar' } 
        }));
    };
   }