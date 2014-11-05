<?php
    session_start();
    unset( $_SESSION['rol'] );
    unset( $_SESSION['numero_documento'] );
	header( 'Location: http://www.proyectoacme.hol.es/' );
?>