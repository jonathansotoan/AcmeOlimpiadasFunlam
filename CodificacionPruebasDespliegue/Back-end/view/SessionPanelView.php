<?php
if( !isset($mysqli) ) {
	echo "The file 'Back-end/model/Persistence/Connection.php' is not included and it is required";
}
session_start();

if( !isset( $_SESSION['numero_documento'] ) || empty( $_SESSION['numero_documento'] ) ): ?>
	<form class="navbar-form navbar-right" method="POST" action="../../Back-end/Login.php">
		<div class="form-group">
			<input type="text" name="email" class="form-control" placeholder="E-mail">
			<input type="password" name="password" class="form-control" placeholder="Contrase&ntilde;a">
		</div>
		<button type="submit" class="btn btn-default">Iniciar sesi&oacute;n</button><br />o <a href="../NewHtml/SignUp.php">Reg&iacute;strate</a>
	</form>
<?php else:
	$result = $mysqli->query( "SELECT nombre FROM " . (($_SESSION[rol] == 'Administrador') ? 'Administrador' : 'Persona') . " WHERE numero_documento=$_SESSION[numero_documento]" );
	$name = $result->fetch_array();
?>
	<li class="dropdown">
		<a href="../../Back-end/Logout.php" class="dropdown-toggle" data-toggle="dropdown">
			<h3 class="navbar-form navbar-right">
				Hola, <?php echo $name[0]; ?>
			</h3>
		</a>
		<span class="caret"></span>
		<ul class="dropdown-menu" role="menu">
			<li><a href="#">Perfil</a></li>
			<li class="divider"></li>
			<li><a href="../../Back-end/Logout.php">Cerrar sesi&oacute;n</a></li>
		</ul>
        </li>
<?php endif; ?>
