// Obtengo el modal
let modal = document.getElementById("myModal");

// Obtengo el boton que abre el modal
let btn = document.getElementById("shopButton");

// Obtengo el elemento <span> que cierra el modal
let span = document.getElementsByClassName("close")[0];

let buttonBuy = document.getElementById("buttonBuy");

// Cuando el usuario clickea el boton abrel el modal
btn.onclick = function() {
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  divCart.classList.remove("active");
}

// Cuando el usuario clickea sobre <span> (x), cerrar el modal
span.onclick = function() {
  modal.style.display = "none";
}

// Cuando el usuario haga clic en cualquier lugar fuera del modal, ciérrelo
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//Cuando el usuario haga clic en el boton de Finalizar compra, cierra el modal y muestra alerta
buttonBuy.onclick = function(){
  modal.style.display = "none"
  Swal.fire({
    title: 'Completado!',
    text: 'Gracias por tu compra, te enviaremos un correo',
    icon: 'success',
    confirmButtonText: 'Cool'
  })
  
}