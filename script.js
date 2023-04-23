/* Funciones de apoyo */
/* Funcion de apoyo que limpia los campos de entrada */
function limpiarCampo(i) {
  let inputActive = document.querySelector(i);
  inputActive.value = "";
}
/* Oculta aside */
function asideClosed(){
  const asideContainerClosed = document.querySelector(".container--product-detail")
  asideContainerClosed.classList.toggle("inactive")
}


document.querySelector(".button-show-product-container").addEventListener("click", asideClosed)
document.querySelector(".icon-product-detail--close").addEventListener("click", asideClosed)


function agregarFila() {
  // Obtener valores de entrada del formulario
  const campo1 = document.getElementById("campo1").value;
  const campo2 = document.getElementById("campo2").value;
  const campo3 = document.getElementById("campo3").value;
  const campo4 = document.getElementById("campo4").value;
  const spanElement = '<span class="material-icons-outlined">edit</span>';

  // Crear una nueva fila en la tabla
  let tabla = document.getElementById("tabla");
  let nuevaFila = tabla.insertRow(-1);

  // Agregar celdas con los valores de entrada
  var celda0 = nuevaFila.insertCell(0);
  celda0.innerHTML = spanElement;

  var celda1 = nuevaFila.insertCell(1);
  celda1.innerHTML = campo1;

  var celda2 = nuevaFila.insertCell(2);
  celda2.innerHTML = campo2;

  var celda3 = nuevaFila.insertCell(3);
  celda3.innerHTML = campo3;

  var celda4 = nuevaFila.insertCell(4);
  celda4.innerHTML = campo4;
  limpiarCampo("#campo1");
  limpiarCampo("#campo2");
  limpiarCampo("#campo3");
  limpiarCampo("#campo4");
  ordenarTabla();
}
function ordenarTabla() {
  const tabla = document.getElementById("tabla");
  const tablaBody = document.querySelector("#tabla-body");

  const filas = tabla.rows;

  let arregloFilas = [];

  // Convierte las filas en un arreglo para poder ordenarlas
  for (let i = 1; i < filas.length; i++) {
    arregloFilas.push(filas[i]);
  }

  // Ordena las filas por el contenido de la primera celda
  arregloFilas.sort(function (a, b) {
    let aTexto = a.cells[1].textContent.toLowerCase();
    let bTexto = b.cells[1].textContent.toLowerCase();
    return aTexto.localeCompare(bTexto);
  });

  // Vuelve a insertar las filas en la tabla en el nuevo orden
  for (var i = 0; i < arregloFilas.length; i++) {
    tablaBody.appendChild(arregloFilas[i]);
  }
}
function buscarEnTabla() {
  let input = document.getElementById("busqueda");
  let filtro = input.value.toLowerCase();
  let tabla = document.getElementById("tabla");
  let filas = tabla.rows;

  for (let i = 1; i < filas.length; i++) {
    let mostrarFila = false;
    let celdas = filas[i].cells;

    for (let j = 0; j < celdas.length; j++) {
      let celda = celdas[j];

      if (celda.textContent.toLowerCase().indexOf(filtro) > -1) {
        mostrarFila = true;
        break;
      }
    }

    if (mostrarFila) {
      filas[i].style.display = "";
    } else {
      filas[i].style.display = "none";
    }
  }
}

// Detecta cuándo el usuario ingresa algo en el campo de búsqueda
const searchCamp = document.getElementById("busqueda");
searchCamp.addEventListener("input", buscarEnTabla);
/* 
function sendTableToBackend() {
  // Get the data from the table
  var table = document.querySelector("table");
  var data = [];
  for (var i = 0; i < table.rows.length; i++) {
    var row = table.rows[i];
    var rowData = [];
    for (var j = 0; j < row.cells.length; j++) {
      rowData.push(row.cells[j].innerText);
    }
    data.push(rowData);
    ordenarTabla();
  }

  // Send the data to the backend
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://192.168.101.17:3000", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Response from the backend
      console.log(xhr.responseText);
    }
  };
  xhr.send(JSON.stringify(data));
}
function enviarDatos(data) {
  fetch("http://localhost:3000/datos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  enviarDatos(data);
});
function loadTableFromBackend() {
  // Send a GET request to the backend to get the data
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://192.168.101.17:3000", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Parse the response JSON data
      var data = JSON.parse(xhr.responseText);

      // Add the data to the table
      var table = document.querySelector("table");
      for (var i = 0; i < data.length; i++) {
        var row = table.insertRow();
        for (var j = 0; j < data[i].length; j++) {
          var cell = row.insertCell();
          cell.innerText = data[i][j];
        }
      }
    }
  };
  xhr.send();
}
 */
