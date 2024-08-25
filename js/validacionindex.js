fetch("/assets/dietas.json")
.then(response => response.json())
.then(dietas=> principal(dietas)).catch(error=> console.log(error))

let idCaloriasBotones = [];

let lunes = false, martes = false, miercoles = false, jueves = false, viernes = false, sabado = false, doming = false;

//Se valida si existe los datos guardados del cliente si se encuentra guardado se limpia el Contenido y se muestra la dieta segun la informacion del localstorage
function principal (dietas){
    let dietaSemanalJson=dietas;
const datosGuardados = localStorage.getItem('datosUsuario');
if (datosGuardados) {
    const datosUsuario = JSON.parse(datosGuardados);
    const contennidoDivSolicitud = document.getElementById('contenido');
    contennidoDivSolicitud.className = "contenido2"
    contennidoDivSolicitud.innerHTML = '';
    const dietaSegunCalorias = crearDietaSegunCaloriasFilter(datosUsuario.cal);
    if (dietaSegunCalorias.length == 0) {
        Swal.fire({
            title: 'Sin dietas Compatibles',
            text:'Favor de elegir una dieta del listado, Estamos actualizando las Dietas por lo cual esperamos en un futuro proporcionar una en base a sus requerimientos segun sus objetivos',
            icon: 'warning',
            confirmButtonText:'Entendido'
            });

        contennidoDivSolicitud.innerHTML = `<div id="sinDietaSegunCal">
        <div id="divTextoSinDieta">
        <h1>Selecciona las calorias</h1>
        <p>No contamos con una dieta segun las calorias a consumir sin embargo te proponemos algunas tu indice calorico es de: ${datosUsuario.cal} </p>
        <p>Por lo cual deberas seleccionar para tu objetivo que es ${datosUsuario.objetivo} alguna de las que se muestran a continuacion sin que sea tan drastico el cambio calorico a lo sugerido: </p>
        <p>Contamos con una busqueda en caso de requerir consultar en un rango de dietas segun las calorias: </p>
        <label for="caloriasmin">Calorias Minimas :</label>
        <input type="number" id="rangomin" name="caloriasmin" min="1500"/>
        <label for="caloriasmax">Calorias Maximas :</label>
        <input type="number" id="rangomax" name="caloriasmax" min="1500"/>
        <button id="botonBuscarCalorias">Buscar</button>
        <button id="limpiarFiltros">Refrescar</button>
        <p>Listado de dietas:</p>
        </div>
        <div id="botonesCalorias">
        ${opcionesDietas(datosUsuario.cal, datosUsuario.objetivo)}   
        </div>
        <p>Nota: Esto cambiara las calorias de la dieta en base a las calorias seleccionadas.</p>   
        <button id="regresarFormulario">Regresar a formulario</button>  
        </div>
        </div>
        `
        var popupWindow = document.getElementById("sinDietaSegunCal");
        idCaloriasBotones.forEach((idboton, index) => {
            const botonDietaOpcional = document.getElementById("botoncal" + idboton);
            if (botonDietaOpcional) {
                botonDietaOpcional.addEventListener('click', () => {
                    datosUsuario.cal = idboton;
                    localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
                    window.location.href = "index.html";
                });
            }
        });
        let botonBuscarCalorias=document.getElementById("botonBuscarCalorias");
        botonBuscarCalorias.addEventListener('click', function (event) {
            let inputMin=parseInt(document.getElementById("rangomin").value);
            let inputMax=parseInt(document.getElementById("rangomax").value);
            filtrarDietaSegunRangoCliente(inputMin,inputMax);
            idCaloriasBotones.forEach((idboton, index) => {
                const botonDietaOpcional = document.getElementById("botoncal" + idboton);
                if (botonDietaOpcional) {
                    botonDietaOpcional.addEventListener('click', () => {
                        datosUsuario.cal = idboton;
                        localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
                        window.location.href = "index.html";
                    });
                }
            });
        });
        let botonlimpiarFiltros=document.getElementById("limpiarFiltros");
        botonlimpiarFiltros.addEventListener('click', function (event) {
            window.location.href = "index.html";
        });
        

        let botonLimpiarDatosStorage = document.getElementById("regresarFormulario");
        botonLimpiarDatosStorage.addEventListener('click', function (event) {
            localStorage.removeItem("datosUsuario");
            window.location.href = "index.html";
        });


    }
    else {
        document.title = 'Dieta'
        const nuevoContenido = `
        <h2>Datos del Paciente</h2>
        <div class="info-container">
        <p><strong>Nombre:</strong> <span id="nombrePaciente">${datosUsuario.nombre}</span></p>
        <p><strong>Sexo:</strong> <span id="sexoPaciente">${datosUsuario.sexo}</span></p>
        <p><strong>Edad:</strong> <span id="edadPaciente">${datosUsuario.edad}</span> años</p>
        <p><strong>Altura:</strong> <span id="alturaPaciente">${datosUsuario.altura}</span> cm</p>
        <p><strong>Peso:</strong> <span id="pesoPaciente">${datosUsuario.peso}</span> kg</p>
        <p><strong>Calorias Diarias:</strong> <span id="actividadPaciente">${datosUsuario.cal.toFixed(0)}</span></p>
        <p><strong>Objetivo:</strong> <span id="actividadPaciente">${datosUsuario.objetivo}</span></p>
        <button id="limpiarStorage">LimpiarDatos</button>
    </div>
        <h1>Calendario Semanal de Dieta Alimenticia</h1>
        <div id='botonesCalendario'>
        <button id="botonLunes">Lunes</button>
        <button id="botonMartes">Martes</button> 
        <button id="botonMiercoles">Miercoles</button> 
        <button id="botonJueves">Jueves</button> 
        <button id="botonViernes">Viernes</button>
        <button id="botonSabado">Sabado</button>  
        <button id="botonDomingo">Domingo</button> 
        </div>
        <div class="calendario">
            <div class="dia" id='lunes'>
                <h3>Lunes</h3>
                <div class="comida">
                    <label for="desayuno-lunes">Desayuno:</label>
                    <div id="desayuno-lunes"></div>
                </div>
                <div class="comida">
                    <label for="comida-lunes">Comida:</label>
                    <div id="comida-lunes"></div>
                </div>
                <div class="comida">
                    <label for="cena-lunes">Cena:</label>
                    <div id="cena-lunes" ></div>
                </div>
            </div>
            <div class="dia" id='martes'>
                <h3>Martes</h3>
                <div class="comida">
                    <label for="desayuno-martes">Desayuno:</label>
                    <div id="desayuno-martes" ></div>
                </div>
                <div class="comida">
                    <label for="comida-martes">Comida:</label>
                    <div id="comida-martes" ></div>
                </div>
                <div class="comida">
                    <label for="cena-martes">Cena:</label>
                    <div id="cena-martes" ></div>
                </div>
            </div>
    
            <div class="dia" id='miercoles'>
                <h3>Miércoles</h3>
                <div class="comida">
                    <label for="desayuno-miercoles">Desayuno:</label>
                    <div id="desayuno-miercoles" ></div>
                </div>
                <div class="comida">
                    <label for="comida-miercoles">Comida:</label>
                    <div id="comida-miercoles" ></div>
                </div>
                <div class="comida">
                    <label for="cena-miercoles">Cena:</label>
                    <div id="cena-miercoles" ></div>
                </div>
            </div>
    
            <div class="dia" id='jueves'>
                <h3>Jueves</h3>
                <div class="comida">
                    <label for="desayuno-jueves">Desayuno:</label>
                    <div id="desayuno-jueves" ></div>
                </div>
                <div class="comida">
                    <label for="comida-jueves">Comida:</label>
                    <div id="comida-jueves" ></div>
                </div>
                <div class="comida">
                    <label for="cena-jueves">Cena:</label>
                    <div id="cena-jueves" ></div>                
                </div>
            </div>
    
            <div class="dia" id='viernes'>
                <h3>Viernes</h3>
                <div class="comida">
                    <label for="desayuno-viernes">Desayuno:</label>
                    <div id="desayuno-viernes" ></div>
                </div>
                <div class="comida">
                    <label for="comida-viernes">Comida:</label>
                    <div id="comida-viernes" ></div>
                </div>
                <div class="comida">
                    <label for="cena-viernes">Cena:</label>
                    <div id="cena-viernes" ></div>
                </div>
            </div>
    
            <div class="dia" id='sabado'>
                <h3>Sábado</h3>
                <div class="comida">
                    <label for="desayuno-sabado">Desayuno:</label>
                    <div id="desayuno-sabado" ></div>
                </div>
                <div class="comida">
                    <label for="comida-sabado">Comida:</label>
                    <div id="comida-sabado" ></div>
    
                </div>
                <div class="comida">
                    <label for="cena-sabado">Cena:</label>
                    <div id="cena-sabado"  ></div>
                </div>
            </div>
    
            <div class="dia" id='domingo'>
                <h3>Domingo</h3>
                <div class="comida">
                    <label for="desayuno-domingo">Desayuno:</label>
                    <div id="desayuno-domingo" ></div>
    
                </div>
                <div class="comida">
                    <label for="comida-domingo">Comida:</label>
                    <div id="comida-domingo" ></div>
                </div>
                <div class="comida">
                    <label for="cena-domingo">Cena:</label>
                    <div id="cena-domingo" ></div>
                </div>
            </div>
        </div>
    `;
        // Insertar el nuevo contenido en el DOM
        contennidoDivSolicitud.innerHTML = nuevoContenido;
        let botonLimpiarDatosStorage = document.getElementById("limpiarStorage");
        const botonLunes = document.getElementById("botonLunes");
        const botonMartes = document.getElementById("botonMartes");
        const botonMiercoles = document.getElementById("botonMiercoles");
        const botonJueves = document.getElementById("botonJueves");
        const botonViernes = document.getElementById("botonViernes");
        const botonSabado = document.getElementById("botonSabado");
        const botonDomingo = document.getElementById("botonDomingo");

        botonLunes.addEventListener('click', function (event) {
            if (lunes) {
                botonLunes.className = "";
                lunes = false;
                
            }
            else {

                botonLunes.className = "botonMarcado";
                lunes = true;
                
            }
            ocultarMostrarDiaDieta('lunes', lunes);
        });
        botonMartes.addEventListener('click', function (event) {
            if (martes) {
                botonMartes.className = "";
                martes = false;
            }
            else {

                botonMartes.className = "botonMarcado";
                martes = true;
            }
            ocultarMostrarDiaDieta('martes', martes);
        });
        botonMiercoles.addEventListener('click', function (event) {
            if (miercoles) {
                botonMiercoles.className = "";
                miercoles = false;
            }
            else {

                botonMiercoles.className = "botonMarcado";
                miercoles = true;
            }
            ocultarMostrarDiaDieta('miercoles', miercoles);
        });
        botonJueves.addEventListener('click', function (event) {
            if (jueves) {
                botonJueves.className = "";
                jueves = false;
            }
            else {

                botonJueves.className = "botonMarcado";
                jueves = true;
            }
            ocultarMostrarDiaDieta('jueves', jueves);
        });
        botonViernes.addEventListener('click', function (event) {
            if (viernes) {
                botonViernes.className = "";
                viernes = false;
            }
            else {

                botonViernes.className = "botonMarcado";
                viernes = true;
            }
            ocultarMostrarDiaDieta('viernes', viernes);
        });
        botonSabado.addEventListener('click', function (event) {
            if (sabado) {
                botonSabado.className = "";
                sabado = false;
            }
            else {

                botonSabado.className = "botonMarcado";
                sabado = true;
            }
            ocultarMostrarDiaDieta('sabado', sabado);
        });
        botonDomingo.addEventListener('click', function (event) {
            if (domingo) {
                botonDomingo.className = "";
                domingo = false;
            }
            else {

                botonDomingo.className = "botonMarcado";
                domingo = true;
            }
            ocultarMostrarDiaDieta('domingo', domingo);
        });


        llenadoDieta(dietaSegunCalorias);
        botonLimpiarDatosStorage.addEventListener('click', function (event) {
            localStorage.removeItem("datosUsuario");
            window.location.href = "index.html";
        });
    }




}

//Logistica de Evento para GuardarDatos del Formulario una vez se guarda en datosUsuarios, se refresca pantalla
const botonEnviar = document.getElementById("botonEnviar");
if (botonEnviar) {
    botonEnviar.addEventListener('click', function (event) {
        //LeemosDatosFormulario
        let nombre = document.getElementById('nombre').value;
        let sexo = document.querySelector('input[name="sexo"]:checked').value;
        let edad = parseInt(document.getElementById('edad').value);
        let altura = parseInt(document.getElementById('altura').value);
        let peso = parseInt(document.getElementById('peso').value);
        let actividad = parseFloat(document.getElementById('actividad').value);
        let objetivo = document.querySelector('input[name="objetivo"]:checked').value;
        let fechadato = new Date();
        let fecha = fechadato.toLocaleDateString();
        let frecuenciaMaxima = calcularFrecuenciaMaxima(edad);
        let imc = calcularIMC(peso, altura);
        let tmb = calcularTMB(sexo, peso, altura, edad);
        let tmbAjustada = ajustarTMBPorActividad(tmb, actividad);
        let tipoimc = tipoIMC(imc);
        let cal = caloriasDieta(objetivo, tmbAjustada, tmb);
        const datosFormulario = {
            nombre: nombre,
            sexo: sexo,
            edad: edad,
            altura: altura,
            peso: peso,
            actividad: actividad,
            fecha: fecha,
            objetivo: objetivo,
            frecuenciaMaxima: frecuenciaMaxima,
            imc: imc,
            tmb: tmb,
            tmbAjustada: tmbAjustada,
            tmbVolumen: (tmbAjustada + 500),
            tmbDefinicion: (tmbAjustada - 500),
            cal: cal
        }
        localStorage.setItem("datosUsuario", JSON.stringify(datosFormulario));
        window.location.href = "index.html";
    });
}


//Metodo para caluclar el IMC de la persona se reciben 2 parametros peso, altura y se calcula
function calcularIMC(peso, altura) {
    let alturaEnMetros = altura / 100;
    return peso / (alturaEnMetros * alturaEnMetros);
}
//Metodo para caluclar la tasa metabolica basal se diferencia segun entre hombre
function calcularTMB(sexo, peso, altura, edad) {
    if (sexo.toLowerCase() === "hombre") {
        return 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * edad);
    } else if (sexo.toLowerCase() === "mujer") {
        return 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * edad);
    }
}
//Metodo se redujo desde el formulario para obtener el valor real, solo se multiplica con este metodo tmb x factor
function ajustarTMBPorActividad(tmb, actividad) {
    return tmb * actividad;
}

//Metodo para calcular la frecuencia maxima valor fijo 220- edad del individuo
function calcularFrecuenciaMaxima(edad) {
    return 220 - edad;
}
//Metodo para verificar segun el IMC
function tipoIMC(imc) {
    if (imc < 18.5) {
        return "Bajo peso";
    } else if (imc > 18.5 && imc < 24.9) {
        return "Peso Normal";
    } else if (imc >= 25 && imc <= 29.9) {
        return "Sobrepeso";
    } else if (imc >= 30 && imc <= 34.9) {
        return "Obesidad grado I";
    } else if (imc >= 35 && imc <= 39.9) {
        return "Obesidad grado II";
    }
    else if (imc > 39.9) {
        return "Obesidad grado III";
    }
}

function caloriasDieta(objetivo, tmbAjustada) {

    if (objetivo == "recomposicion") {
        return ajustarValorCalorias(tmbAjustada, objetivo);
    }
    if (objetivo == "definir") {
        return ajustarValorCalorias((tmbAjustada - 500), objetivo);
    }
    if (objetivo == "volumen") {
        return ajustarValorCalorias((tmbAjustada + 500), objetivo);
    }
}

class Ingrediente {
    constructor(nombre, cantidad_gramos, proteinas, carbohidratos, grasas) {
        this.nombre = nombre;
        this.cantidad_gramos = cantidad_gramos;
        this.macronutrientes = {
            proteinas_gramos: proteinas,
            carbohidratos_gramos: carbohidratos,
            grasas_gramos: grasas
        };
    }
}

class Comida {
    constructor(calorias, ingredientes) {
        this.calorias = calorias;
        this.total_macronutrientes = this.calcularTotalMacronutrientes(ingredientes);
        this.ingredientes = ingredientes;
    }

    calcularTotalMacronutrientes(ingredientes) {
        let totalProteinas = 0, totalCarbohidratos = 0, totalGrasas = 0;
        ingredientes.forEach(ingrediente => {
            totalProteinas += ingrediente.macronutrientes.proteinas_gramos;
            totalCarbohidratos += ingrediente.macronutrientes.carbohidratos_gramos;
            totalGrasas += ingrediente.macronutrientes.grasas_gramos;
        });
        return {
            proteinas_gramos: totalProteinas,
            carbohidratos_gramos: totalCarbohidratos,
            grasas_gramos: totalGrasas
        };
    }
}

class Dieta {
    constructor(dia, calorias_totales, desayuno, comida, cena) {
        this.dia = dia;
        this.calorias_totales = calorias_totales;
        this.desayuno = desayuno;
        this.comida = comida;
        this.cena = cena;
    }
}



function crearDietaSegunCaloriasFilter(calorias) {
    //Se utiliza Filter para obtener Dieta Segun Calorias
    let dietasSemanalFiltrada = dietaSemanalJson.dieta_semanal.filter(dia => dia.dieta.calorias_totales === calorias);
    return dietasSemanalFiltrada;
}

function llenadoDieta(dietasSemanalFiltrada) {

    dietasSemanalFiltrada.map(diaDieta => {
        rellenarDietaHTML(diaDieta.dieta.desayuno, 'desayuno', diaDieta.dia.toLowerCase());
        rellenarDietaHTML(diaDieta.dieta.comida, 'comida', diaDieta.dia.toLowerCase());
        rellenarDietaHTML(diaDieta.dieta.cena, 'cena', diaDieta.dia.toLowerCase());
    });
}

function rellenarDietaHTML(diaDieta, tipoComida, dia) {
    let elementoHTMLDieta = document.getElementById(`${tipoComida}-${dia}`);
    let contenidocomida = ``;
    diaDieta.ingredientes.forEach((ing) => {
        contenidocomida += `<strong>Nombre Alimento:</strong> ${ing.nombre}<br>
        <strong>Cantidad gr:</strong> ${ing.cantidad_gramos}
        <strong>Proteina gr:</strong> ${ing.macronutrientes.proteinas_gramos}
        <strong>Carbohidratos gr:</strong> ${ing.macronutrientes.carbohidratos_gramos}
        <strong>Grasas gr:</strong> ${ing.macronutrientes.grasas_gramos}<br>`;
    });
    contenidocomida += `<strong>Calorias ${tipoComida} Totales :</strong> ${diaDieta.calorias}`
    elementoHTMLDieta.innerHTML = contenidocomida;
}
//funcionParaMostrar o Ocultar Dieta del DiaSeleccionado
function ocultarMostrarDiaDieta(dia, bandera) {
    let elementoDiCalendario = document.getElementById(`${dia}`);
    elementoDiCalendario.hidden = bandera
    bandera?  seOcultaDiaTostify(dia):seMuestraDiaTostify(dia);
    
}

function opcionesDietas(calorias, objetivo) {
    let htmlbotones = ``
    let mincal = 0;
    let maxcal = 0;
    if (objetivo == "volumen") {
        maxcal = parseInt(calorias);
        mincal = parseInt(calorias) - 500;
    }
    if (objetivo == "definir") {
        maxcal = parseInt(calorias) + 500;
        mincal = parseInt(calorias);
    }
    let dietasSugeridas = dietaSemanalJson.dieta_semanal.filter(dia => dia.dieta.calorias_totales >= mincal && dia.dieta.calorias_totales <= maxcal);
    if (dietasSugeridas.length == 0) {
        dietaSemanalJson.dieta_semanal.forEach((dia) => {
            if (idCaloriasBotones.findIndex((calo) => calo == dia.dieta.calorias_totales) == -1) {
                idCaloriasBotones.push(dia.dieta.calorias_totales);
                htmlbotones += `<button id="botoncal${dia.dieta.calorias_totales}">${dia.dieta.calorias_totales}</button>`
            }
        });
    } else {
        //creasBotonesDinamicosSegunFiltro
        dietasSugeridas.forEach((dia) => {
            if (idCaloriasBotones.findIndex((calo) => calo == dia.dieta.calorias_totales) == -1) {
                idCaloriasBotones.push(dia.dieta.calorias_totales);
                htmlbotones += `<button id="botoncal${dia.dieta.calorias_totales}">${dia.dieta.calorias_totales}</button>`
            }
        });
    }


    //<button id="limpiarStorage">LimpiarDatos</button>

    return htmlbotones;
}
//filtroClienteDientas
function filtrarDietaSegunRangoCliente(mincal, maxcal) {
    idCaloriasBotones=[];
    let htmlbotones=``;
    let botonescaloriasModificado=document.getElementById("botonesCalorias");
    let dietasSugeridas = dietaSemanalJson.dieta_semanal.filter(dia => dia.dieta.calorias_totales >= mincal && dia.dieta.calorias_totales <= maxcal);
    dietasSugeridas.forEach((dia) => {
        if (idCaloriasBotones.findIndex((calo) => calo == dia.dieta.calorias_totales) == -1) {
            idCaloriasBotones.push(dia.dieta.calorias_totales);
            htmlbotones += `<button id="botoncal${dia.dieta.calorias_totales}">${dia.dieta.calorias_totales}</button>`
        }
    });
    if (htmlbotones==''){
        htmlbotones=`<p>No tenemos dietas segun los filtros seleccionados min ${mincal} y max ${maxcal} reintentar con otros valores.</p>`
    }
    botonescaloriasModificado.innerHTML=htmlbotones;
    crearFuncionBotonesDietas();
}

function ajustarValorCalorias(calorias, objetivo) {
    let resto = calorias % 100; // Obtén el residuo de la división entre 100
    if (objetivo = "volumen") {
        // Redondear hacia arriba
        calorias += (100 - resto);
    } else {
        // Redondear hacia abajo
        calorias -= resto;
    }
    return calorias;
}

function crearFuncionBotonesDietas(){
    idCaloriasBotones.forEach((idboton, index) => {
        const botonDietaOpcional = document.getElementById("botoncal" + idboton);
        if (botonDietaOpcional) {
            botonDietaOpcional.addEventListener('click', () => {
                datosUsuario.cal = idboton;
                localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
                window.location.href = "index.html";
            });
        }
    });
    
}

}

function seOcultaDiaTostify(dia){
    Toastify({
        text: "Se oculto dieta del dia "+dia,
        duration: 3000,
        newWindow: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient(to right, #b01a00, #931702)",
        },
    }).showToast();
}

function seMuestraDiaTostify(dia){
    Toastify({
        text: "Se muestra dieta del dia "+dia,
        duration: 3000,
        newWindow: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
}