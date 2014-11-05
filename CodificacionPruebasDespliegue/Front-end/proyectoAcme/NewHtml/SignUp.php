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
        ajax.open("GET", "http://proyectoacme.hol.es/scripts/Query_Products.php", true);
        ajax.onreadystatechange=function()
        {
                if (ajax.readyState==4)
                {
                        document.getElementById("info").innerHTML=ajax.responseText;
						
                }
        }
        ajax.send(null);
}
	</script>
	<style>
		table {
			border-top: 50px;
			margin: auto;
		}

		td {
			padding: 5px;
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

	<div id="contenido">
		<form method="POST" action="../Back-end/SignUp.php">
		<br><br>
		<table>
		<tr>
		<td>Tipo de documento</td>
		<td>
		<select name="tipo_documento">
			<option value="">--Seleccione opci&oacute;n</option>
			<option value="C">C&eacute;dula de Ciudadan&iacute;a</option>
			<option value="E">C&eacute;dula de Extranjer&iacute;a</option>
		</select>
		</td>
		</tr>
		<tr>
		<td>N&uacute;mero de documento</td>
		<td>
		<input type="text" required name="numero_documento" />
		</td>
		</tr>
		<tr>
		<td>Nombre</td>
		<td>
		<input type="text" required name="nombre" />
		</td>
		</tr>
		<tr>
		<td>Apellido</td>
		<td>
		<input type="text" required name="apellido" />
		</td>
		</tr>
		<tr>
		<td>Tel&eacute;fono</td>
		<td>
		<input type="number" required name="telefono" />
		</td>
		</tr>
		<tr>
		<td>Correo electr&oacute;nico</td>
		<td>
		<input type="email" required name="email" />
		</td>
		</tr>
		<tr>
		<td>Direcci&oacute;n</td>
		<td>
		<input type="text" required name="direccion" />
		</td>
		</tr>
		<tr>
		<td>Ciudad</td>
		<td>
		<input type="text" required name="ciudad" />
		</td>
		</tr>
		<tr>
		<td>Contrase&ntilde;a</td>
		<td>
		<input type="password" required name="contrasena" />
		</td>
		</tr>
		<tr>
		<td>Confirma tu contrase&ntilde;a</td>
		<td>
		<input type="password" required name="contrasena2" />
		</td>
		</tr>
		<tr>
		<td></td>
		<td>
		<input type="submit" placeholder="Regsitrarse" />
		</td>
		</tr>
		</table><br><br>
		</form>
	</div>
  </body>
</html>