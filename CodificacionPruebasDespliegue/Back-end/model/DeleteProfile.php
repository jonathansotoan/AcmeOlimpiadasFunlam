<?php
	include( 'Connection.php' );
	session_start();

	if( $_SESSION['rol'] == 'Administrador' &&
		isset( $_POST['numero_documento'] ) && !isset( $_POST['numero_documento'] ) &&
		isset( $_POST['rol'] ) && !isset( $_POST['rol'] ) )
		$mysqli->query( "DELETE FROM $_POST[rol] WHERE numero_documento=$_POST[numero_documento]" );
?>