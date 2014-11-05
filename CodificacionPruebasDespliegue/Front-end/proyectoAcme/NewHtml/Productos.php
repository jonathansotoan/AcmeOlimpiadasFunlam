<!DOCTYPE html>
<html>

  <head>
    <link href="Shift.css" rel="stylesheet">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <link rel="stylesheet" href="http://s3.amazonaws.com/codecademy-content/courses/ltp/css/bootstrap.css">
    <link rel="stylesheet" href="main.css">

    	<script language="javascript" type="text/javascript">

//funcion ajax
	function nuevoAjax()
{
        var xmlhttp=false;
        try
        {
                // Creacion del objeto AJAX para navegadores no IE
                xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e)
        {
                try
                {
                        // Creacion del objet AJAX para IE
                        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch(E)
                {
                        if (!xmlhttp && typeof XMLHttpRequest!="undefined") xmlhttp=new XMLHttpRequest();
                }
        }
        return xmlhttp;
}



$(document).ready(function(){
showProducts();
});




//metodo llamado para listar el portafolio de productos
function showProducts()
{
        ajax=nuevoAjax();
        ajax.open("GET", "../scripts/Query_Products.php", true);
        ajax.onreadystatechange=function()
        {
                if (ajax.readyState==4)
                {
                        	     document.getElementById("info2").innerHTML=ajax.responseText;
						
                }
        }
        ajax.send(null);
}



//metodo llamado para listar el portafolio servicios
function showServices()
{
        ajax=nuevoAjax();
        ajax.open("GET", "../scripts/Query_Services.php", true);
        ajax.onreadystatechange=function()
        {
                if (ajax.readyState==4)
                {
                        document.getElementById("in").innerHTML=ajax.responseText;
						
                }
        }
        ajax.send(null);
}


//función para comprar productos o servicios
function comprar(){
alert ("funcionalidad actualmente esta en construccion");
}

	</script>
	<style>
		table, h1, input {
			margin: auto;
		}
	</style>
  </head>

  <body>
	<div class="nav">
      <div class="container">
        <ul class="pull-left">
          <li><h3><a href="http://www.proyectoacme.hol.es">Inicio</a></h3></li>
        </ul>
        <ul class="pull-right">
          <?php
			include( '../Back-end/Connection.php' );
			session_start();
			if( isset( $_SESSION['rol'] ) && !empty( $_SESSION['rol'] ) ):
			$result = $mysqli->query( "SELECT nombre FROM " . (($_SESSION[rol] == 'Administrador') ? 'Administrador' : 'Persona') . " WHERE numero_documento=$_SESSION[numero_documento]" );
			$name = $result->fetch_array(); ?>
			<li>
				<h3>
					Hola, <?php echo $name[0]; ?>
				</h3>
        		</li>
			
			<li>
				<h3>
					<a href="../Back-end/Logout.php" style="decoration: none; color: gray;">Cerrar sesi&oacute;n</a>
				</h3>
        		</li>
	<?php endif; ?>
        </ul>
      </div>
    </div>
    <div class="jumbotron">
      <div class="container">
      </div>
    </div> 

<div id="info2">
    
    </div><br><br>
<input type="submit" value="Ver servicios" onClick="showServices()" /><br><br>
    <div id="in">
    
    </div>

	
	<div class="container" style="width:50px; height:50px; ">
		<form style="left:50px;">
			valor<input type="text" name="valor" id="va" />
			tipo (Servicio/Producto) (respetar mayusculas)<input type="text" name="tipo"  id="tip"/>
			portafolio<input type="text" name="portafolio"/>
			<input type="submit" onClick="comprar()" id="port"/>
		</form>

	</div>

  </body>
</html>