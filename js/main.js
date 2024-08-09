//Metodo para calcular la frecuencia maxima valor fijo 220- edad del individuo
function calcularFrecuenciaMaxima(edad) {
    return 220 - edad;
}
//Metodo para verificar segun el IMC
function tipoIMC (imc){
    if (imc<18.5){
        return "Bajo peso";
    }else if (imc>18.5 & imc<24.9){
        return "Peso Normal";
    }else if (imc>=25 & imc<=29.9){
        return "Sobrepeso";
    }else if (imc>=30 & imc<=34.9){
        return "Obesidad grado I";
    }else if (imc>=35 & imc<=39.9){
        return "Obesidad grado II";
    }
    else if (imc>39.9){
        return "Obesidad grado III";
    }
}
class Cliente{
    constructor(nombre,sexo,edad,altura,peso,actividad,frecuenciaMaxima,imc,tmb,tmbAjustada,tipoimc){
        this.nombre=nombre;
        this.sexo=sexo;
        this.altura=parseFloat(altura)
        this.edad=parseInt(edad);
        this.peso=parseFloat(peso);
        this.actividad=actividad;
        this.frecuenciaMaxima=frecuenciaMaxima;
        this.imc=parseFloat(imc);
        this.tmb=tmb;
        this.tmbAjustada=tmbAjustada;
        this.tipoimc=tipoimc;
    }
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
//Metodo para calcular la taza metabolica basal segun la actividad fisica que seria la anterior * un factor segun su actividad
function ajustarTMBPorActividad(tmb, actividad) {
let factorActividad;

switch (actividad.toLowerCase()) {
case "sedentario":
    factorActividad = 1.2;
    break;
case "ligero":
    factorActividad = 1.375;
    break;
case "moderado":
    factorActividad = 1.55;
    break;
case "activo":
    factorActividad = 1.725;
    break;
case "muy activo":
    factorActividad = 1.9;
    break;
}

return tmb * factorActividad;
}

function solicitarDatos() {
    let nombre= prompt("Ingresa tu nombre:");
    let sexo = prompt("Ingrese su sexo (Hombre/Mujer):");
    let edad = parseInt(prompt("Ingrese su edad (en años):"));
    let altura = parseFloat(prompt("Ingrese su altura (en cm):"));
    let peso = parseFloat(prompt("Ingrese su peso (en kg):"));
    let actividad = prompt("Ingrese su nivel de actividad física (Sedentario, Ligero, Moderado, Activo, Muy Activo):");

    return {
        nombre:nombre,
        sexo: sexo,
        edad: edad,
        altura: altura,
        peso: peso,
        actividad: actividad
    };
}

function menu(){
    return parseInt(prompt("Eliga alguna de las siguientes opciones para su salud\n1)Registrar Usuario\n2)Consultar resultados por nombre\n3)Consultar por sexo\n4)ConsultaPor IMC \n5)Salir"));
}


function filtrarPorSexo(){
    let filtro=prompt("Ingrese el sexo a buscar");
    clientesFiltrados=clientesFit.filter(clientes=> clientes.sexo.toLowerCase()===filtro.toLowerCase());
    if(clientesFiltrados){
    clientesFiltrados.forEach(cliente => {
    mostrarDatosFiltrados(cliente,"Por Sexo");
    });
    }
    else{
        alert("No hay usuarios con el filtro indicado");
    }
}

function filtrarPorNombre(){
    let filtro=prompt("Ingrese el nombre a buscar");
    //Se realizo cambio de filter por find para buscar por nombre, este regresa el primer elemento del array en este caso el objeto cliente segun la busqueda
    clientesFiltrados=clientesFit.find(clientes=> clientes.nombre.toLowerCase()===filtro.toLowerCase());
    if (clientesFiltrados){   
    mostrarDatosFiltrados(cliente,"Por Nombre");
    }    else{
        alert("No hay usuarios con el filtro indicado");
    }
}

function filtrarIMC(){
    let filtro=parseInt(prompt("Ingrese el IMC a buscar mostrara igual o superior al ingresado"));
    clientesFiltrados=clientesFit.filter(clientes=> clientes.imc>=filtro);
    if (clientesFiltrados){
    clientesFiltrados.forEach(cliente => {
        mostrarDatosFiltrados(cliente,"Por IMC");

    });
    }
    else{
        alert("No hay usuarios con el filtro indicado")
    }
}

let opcion=0
let clientesFit=[]
do {
opcion=menu();

    if(opcion===1){   
    let datos =solicitarDatos();

    let frecuenciaMaxima = calcularFrecuenciaMaxima(datos.edad);
    let imc = calcularIMC(datos.peso, datos.altura);
    let tmb = calcularTMB(datos.sexo, datos.peso, datos.altura, datos.edad);
    let tmbAjustada = ajustarTMBPorActividad(tmb, datos.actividad);
    let tipoimc=tipoIMC(imc);
    cliente = new Cliente(datos.nombre,datos.sexo,datos.altura,datos.edad,datos.peso,datos.actividad,frecuenciaMaxima,imc,tmb,tmbAjustada,tipoimc)
    clientesFit.push(cliente);
    mostrarDatos(cliente);
    } 
    if(opcion==2){
        filtrarPorNombre();
    } 
    if(opcion==3){
        filtrarPorSexo();
    }
    if(opcion==4){
        filtrarIMC();
    }
    if(opcion===5){
    break;
    }
}while(opcion!=5);


function mostrarDatos(datos){
    let resultado = `Hola ${datos.nombre} con la edad de ${datos.edad} con el sexo ${datos.sexo} con una estatura de ${datos.altura}\n `+
    "Frecuencia Cardíaca Máxima: " + datos.frecuenciaMaxima + " bpm\n" +
    "Índice de Masa Corporal (IMC): " + datos.imc.toFixed(2) +" "+datos.tipoimc+ "\n" +
    "Tasa Metabólica Basal (TMB): " + datos.tmb.toFixed(2) + " calorías/día\n" +
    "Tasa Metabólica Basal Ajustada por Actividad: " + datos.tmbAjustada.toFixed(2) + " calorías/día\n"+
    "Calorias para deficit caloricos consumo diario: "+((datos.tmbAjustada-500).toFixed(2))+ " calorías/día\n"+
    "Calorias para volumen consumo diario: "+((datos.tmbAjustada+500).toFixed(2))+ " calorías/día\n";
    alert(resultado)
}

function mostrarDatosFiltrados(datos,filtro){
    let resultado = `Hola Muestro los datos en base al filtro ${filtro}\n Nombre ${datos.nombre} con la edad de ${datos.edad} con el sexo ${datos.sexo} con una estatura de ${datos.altura}\n `+
    "Frecuencia Cardíaca Máxima: " + datos.frecuenciaMaxima + " bpm\n" +
    "Índice de Masa Corporal (IMC): " + datos.imc.toFixed(2) +" "+datos.tipoimc+ "\n" +
    "Tasa Metabólica Basal (TMB): " + datos.tmb.toFixed(2) + " calorías/día\n" +
    "Tasa Metabólica Basal Ajustada por Actividad: " + datos.tmbAjustada.toFixed(2) + " calorías/día\n"+
    "Calorias para deficit caloricos consumo diario: "+((datos.tmbAjustada-500).toFixed(2))+ " calorías/día\n"+
    "Calorias para volumen consumo diario: "+((datos.tmbAjustada+500).toFixed(2))+ " calorías/día\n";
    alert(resultado)
}