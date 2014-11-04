var directives = angular.module('directives', []);


// ======================================================================================
// Bases para la aplicación
// ======================================================================================

// Directiva de felicitaciones
directives.directive('congratulations', function () {
	return {
		restrict: 'A',
		templateUrl: '../views/common/congratulations.html'
	};
});

// Directiva de vuelve a intentarlo
directives.directive('failure', function () {
	return {
		restrict: 'A',
		templateUrl: '../views/common/failure.html',
		controller: function ($scope, $route) {
			$scope.refresh = function () {
				$route.reload();
			}
		}
	};
});

// Competencias
directives.directive('competences', function () {
	return {
		restrict: 'E',
		scope: {
			description1: '@',
			description2: '@'
		},
		templateUrl: '../views/common/competences.html',
		link: function (scope, element, attrs) {
			scope.$root.isNextEnabled = true;
		}
	};
});

// Show Tooltip
directives.directive('showTooltip', function () {
	return {
		restrict: 'C',
		link: function (scope, iElement, iAttrs) {
			$(iElement).tooltip({
				title: scope.word.title
			});
		}
	};
});

// Show Tooltip Attribute
directives.directive('showTooltip', function () {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			var title = scope.$parent.group.titles[scope.$index];
			$(iElement).tooltip({
				title: title,
				placement: "bottom"
			});
		}
	};
});

// Image zoom
directives.directive('ngElevateZoom', function () {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			//Will watch for changes on the attribute
		    iAttrs.$observe('zoomImage',function(){
		    	linkElevateZoom();
		    });
		      
		    function linkElevateZoom(){
		    	//Check if its not empty
		        if (!iAttrs.zoomImage) return;
		        iElement.attr('data-zoom-image',iAttrs.zoomImage);
		        $(iElement).elevateZoom();
		    }
		      
		    linkElevateZoom();
		}
	};
});

// Image popup
directives.directive('ngImagePopup', function () {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			console.log(arguments);
			$(iElement).magnificPopup({
				items: {
					src: scope.$root.resources + "/" + scope.modalSrc
				},
				type: "image"
			});
		}
	};
});


// ======================================================================================
// Útiles
// ======================================================================================

// Reproduce un sonido en el evento definido en la directiva. Ejm: hover => mouseenter
directives.directive('play', function () {
	return function (scope, element, attrs) {
		element.bind(attrs.on, function () {
			var sound = $('#' + attrs.play)[0];

			sound.load();
			sound.play();
		});
	}
});

// Crea un pequeño fade in del elemento cuando se cambia el valor del modelo
directives.directive('flash', function () {
	return {
		restrict: 'A',
		scope: {
			flash: '=flash'
		},
		link: function (scope, element, attrs) {
			scope.$watch('flash', function (flash) {
				if(flash){
					$(element).stop().hide().text(flash).fadeIn(function() {
						clearTimeout($(element).data("timeout"));
						$(element).data("timeout", setTimeout(function() {
							$(element).fadeOut();
						}, 1000));
					});
				}
			});
		}
	};
});

