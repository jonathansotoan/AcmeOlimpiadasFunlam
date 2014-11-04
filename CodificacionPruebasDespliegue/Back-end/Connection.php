<?php
    $host = 'mysql.hostinger.co';
    $dbName = 'u838896728_pacme';
    $dbUsername = 'u838896728_quetz';
    $dbPassword = 'donottrytobreak';
    
    $mysqli = new mysqli( $host, $dbUsername, $dbPassword, $dbName );
	
	if( $mysqli->connect_error )
		die( 'Error al conectarse a la base de datos (' . $mysqli->connect_errno. ')' . $mysqli->connect_error );
?>