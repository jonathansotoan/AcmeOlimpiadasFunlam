var dragDropDirective = angular.module('dragDropDirective', []);

dragDropDirective.directive('dragDropDirective', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/drag_drop_directive.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.pattern = scope.items.pattern;
			scope.customClass = (scope.options.customClass) ? scope.options.customClass : "";
			scope.rightPhrase = scope.options.rightPhrase + ' ';
			minRightAnswers = scope.options.minRightAnswers
			rightAnswers = 0, // Contador de preguntas buenas
			chances = scope.options.chances,
			scope.success = false;
			scope.failure = false;
			scope.block = false;
			scope.targets = [];
			scope.phrase = ""

			/**
			 * funcion que se ejecuta cuando se suelta un elemento
			 */
			scope.dropCallback = function (target) {

				scope.items.forEach(function(item,index){
					 if (typeof item !="string") {
					 	scope.items.splice( index, 1 );
					 }
				});
			};

			/**
			 * Definimos nuestra función beforeGoNext para que muestre el cuadro de felicitaciones
			 */
			scope.$root.beforeGoNext = function () {

			};

			
			/**
			 * Verifica si el input cumple con las condiciones del número 
			 */

			scope.verify = function () {
				// Empezamos a recorrer todas las palabras y armando la frase
				scope.phrase = ""
				scope.targets.forEach(function(target){
					scope.phrase += target + ' ';
					console.log(scope.phrase);
					/*if (scope.phrase.indexOf(target) === -1) {
						scope.phrase += target + ' ';
						console.log(scope.phrase);
					}*/
					
				});

				if(scope.phrase === scope.rightPhrase){

					scope.$root.isNextEnabled = true; // Activamos el siguiente vínculo	
					scope.success = true;
					return true; 
				}else{
					scope.failure = true;
					return true; 
				}
	
					
			}; // verify()



		}


    }; 
});

