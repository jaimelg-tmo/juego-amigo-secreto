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

