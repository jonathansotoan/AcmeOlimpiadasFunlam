var lizAnimationBase = angular.module('lizAnimationBase', []);

lizAnimationBase.directive('animationBase', function () { 
	
	return {
		restrict: 'E',
		templateUrl: '../views/animations/animation_base.html',
		transclude: true,
		scope: {
			title: '@',
			instruction: '@',
			description: '@',
			animationId: '@',
			time: '='
		},
		link: function (scope, element, attrs){

			var intervalTime = 0, // Variable que almacena los milisegundos para cada uno de los pasos
				timer = {}; // Contenedor de los timeout

			scope.isBottom = scope.title || scope.description;
			scope.animationClass = ''; // Elemento para el manejo de las clases
			scope.isRunning = false; // Variable para ver si la aplicación está corriendo
			
			/**
			 * Corre la animación 
			 */
			scope.run = function () {

				// no permitir que la animación corra nuevamente
				if(scope.isRunning) return;

				// Reiniciamos los valores
				scope.animationClass = ''; 
				intervalTime = 0;

				scope.isRunning = true; // Animación Corriendo

				// Definimos los pasos en base a los tiempos definidos
				scope.time.forEach(function (time, index) {

					// Actualizamos la clase con cada nuevo paso
					setTimeout(function() {
						scope.animationClass += ' step-' + (index + 1);
						console.log(intervalTime);
						scope.$apply();
					}, intervalTime += time * 1000);

				});

				setTimeout(function() {
					scope.isRunning = false; // Reactivamos la posibilidad de hacer la animación
					scope.$root.isNextEnabled = true; // Activamos la siguiente ruta
					scope.$apply();
				}, intervalTime);

			};

		}
	};

});
