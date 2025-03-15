//  Challenge Amigo Secreto.
//  El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

//  1.  Creo las variables necesarias para almacenar los datos de los amigos y las asignaciones de amigos secretos.
let amigos = []; // lista de amigos.
let nombreParticipante = []; // lista de participantes que han descubierto a su amigo secreto.
let inputParticipante = document.getElementById('participantes');
let asignaciones = []; // asignaciones de amigos secretos.

//  2.  Creo una función para agregar los participantes a la lista de amigos.
function agregarAmigo() {
    let inputAmigoNuevo = document.getElementById('amigo');
    let amigoNuevo = inputAmigoNuevo.value.toUpperCase();

    if (!amigoNuevo) {
        alert('Por favor, escriba un nombre para añadir a la lista de amigos.');
        inputAmigoNuevo.focus();
        return;
    } else {
        if (amigos.includes(amigoNuevo)) {
            alert('Este nombre ya ha sido añadido a la lista de amigos.');
            inputAmigoNuevo.value = '';
            inputAmigoNuevo.focus();
            return;
        } else {
            amigos.push(amigoNuevo);
            console.log(amigos);
            inputAmigoNuevo.value = '';
            inputAmigoNuevo.focus();
            mostrarListaAmigos();
            document.getElementById('borrar').disabled = false;
            document.getElementById('confirmar').disabled = false;
            return;
        }
    }
}

//  3.  Creo una función para mostrar en la interfaz la lista de amigos participantes.
function mostrarListaAmigos() {
    let listaAmigosNuevos = document.getElementById('listaAmigos');
    let item = document.createElement('li');  
    
    for (let i = 0; i < amigos.length;i++) {
        item.innerText = amigos[i];
        listaAmigosNuevos.appendChild(item);
    }
}

//  4.  Creo una función para borrar la lista de amigos.
function borrarLista() {
    amigos = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('amigo').value = '';
    document.getElementById('amigo').focus();
    document.getElementById('borrar').disabled = true;
    document.getElementById('confirmar').disabled = true;
    return;
}

//  5.  Creo una función para confirmar la lista de amigos.
function confirmarLista() {
    if (amigos.length < 3) {
        alert("Para realizar el sorteo se requiere un mínimo de 3 amigos participantes.");
        return;
    } else {
        document.getElementById('borrar').disabled = true;
        document.getElementById('confirmar').disabled = true;
        document.getElementById('amigo').disabled = true;
        document.getElementById('anadir').disabled = true;
        document.getElementById('sorteo').removeAttribute('disabled');
        return;
    }

//  6.  Creo una función para sortear los amigos secretos y sus asignaciones.
function sortearAmigo() {
    const amigosSecretos = asignarParejas(amigos); // Asigna los amigos secretos.
    apagaBoton1();
    document.getElementById('sorteado').innerHTML = '¡¡ EL SORTEO SE HA REALIZADO CON ÉXITO !!';
    document.getElementById('sorteo').disabled = true;
    document.getElementById('participantes').removeAttribute('disabled');
    document.getElementById('ingreso').removeAttribute('disabled');
    return amigosSecretos;
}

// Lógica para asignar las parejas de amigos secretos.
function asignarParejas(amigos) {
    asignaciones = [];
    let amigosDisponibles = [...amigos];

    // Asignar un amigo secreto de forma aleatoria sin repetir
    for (let i = 0; i < amigos.length; i++) {
        let amigoSecreto;
        do {
            const index = Math.floor(Math.random() * amigosDisponibles.length);
            amigoSecreto = amigosDisponibles[index];
        } while (amigoSecreto === amigos[i]);

        // Eliminar el amigo asignado de la lista
        amigosDisponibles = amigosDisponibles.filter(amigo => amigo !== amigoSecreto);
        asignaciones.push({ persona: amigos[i], amigoSecreto });
    }
    console.log(asignaciones);
    return asignaciones;
}

//  7.  Creo una función para ingresar el participante que descubrirá a su amigo secreto.
function ingresarParticipantes() {
    let participante = inputParticipante.value.toUpperCase();

    if (nombreParticipante.includes(participante)) {
        alert('Este participante ya ha descubierto su amigo secreto. Por favor, ingrese otro nombre.');
        inputParticipante.value = '';
        inputParticipante.focus();
        return;
    } else {
        if (!amigos.includes(participante)) {
            alert("Por favor, ingrese un nombre válido de la lista de amigos participantes.");
            inputParticipante.value = '';
            inputParticipante.focus();
            return;
        } else {    
            nombreParticipante.push(participante);
            mostrarListaParticipantes();
            apagaBoton2();
            document.getElementById('descubrir').removeAttribute('disabled');
            inputParticipante.value = '';
            inputParticipante.disabled = true;
            document.getElementById('participantes').focus();
            console.log(nombreParticipante);
            return;
        }
    }
}

//  8.  Creo una función mostrar la lista de participantes que han descubierto a su amigo secreto.
function mostrarListaParticipantes() {
    let lista2 = document.getElementById('listaParticipantes');
    let item2 = document.createElement('li');  
    
    for (let i = 0; i < nombreParticipante.length;i++) {
        item2.innerText = nombreParticipante[i];
        lista2.appendChild(item2);
    }
}

//  9.  Creo una función para mostrar el amigo secreto asignado al participante.
function mostrarAmigoSecreto() {
    let participante = nombreParticipante[nombreParticipante.length - 1]; // Último participante ingresado
    let asignacion = asignaciones.find(asignacion => asignacion.persona === participante);
    if (asignacion) {
        let amigoSecreto = asignacion.amigoSecreto;
        document.getElementById('resultado').innerHTML = `¡¡ ${participante}, su amigo secreto es: ${amigoSecreto} !!`;
        document.getElementById('descubrir').setAttribute('disabled', 'true');
        document.getElementById('ocultar').removeAttribute('disabled');
    } else {
        alert('No se encontró una asignación para este participante.');
    }
}

//  10.  Creo una función para ocultar el Amigo Secreto descubierto.
function ocultarAmigo() {
    document.getElementById('resultado').innerHTML = '';
    document.querySelector('#ocultar').setAttribute('disabled', 'true');
    ingreso.disabled = false;
    inputParticipante.disabled = false;
    
    if (amigos.length == nombreParticipante.length) {
        alert('Ya se han descubierto todos los Amigos Secretos.');
        limpiarCampo2();
        inputParticipante.disabled = true;
        apagaBoton2();
        document.getElementById('reiniciar').disabled = false;
        return;
}
}

//  11.  Creo funciones para deshabilitar los botones de Añadir e Ingresar
function apagaBoton1() {
    let anadir = document.getElementById('anadir');
    anadir.disabled = true;
    return;
}

function apagaBoton2() {
    let ingreso = document.getElementById('ingreso');
    ingreso.disabled = true;
    return;
}

//  12.  Creo una función para limpiar al campo luego de ingresar un nombre.
function limpiarCampo2() {
    document.querySelector('#participantes').value = '';
    return;
}

//  13.  Creo una función para reiniciar el juego.
function reiniciarJuego() {
    amigos = [];
    nombreParticipante = [];
    asignaciones = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('listaParticipantes').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('sorteado').innerHTML = '';
    document.getElementById('participantes').value = '';
    document.getElementById('anadir').disabled = false;
    document.getElementById('sorteo').disabled = true;
    document.getElementById('ingreso').disabled = true;
    document.getElementById('reiniciar').disabled = true;
    inputParticipante.disabled = true;
    document.getElementById('amigo').disabled = false;
    document.getElementById('amigo').value =  '';
    document.getElementById('amigo').focus();
    console.log(amigos);
    console.log(nombreParticipante);
    console.log(asignaciones);
    return;
}