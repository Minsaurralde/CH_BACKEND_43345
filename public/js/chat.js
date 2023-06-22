// se crea una instancia de socket para poder establecer la comunicacion
const socket = io();
let user;

Swal.fire({
  title: "Ingresar nombre",
  input: "text",
  inputValidator: (value) => {
    return !value && "Debe ingresar un nombre";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit("chat-authenticated", user);
});

//capturo elementos del Formulario
let chatbox = document.getElementById("chat-body");
let htmlForm = document.getElementById("chat-form");

//Eventlistener para el form del submit
htmlForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let htmlInput = document.getElementById("chat-input");

  if (htmlInput.value) {
    let newData = {
      user: user,
      message: htmlInput.value,
    };

    socket.emit("chat-message", newData);
    htmlForm.reset();
  }
});

socket.on("chat-print", (msg) => {
  if (msg.user === user) {
    chatbox.innerHTML += `<div class="d-block">
                            <div class="d-flex justify-content-between">
                                <p class="small mb-1">Tu</p>
                                <p class="small mb-1 text-muted">${new Date().toLocaleString(
                                  "es-AR",
                                  {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                    hour12: true,
                                  }
                                )}</p>
                            </div>
                            <div class="d-flex flex-row justify-content-start">
                                <div>
                                    <p
                                    class="small p-2 ms-3 mb-3 rounded-3"
                                    style="background-color: #f5f6f7;"
                                    >${msg.message}</p>
                                </div>
                            </div>
                        </div>`;
  } else {
    chatbox.innerHTML += `<div class="d-block">
                            <div class="d-flex justify-content-between">
                              <p class="small mb-1 text-muted">${new Date().toLocaleString(
                                "es-AR",
                                {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                  hour12: true,
                                }
                              )}</p>
                              <p class="small mb-1">${msg.user}</p>
                            </div>
                            <div class="d-flex flex-row justify-content-end mb-4 pt-1">
                              <div>
                                <p
                                  class="small p-2 me-3 mb-3 text-white rounded-3 bg-primary"
                                >${msg.message}</p>
                              </div>
                            </div>
                          </div>`;
  }
});

// mostramos una alerta si no se creo el producto
socket.on("error", (data) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: data,
  });
});

// mostramos una alerta si se conecta un nuevo cliente
socket.on("alert-chat-user", (data) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    text: `${data} se ha unido al chat`,
    icon: "success",
  });
});
