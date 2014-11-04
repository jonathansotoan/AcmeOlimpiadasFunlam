<?php
    include( 'Connection.php' );
    session_start();

    if( isset( $_POST[ 'email' ] ) && !empty( $_POST[ 'email' ] ) &&
        isset( $_POST[ 'password' ] ) && !empty( $_POST[ 'password' ] ) ) {
        $result = $mysqli->query( "SELECT numero_documento FROM Administrador WHERE NOMBRE_USUARIO='" . $_POST['email'] . "' and CONTRASENA='" . $_POST['password'] . "'" );

        if( $result->num_rows == 1 ) {
            $_SESSION['rol'] = 'Administrador';
			$array = $result->fetch_array();
			$_SESSION['numero_documento'] = $array[0];
        } else {
			$ids = $mysqli->query( "SELECT numero_documento FROM Persona WHERE email='$_POST[email]'" );
			$ids = $ids->fetch_array();
			
			$resultClient = $mysqli->query( "SELECT numero_documento FROM Cliente WHERE numero_documento=$ids[0]" );
			$resultEmployee = $mysqli->query( "SELECT numero_documento FROM Funcionario WHERE numero_documento=$ids[0]" );
			
			if( $resultClient->num_rows == 1 ) {
				$_SESSION['rol'] = 'Cliente';
				$_SESSION['numero_documento'] = $ids[0];
			} else if( $resultEmployee->num_rows == 1 ) {
				$_SESSION['rol'] = 'Funcionario';
				$_SESSION['numero_documento'] = $ids[0];
			}
		}
    }
	
	header( 'Location: http://www.proyectoacme.hol.es/' );
?>