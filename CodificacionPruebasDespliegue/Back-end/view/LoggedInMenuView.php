<?php
include_once('../model/Persistence/Connection.php');
session_start();

if( isset( $_SESSION['rol'] ) && !empty( $_SESSION['rol'] ) ): ?>
	<a  class="dropdown-toggle" data-toggle="dropdown">Men&uacute;<span class="caret"></span></a>
	<ul class="dropdown-menu" role="menu">
		<li><a href="../NewHtml/Productos.php">Nuestros productos</a></li>
		<li><a href="../NewHtml/Servicios.php">Nuestros servicios</a></li>
		<li class="divider"></li>
	</ul>
<?php endif; ?>
