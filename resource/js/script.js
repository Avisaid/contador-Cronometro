const contador = document.querySelector(".inicio__contador");
const botones = document.querySelector("#botones");

// localStorage
let valorL = localStorage.getItem("valor");
let valor = parseInt(valorL);
// localStorage
let opcion = true;
let control;

window.addEventListener("load", () => {
  if (!valor) {
    contador.textContent = `00`;
    valor = 0;
  } else {
    valor < 10 && valor >= 0
      ? (contador.textContent = `0${valor}`)
      : (contador.textContent = valor);
  }
});

function cronometro() {
  valor++;
  valor < 10 && valor >= 0
    ? (contador.textContent = `0${valor}`)
    : (contador.textContent = valor);
}

function contarCronometro(e) {
  const boton = e.target.id;
  if (opcion) {
    if (boton === "incremento") {
      document.querySelector(".incremento").disabled = true;
      document.querySelector(".resetear").disabled = false;
      document.querySelector(".decremento").disabled = false;
      control = setInterval(cronometro, 100);
    } else if (boton === "resetear") {
      clearInterval(control);
      localStorage.setItem("valor", valor);
      document.querySelector(".incremento").disabled = false;
      document.querySelector(".resetear").disabled = true;
    } else if (boton === "decremento") {
      valor = 0;
      contador.textContent = "00";
      clearInterval(control);
      localStorage.setItem("valor", valor);
      document.querySelector(".incremento").disabled = false;
      document.querySelector(".resetear").disabled = true;
      document.querySelector(".decremento").disabled = true;
    }
  }
}

function contar(e) {
  const boton = e.target.id;
  if (!opcion) {
    if (boton === "incremento") {
      valor++;
      localStorage.setItem("valor", valor);
    } else if (boton === "decremento") {
      valor--;
      localStorage.setItem("valor", valor);
    } else if (boton === "resetear") {
      valor = 0;
      localStorage.setItem("valor", 0);
    }
    valor < 10 && valor >= 0
      ? (contador.textContent = `0${valor}`)
      : (contador.textContent = valor);
  }
}

const radios = document.querySelectorAll(".radios");
radios.forEach((elemento) => {
  elemento.addEventListener("change", () => {
    if (elemento.value === "cronometro") {
      document.querySelector(".contador__titulo").textContent = "segundos";
      document.querySelector(".incremento").textContent = "iniciar";
      document.querySelector(".resetear").textContent = "detener";
      document.querySelector(".decremento").textContent = "reiniciar";

      if (valor != 0) {
        document.querySelector(".resetear").disabled = false;
        document.querySelector(".decremento").disabled = false;
      } else {
        document.querySelector(".resetear").disabled = true;
        document.querySelector(".decremento").disabled = true;
      }
      opcion = true;
      botones.addEventListener("click", contarCronometro);
    } else if (elemento.value === "contador") {
      document.querySelector(".contador__titulo").textContent = "contador";
      document.querySelector(".incremento").textContent = "incremento";
      document.querySelector(".resetear").textContent = "resetear";
      document.querySelector(".decremento").textContent = "decremento";
      document.querySelector(".incremento").disabled = false;
      document.querySelector(".resetear").disabled = false;
      document.querySelector(".decremento").disabled = false;
      opcion = false;
      if (control != undefined) {
        clearInterval(control);
        localStorage.setItem("valor", valor);
        botones.addEventListener("click", contar);
      } else {
        botones.addEventListener("click", contar);
      }
    }
  });
});
