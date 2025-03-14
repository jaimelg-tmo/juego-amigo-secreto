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