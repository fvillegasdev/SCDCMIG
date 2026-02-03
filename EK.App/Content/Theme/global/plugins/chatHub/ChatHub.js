
"use strict";
//Este archivo se crea de manera temporal, sirve para almacenar los hubs.

/*var script = document.createElement("script");
script.src = "/signalr/hubs";
document.head.appendChild(script);
*/

//var conexion = null;
function connectionSignalR() {
    var  conexion = $.connection;
    return conexion;
}

function startConnectionSignalR() {
    $.connection.hub.start();
};

function getConnection() {
    return conexion;
}
function getSJ() {
    return SJ;
}
/*
// Establece la variable global para la conexión SignalR
window.signalRConnection = null;

"use strict";


document.addEventListener("DOMContentLoaded", function () {
    //Este archivo se crea de manera temporal, sirve para almacenar los hubs.
    let iniciado = localStorage.getItem("signalRIniciado");
    if (iniciado !== "true") {
        const script = document.createElement("script");
        script.src = "/signalr/hubs";

        script.onload = function () {
            iniciarSignalR();
        };

        document.head.appendChild(script);
    }
});

function iniciarSignalR() {

    if ($.connection && $.connection.hub) {
        $.connection.hub.start()
            .done(function () {
                console.log("Conexión de SignalR establecida correctamente.");
                localStorage.setItem("signalRIniciado", "true");
                window.signalRConnection = $.connection;
            })
            .fail(function (error) {
                console.error("Error al iniciar la conexión de SignalR: " + error);
            });
    } else {
        console.error("SignalR no está disponible. Asegúrate de que la biblioteca SignalR y jQuery estén cargados correctamente.");
    }
}
*/