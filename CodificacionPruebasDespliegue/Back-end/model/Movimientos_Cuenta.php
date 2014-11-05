<?php
include ('Connection.php');
$ValorCompra=$_POST['valor'];
$TipoCompra=$_POST['tipo'];
$IdPort=$_POST['portafolio']

function tienefondos($valor,$tipo,$Id){
$Query="Select Dinero from Cuenta where PROPIETARIO_ID = $_SESSION[numero_documento]";

$result= mysql_query($Query,$connection);

while($row =mysql_fetch_row($result)){
	if($row[0]>=$valor){
		if(Transaccion($row[0],$valor)){
		AddCompra($tipo,$Id);
		echo json_encode ("yes");
		}else{
		echo json_encode ("no");
		}
	}
}
}

function Transaccion($inicial,$compra){
$nuevo_total=($inicial-$compra);
$Query="update Cuenta set DINERO=$nuevo_total where PROPIETARIO_ID=$_SESSION[numero_documento]";
$result =mysql_query($Query,$connection);
if($result == true){
return true;
}else{
return false;
}

}

function AddCompra($Tipo,$IdP){
$Query="insert into Transaccion (PERSONA_ID,TIPO_TRANSACCION,PORTAFOLIO_ID) values ($_SESSION[numero_documento],$Tipo,$IdP)";
mysql_query($Query,$connection);
}
?>