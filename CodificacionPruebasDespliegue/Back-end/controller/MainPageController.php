<?php
public class MainPageModel extends AbstractController {

	public function __construct() {
		$this->model = new MainPageModel();
	}

	public function invoke() {
		if( isset($_POST['email']) && !empty($_POST['email']) && isset($_POST['password']) && !empty($_POST['password']) ) {
			$this->model->login();
		}
	}
}
?>
