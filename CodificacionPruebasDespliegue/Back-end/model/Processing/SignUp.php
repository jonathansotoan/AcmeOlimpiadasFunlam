<?php
    include( 'Connection.php' );
    
    if( isset( $_POST['numero_documento'] ) && !empty( $_POST['numero_documento'] ) &&
        isset( $_POST['tipo_documento'] ) && !empty( $_POST['tipo_documento'] ) &&
        isset( $_POST['nombre'] ) && !empty( $_POST['nombre'] ) &&
        isset( $_POST['apellido'] ) && !empty( $_POST['apellido'] ) &&
        isset( $_POST['telefono'] ) && !empty( $_POST['telefono'] ) &&
        isset( $_POST['email'] ) && !empty( $_POST['email'] ) &&
        isset( $_POST['direccion'] ) && !empty( $_POST['direccion'] ) &&
        isset( $_POST['ciudad'] ) && !empty( $_POST['ciudad'] ) ) {
        
		$mysqli->query( "INSERT INTO Persona VALUES('$_POST[numero_documento]', '$_POST[tipo_documento]', '$_POST[nombre]', '$_POST[apellido]', '$_POST[telefono]', '$_POST[email]', '$_POST[direccion]', '$_POST[ciudad]')");
		$mysqli->query( "INSERT INTO Cliente VALUES($_POST[numero_documento], NULL, NULL)" );
	}
	
	header( 'Location: http://www.proyectoacme.hol.es/' );
?>