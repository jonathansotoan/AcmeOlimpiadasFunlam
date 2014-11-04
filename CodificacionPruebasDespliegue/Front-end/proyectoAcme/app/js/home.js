var home = angular.module('home', []);

home.directive('home', function () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			title: '@'
		},
		templateUrl: '../views/home.html',
		link: function (scope, element, attrs) {
			var opt = scope.options;

			scope.images = opt.images;
			scope.items = opt.items;
			scope.collapse = opt.collapse;
			scope.ext = opt.ext ? opt.ext : '.png';
			scope.customClass = opt.customClass;

			/**
			 * Devuelve los estilos personalizados de los items
			 */
			scope.getItemStyles = function () {
				var styles = "";

				styles += "width: " + (100 / 1) + "%;";

				return styles;
			};

			/**
			 * muestra el modal
			 */
			scope.showModal = function (title,subTitle,btnText) {
				alert('hello')
				scope.modal= {
					title: title ? title : 'hello',
					subTitle: subTitle ? subTitle : 'hello',
					btnText: btnText ? btnText : 'hello',
				},
				console.log(scope.success);
				scope.success = true
				console.log(scope.success);
			};

		}
	}; 
});

home.directive('slides', function($timeout){
	return {
	    restrict: 'A',
			scope: {
				items: '='
			},
	    link : function (scope, element, attrs) {
				$timeout(function(){
					$(element).slidesjs({
						width: 500,
						height: 550,
						play: {
					      active: false,
					        // [boolean] Generate the play and stop buttons.
					        // You cannot use your own buttons. Sorry.
					      effect: "fade",
					        // [string] Can be either "slide" or "fade".
					      interval: 5000,
					        // [number] Time spent on each slide in milliseconds.
					      auto: true,
					        // [boolean] Start playing the slideshow on load.
					      swap: false,
					        // [boolean] show/hide stop and play buttons
					      pauseOnHover: true,
					        // [boolean] pause a playing slideshow on hover
					      restartDelay: 2500
					        // [number] restart delay on inactive slideshow
					    },
						navigation: {
							active: true,
							// [boolean] Generates next and previous buttons.
							// You can set to false and use your own buttons.
							// User defined buttons must have the following:
							// previous button: class="slidesjs-previous slidesjs-navigation"
							// next button: class="slidesjs-next slidesjs-navigation"
							effect: "slide"
							// [string] Can be either "slide" or "fade".
						},
						pagination: {
							active: false,
							// [boolean] Create pagination items.
							// You cannot use your own pagination. Sorry.
						},
						callback: {
							complete: function (number) {
								// Activa el siguiente cuando llega a la última diapositiva
								if(number === scope.items.length) {
									scope.$root.isNextEnabled = true;
									scope.$apply();
								}
							}
						}
					});
				});
    	}
	};
});

home.directive('collapse', function($timeout){
	return {
	    restrict: 'A',
			scope: {
				item: '=',
				parent: '@',
				toggle: '@',
				target: '@'

			},
	    link : function (scope, element, attrs) {
				var show = false;

				$timeout(function(){
					$(element).collapse({
						parent: scope.parent,
						toggle: scope.toggle,
						target: scope.target,
					});
				});

				element.bind('click', function (e) {
					if(show){$(attrs.collapseTarget).collapse('hide'),show = false}
					else{$(attrs.collapseTarget).collapse('show');show = true};
				});

    	}
	};
});
