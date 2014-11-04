<script language="javascript" type="text/javascript">
//metodo para intercambiar información con php.
function nuevoAjax()
{
        var xmlhttp=false;
        try
        {
                // Creacion del objeto AJAX para navegadores no IE
                xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e)
        {
                try
                {
                        // Creacion del objet AJAX para IE
                        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch(E)
                {
                        if (!xmlhttp && typeof XMLHttpRequest!="undefined") xmlhttp=new XMLHttpRequest();
                }
        }
        return xmlhttp;
}
//metodo llamado para listar el portafolio de productos
function showProducts()
{
        ajax=nuevoAjax();
        ajax.open("GET", "Query_Products.php", true);
        ajax.onreadystatechange=function()
        {
                if (ajax.readyState==4)
                {
                        document.getElementById("texto").innerHTML=ajax.responseText;
						
                }
        }
        ajax.send(null);
}

//metodo llamado para listar el portafolio servicios
function showServices()
{
        ajax=nuevoAjax();
        ajax.open("GET", "Query_Services.php", true);
        ajax.onreadystatechange=function()
        {
                if (ajax.readyState==4)
                {
                        document.getElementById("texto").innerHTML=ajax.responseText;
						
                }
        }
        ajax.send(null);
}
//metodo llamado para listar el portafolio de productos y servicios
function listPortafolio(){
showProducts();
showServices();
}
//función para comprar productos o servicios
function comprar(var tipo){
ajax=nuevoAjax();
ajax.open("GET", "Movimientos_Cuenta.php", true);
ajax.onreadystatechange=function(){
 if (ajax.readyState==4)
                {
				if(ajax.responseText == 'yes'){
				alert ("operación realizada");
				location.href="menu.html";//ir a la página.
                  // document.getElementById("texto").innerHTML=ajax.responseText;
						}
                }
}
ajax.send();

}


function verificarsolicitudes(){
ajax=nuevoAjax();
ajax.open("GET", "MostrarPedidos.php", true);
ajax.onreadystatechange=function(){
 if (ajax.readyState==4)
                {
				
				//Tomar la respuesta.
                 document.getElementById("texto").innerHTML=ajax.responseText;
						
                }
}
ajax.send();

}

</script>
