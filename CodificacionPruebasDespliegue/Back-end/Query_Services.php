<?php
include ('../Back-end/Connection.php');

//if($_SESSION['rol']=='Cliente'){
$Query="select * from Servicio";
$result=$mysqli->query($Query) or die ("no se puede establecer conexion");
echo "<h1>Servicios</h1>";
echo "<table>";
echo "<tr> <th>ID</th> <th>Nombre</th><th>Descripcion</th><th>Precio</th></tr>";

while($tupla = $result->fetch_row()){
	echo "<tr><td>".$tupla[0]."</td><td>".$tupla[1]."</td><td>".$tupla[2]."</td><td>".$tupla[3]."</td></tr>";
}
echo "</table>";
//}else{
//die ("no tienes permisos");
//}


?>