<?php
	include( '../../../../../Back-end/model/Persistence/Connection.php' );
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
            <?php include('../../../../../Back-end/view/SessionPanelView.php'); ?>
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
