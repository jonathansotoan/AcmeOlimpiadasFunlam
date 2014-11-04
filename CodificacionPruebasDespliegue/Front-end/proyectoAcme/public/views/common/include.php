<?php
	include( '../../Back-end/Connection.php' );
	session_start();
?>
<!-- <link rel="stylesheet" type="text/css" href="../app/styles/common/senales.css" /> -->
 <!-- Brand and toggle get grouped for better mobile display -->
  <div class="nav-container">
    <!-- topHeaderSection --> 
  <nav class="navbar navbar-default navbar-fixed-top bg-2" role="navigation">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#"></a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse fc-W" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Inicio</a></li>
        <li class="dropdown">
          <a  class="dropdown-toggle" data-toggle="dropdown">Con&oacute;cenos<span class="caret"></span></a>
          <ul class="dropdown-menu" role="menu">
            <li><a href="#">Galer&iacute;a</a></li>
            <li><a href="#">Videos</a></li>
            <li><a href="#">Misi&oacute;n</a></li>
            <li><a href="#">Visi&oacute;n</a></li>
            <li><a href="#">Valores corporativos</a></li>
            <li><a href="#">Compromiso social</a></li>
            <li class="divider"></li>
            <li><a href="#">Comentarios</a></li>
          </ul>
        </li>
	<li class="dropdown">
	<?php if( isset( $_SESSION['rol'] ) && !empty( $_SESSION['rol'] ) ): ?>
          <a  class="dropdown-toggle" data-toggle="dropdown">Men&uacute;<span class="caret"></span></a>
          <ul class="dropdown-menu" role="menu">
            <li><a href="../NewHtml/Productos.php">Nuestros productos</a></li>
            <li><a href="../NewHtml/Servicios.php">Nuestros servicios</a></li>
            <li class="divider"></li>
          </ul>
        </li>
	<?php endif; ?>
        <li class="dropdown">
         
          <li><a href="#">Contacto</a></li>
        </li>
      </ul>
		<?php if( !isset( $_SESSION['numero_documento'] ) || empty( $_SESSION['numero_documento'] ) ): ?>
			  <form class="navbar-form navbar-right" method="POST" action="../../Back-end/Login.php">
				<div class="form-group">
				  <input type="text" name="email" class="form-control" placeholder="E-mail">
				  <input type="password" name="password" class="form-control" placeholder="Contrase&ntilde;a">
				</div>
				<button type="submit" class="btn btn-default">Iniciar sesi&oacute;n</button>
<br>o <a href="../NewHtml/SignUp.php">Reg&iacute;strate</a>
			  </form>
		<?php else:
			$result = $mysqli->query( "SELECT nombre FROM " . (($_SESSION[rol] == 'Administrador') ? 'Administrador' : 'Persona') . " WHERE numero_documento=$_SESSION[numero_documento]" );
			$name = $result->fetch_array(); ?>
			<li class="dropdown">
				<a href="../../Back-end/Logout.php" class="dropdown-toggle" data-toggle="dropdown">
					<h3 class="navbar-form navbar-right">
						Hola, <?php echo $name[0]; ?>
					</h3>
				</a>
				<span class="caret"></span>
				<ul class="dropdown-menu" role="menu">
					<li><a href="#">Perfil</a></li>
					<li class="divider"></li>
					<li><a href="../../Back-end/Logout.php">Cerrar sesi&oacute;n</a></li>
				</ul>
        </li>
		<?php endif; ?>
      <ul class="nav navbar-nav navbar-left">
        
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</div>
<div id="cuerpo"> 
	

	<div id="main-container"> 
		<div ng-view></div>
	</div> <!--/.main-container-->


	

</div> <!--/#cuerpo-->
|