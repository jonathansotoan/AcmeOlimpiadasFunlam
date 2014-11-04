<?php
include ('Connection.php');

$Query="Select TIPO_TRANSACCION,PORTAFOLIO_ID from Transaccion where PERSONA_ID = $_SESSION[numero_documento]";

$result= mysql_query($Query,$connection);
$row =mysql_fetch_row($result);
$Query2="Select * from $row[0] where $row[1] = PORTAFOLIO_ID";
$ResultQuery2=mysql_query($Query2,$connection);
echo json_encode ("<table>");
echo json_encode ("<tr> <th> NOMBRE</th><th>DESCRIPCION </th> <th>PRECIO</th> </tr>");
while($tupla= mysql_fetch_row($result)){
	
	echo json_encode ("<tr>"."<td>".$tupla[1]."</td> "."<td>".$tupla[2]."</td> "."<td>".$tupla[3]."</td></tr>");
}
echo json_encode ("</table>");

?>