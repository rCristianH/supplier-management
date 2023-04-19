/* Funcion de apoyo que limpia los campos de entrada */
function limpiarCampo(i){
  var inputActive = document.querySelector(i)
  inputActive.value = "";
}
/*Evita que se recarge la pagina*/
document.getElementById("formulariodb").addEventListener("submit", function(event) {
  event.preventDefault();
  agregarFila();
});


function agregarFila() {
  // Obtener valores de entrada del formulario
  var campo1 = document.getElementById("campo1").value;
  var campo2 = document.getElementById("campo2").value;
  var campo3 = document.getElementById("campo3").value;
  var campo4 = document.getElementById("campo4").value;
  var spanElement = '<span class="material-icons-outlined">edit</span>'
  
  // Crear una nueva fila en la tabla
  var tabla = document.getElementById("tabla");
  var nuevaFila = tabla.insertRow(-1);

  // Agregar celdas con los valores de entrada
  var celda0 = nuevaFila.insertCell(0)
  celda0.innerHTML = spanElement;

  var celda1 = nuevaFila.insertCell(1);
  celda1.innerHTML = campo1;

  var celda2 = nuevaFila.insertCell(2);
  celda2.innerHTML = campo2;

  var celda3 = nuevaFila.insertCell(3);
  celda3.innerHTML = campo3;

  var celda4 = nuevaFila.insertCell(4);
  celda4.innerHTML = campo4;
  limpiarCampo("#campo1")
  limpiarCampo("#campo2")
  limpiarCampo("#campo3")
  limpiarCampo("#campo4")
  ordenarTabla()
}
function ordenarTabla() {
  var tabla = document.getElementById("tabla"); 
  let tablaBody = document.querySelector("#tabla-body")

  var filas = tabla.rows;


  var arregloFilas = [];

  // Convierte las filas en un arreglo para poder ordenarlas
  for (var i = 1; i < filas.length; i++) {
    arregloFilas.push(filas[i]);
  }

  // Ordena las filas por el contenido de la primera celda
  arregloFilas.sort(function (a, b) {
    var aTexto = a.cells[1].textContent.toLowerCase();
    var bTexto = b.cells[1].textContent.toLowerCase();
    return aTexto.localeCompare(bTexto);
  });

  // Vuelve a insertar las filas en la tabla en el nuevo orden
  for (var i = 0; i < arregloFilas.length; i++) {
    tablaBody.appendChild(arregloFilas[i]);
  }
}
function buscarEnTabla() {
  var input = document.getElementById("busqueda");
  var filtro = input.value.toLowerCase();
  var tabla = document.getElementById("tabla");
  var filas = tabla.rows;

  for (var i = 1; i < filas.length; i++) {
    var mostrarFila = false;
    var celdas = filas[i].cells;

    for (var j = 0; j < celdas.length; j++) {
      var celda = celdas[j];

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
var input = document.getElementById("busqueda");
input.addEventListener("input", buscarEnTabla);
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