vistaEj12 = null;
modeloEj12 = null;
controladorEj12 = null;
contenedorEj12 = null;

function iniciarEjercicio12() {
    if (contenedorEj12) {
        contenedorEj12.remove();
    }

    contenedorEj12 = document.createElement('div');
    contenedorEj12.style.marginTop = '20px';

    vistaEj12 = new View();
    contenedorEj12.appendChild(vistaEj12);

    modeloEj12 = new Model();
    controladorEj12 = new Controller(vistaEj12, modeloEj12);
    controladorEj12.enable();

    document.body.appendChild(contenedorEj12);
    
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

    contenedorEj12.appendChild(labelGrosor);
    contenedorEj12.appendChild(labelEstilo);
    contenedorEj12.appendChild(document.createElement('br'));

    let btnCargar = document.createElement('button');
    btnCargar.innerText = 'Cargar Figura (JSON)';
    btnCargar.style.marginRight = '10px';

    let btnLimpiar = document.createElement('button');
    btnLimpiar.innerText = 'Limpiar Canvas';

    contenedorEj12.appendChild(btnCargar);
    contenedorEj12.appendChild(btnLimpiar);

    btnCargar.onclick = function() {
        let jsonStr = prompt('Ingresá el objeto JSON de la figura:');
        
        if (jsonStr) {
            try {
            
                let figura = JSON.parse(jsonStr);
                
                figura.grosor = inputGrosor.value;
                figura.estiloLinea = selectEstilo.value;
                
                vistaEj12.dispatchEvent(new CustomEvent('request', { 
                    detail: { tipo: 'agregar', data: figura } 
                }));
                
            } catch (e) {
                alert("JSON inválido. Revisá la sintaxis (comillas, llaves, etc).");
            }
        }
    };
    btnLimpiar.onclick = function() {
        vistaEj12.dispatchEvent(new CustomEvent('request', { 
            detail: { tipo: 'limpiar' } 
        }));
    };
   }