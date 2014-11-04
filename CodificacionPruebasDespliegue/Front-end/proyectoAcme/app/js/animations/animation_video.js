/**
* La actividad permite ver una animación tomando un video corto como fuente.
*/
var lizAnimationVideo = angular.module('lizAnimationVideo', []);

lizAnimationVideo.directive('animationVideo', function () {
	return {
		restrict: 'E',
		templateUrl: '../views/animations/animation_video.html',
		scope: {
			options: '=',
			instruction: '@',
			title: '@',
			description: '@',
			audio: '@'
		},
		link: function (scope, iElement, iAttrs) {


			scope.complete = true; // Cuando termina la actividad
			scope.block = false;
			scope.ended = false;
			scope.startButton = false;

			// watch if the activity is finished
			scope.$watch('complete', function(complete) {
				if (complete) {
					scope.$root.isNextEnabled = true;
				} 
			});

			scope.item = scope.options;

			// Si la descripción o el título están, entonces la instrucción va al fondo
			scope.isBottom = scope.title || scope.description;

			scope.animationEnded = function () {
				scope.$root.isNextEnabled = true;
				console.log("Asd");
			};
		}
	};
});