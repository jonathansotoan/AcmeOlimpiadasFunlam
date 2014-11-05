<?php
	include( 'Connection.php' );
	session_start();
	
	function showProducts() {
		if( $_SESSION['rol'] == 'Cliente' )
			showProducts( $_SESSION['id'] );
		else {
			$clientsIDs = $mysqli->query( 'SELECT numero_documento FROM Cliente' );
			$clientsIDs = $clientsIDs->fetch_array();
			
			foreach( $clientsIDs as $id )
				showProducts( $id );
		}
	}
	
	function showServices() {
		if( $_SESSION['rol'] == 'Cliente' )
			showProducts( $_SESSION['id'] );
		else {
			$clientsIDs = $mysqli->query( 'SELECT numero_documento FROM Cliente' );
			$clientsIDs = $clientsIDs->fetch_array();
			
			foreach( $clientsIDs as $id )
				showProducts( $id );
		}
	}
	
	function showProducts( $clientID ) {
		$result = $mysqli->query( "SELECT * FROM Cliente_Producto WHERE numero_documento=$cleintID" );
		$result = $result->fetch_array();
			
		foreach( $result as $row ) {
			printItem( $row );
		}
	}
	
	function showServices( $clientID ) {
		$result = $mysqli->query( "SELECT * FROM Cliente_Servicio WHERE numero_documento=$cleintID" );
		$result = $result->fetch_array();
			
		foreach( $result as $row ) {
			printItem( $row );
		}
	}
	
	function printItem( $item ) {
		echo '<tr>';
		
		foreach( $item as $field ) {
			echo "<td>$field</td>";
		}
		
		echo '</tr>';
	}
?>