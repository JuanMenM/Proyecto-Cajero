/* Cuentas usuarios*/
const cuentas = [
    { email: 'ricky@correo.com', password: 'ricki2022', nombre: 'Ricky', numCuenta: '00596', saldo: 200 },
    { email: 'jose@correo.com', password: 'jose2022', nombre: 'Jose', numCuenta: '00333',saldo: 290 },
    { email: 'barry@correo.com', password: 'barry2022', nombre: 'Barry', numCuenta: '00666',saldo: 67 }
  ];

/* Establecer saldos mínimos y máximos de acuerdo a las especificaciones del proyecto*/
const SALDO_MIN = 10;
const SALDO_MAX = 990;

//Inserción de datos en HTML
let consulta = document.getElementById("consulta-saldo");
let ingresar = document.getElementById("ingresar-monto");
let retirar = document.getElementById("retirar-monto");


/* LOGIN */
function login(){


    let emailLogin = document.getElementById('email').value; 
    let passwordLogin = document.getElementById('password').value;  

    const USUARIO_LOG = cuentas.find(cuenta => cuenta.email === emailLogin); 
    const PASSWORD_LOG = cuentas.find(cuenta => cuenta.password === passwordLogin);


    if(USUARIO_LOG.email !== 'undefined' && PASSWORD_LOG.password !== 'undefined'){
        
      
        let nombre = USUARIO_LOG.nombre;
        let cuenta = USUARIO_LOG.numCuenta;
        let saldo = USUARIO_LOG.saldo;

        
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("cuenta", cuenta);
        localStorage.setItem("saldo", saldo);
        
        window.location = 'cajero.html'; 

    }else{
rio
        /* Alerta de info incorrecta */
        Swal.fire({
            title: 'Error!',
            text: 'El usuario o la contraseña son incorrectos, inténtalo nuevamente',
            icon: 'error',
            confirmButtonText: 'Aceptar'
            })
    }

}

function inicio(){

    /* acceso a cajero.html ya que no se asignó a ningún evento de algún botón*/
    
    let nombre = localStorage.getItem("nombre");
    let cuenta = localStorage.getItem("cuenta");
    let saldo = Number(localStorage.getItem("saldo"));  //esto permite obtener el valor actualizado del saldo   
    
    //Ingreso en el HTML de saldo inicial
    document.getElementById("saldo").innerHTML = "$ " + saldo.toFixed(2);

    consulta.style.display = '';
    ingresar.style.display = 'none';
    retirar.style.display = 'none';

    //INgreso de nombre y No. cuenta usuario en HTML
    document.getElementById("cuenta").innerHTML = 'Hola ' + '<strong>' + nombre + '</strong>' + ' Cuenta: ' + '<strong>' + cuenta + '</strong><br><button type="button" class="salir" onclick="cerrarSesion()">Cerrar Sesion</button>';

}
  
function vistaConsultar(){

    /* Consultar Saldo*/

        let saldo = Number(localStorage.getItem("saldo")); 
           
        document.getElementById("saldo").innerHTML = "$ " + saldo.toFixed(2);

        consulta.style.display = '';
        ingresar.style.display = 'none';
        retirar.style.display = 'none';    
  
}
  
function vistaIngresar(){
  
    
    consulta.style.display = 'none';
    ingresar.style.display = '';
    retirar.style.display = 'none';

    //limpieza den input
    document.getElementById("cantidadIngreso").value = "";
  
}
  
function vistaRetirar(){

    /* Función para ingresar monto*/
  
    consulta.style.display = 'none';
    ingresar.style.display = 'none';
    retirar.style.display = '';

    //Limpieza del input
    document.getElementById("cantidadRetiro").value = "";
  
}

function nuevoIngreso(){

    /* Ingreso mediante botón Ingreso*/

    //Valor Input
    let cantidad = document.getElementById("cantidadIngreso").value;

    cantidad = Number(cantidad);

    //Validación de la canatidad
    if(!isNaN(cantidad) && cantidad != null && cantidad != ""){

        //suma de la cantidad ingresada y lo que hay en el localStorage
        let saldo = Number(localStorage.getItem("saldo")) + cantidad;

        
        //Validació´n de saldo mayor a lo permitido
        if(saldo > SALDO_MAX){
            //Error de sobrepaso de límite de saldo
            Swal.fire({
                title: 'Error!',
                text: 'La cantidad a ingresar sobrepasa el total que puedes tener en tu cuenta.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
                })
            document.getElementById("cantidadIngreso").value = "";
        }else{
            //Mensaje de operación exitosa y actualización de saldo
            Swal.fire({
                icon: 'success',
                title: 'Operación exitosa',
                showConfirmButton: false,
                timer: 1500
              }).then((result) => {
                
                //Actualización
                localStorage.setItem("saldo", saldo);
                vistaConsultar();
              })    
        }        
        
    }else{

        //si no se cumple la condicion de ser número, manda mensaje de error
        Swal.fire({
            title: 'Error!',
            text: 'La cantidad que ingresaste es inválida, favor de verificar e intenta nuevamente',
            icon: 'error',
            confirmButtonText: 'Aceptar'
            })
        document.getElementById("cantidadIngreso").value = "";
    }
}

function nuevoRetiro(){

    /* esta funcion se ejecuta mediante el botón Retirtar que está en el section*/

    //se obtiene el valor del input del formulario
    let cantidad = document.getElementById("cantidadRetiro").value;

    //se convierte en número para poder realizar operaciones ya que se obtiene como un string
    cantidad = Number(cantidad);

    //se valida si la cantidad es diferente a un numero con !isNan, si la cantidad es diferente de null y si no está vacia
    if(!isNaN(cantidad) && cantidad != null && cantidad != ""){

        //se suma la cantidad ingresada + lo que esta almacenado en localStorage
        let saldo = Number(localStorage.getItem("saldo")) - cantidad;

        //se valida si el saldo es menor de lo que debería tener en su cuenta
        if(saldo < SALDO_MIN){
            //si el nuevo saldo sobrepasa el minimo, manda un mensaje de error
            Swal.fire({
                title: 'Error!',
                text: 'La cantidad a retirar sobrepasa el mínimo que puedes tener en tu cuenta.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
                })
            document.getElementById("cantidadRetiro").value = "";
        }else{
            //Actualiza saldo y operación exitosa
            Swal.fire({
                icon: 'success',
                title: 'Operación exitosa',
                showConfirmButton: false,
                timer: 1500
              }).then((result) => {

                //Actualizar Saldo
                localStorage.setItem("saldo", saldo);
                vistaConsultar();
              })    
        }        
        
    }else{

        //Mensaje error
        Swal.fire({
            title: 'Error!',
            text: 'La cantidad que ingresaste es inválida, favor de verificar e intenta nuevamente',
            icon: 'error',
            confirmButtonText: 'Aceptar'
            })
        document.getElementById("cantidadRetiro").value = "";
    }
}

/* Cerrar sesión dentro de loggin*/
function cerrarSesion(){
    //Redirección a LOGIN 
    window.location = 'index.html'; 
}

