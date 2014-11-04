var AppManager = function () {

  var AppManager = {
    // Referencia de $routeProvider
    routeProvider: {},

    // Rutas que ha ingresado el usuario sin procesar. Toma la variable routeBase en configModule
    routeBase: {},


    // Para producción en repositorios de sharepoint. IMPORTANTE!!!!
    MENUS: [
      "../../Primero/primero.html",
      "../../Segundo/segundo.html",
      "../../Tercero/tercero.html",
      "../../Cuarto/cuarto.html",
    ],

    /**
     * Devuelve un array con las rutas de routeBase
     * Usado principalmente para obtener la posición actual dentro de las rutas
     *
     * @return Array array con las rutas
     */
    getPathArray: function () {
      var arr = [];

      angular.forEach(this.routeBase.routes, function (route) {
        arr.push(route.name);
      });

      return arr;
    },

    /**
     * Configura el ruteador de la aplicación de modo que puede ser utilizado
     * posteriormente. La idea es generar un ruteador secuencial fácil de utilizar
     *
     * @param app      Object    Módulo de angular al cuál se le quieren ingresar las rutas
     * @param routeBase    Object    Objeto que posee 2 elementos:
     *    routes:
     *      name: nombre de la ruta. Ejemplo: '/ruta-1'
     *      templateUrl: plantilla de angular
     *      controller: controlador especificado
     *
     *    No obstante, se pueden pasar más elementos y usarlo como se desee
     */
    configModule: function (app, routeBase) {

      var self = this,
        actualRoute = {},
        nextRoute = {},
        lastRoute = app.name + "lr"; // Nombre de la variable en localStorage para cada una de las lecciones

      // Se almacena la información de las rutas sin procesar
      self.routeBase = routeBase;

      // Inicialmente, se referencia $routeProvider
      //
      // --------------------------------------------------------------------------
      app.config(function ($routeProvider) {
        self.routeProvider = $routeProvider;
      });

      /**
       * esta función de angular es especial
       * y nos permite definir gran cantidad de configuraciones de la aplicación.
       */
      app.run(function ($rootScope, $location, $route, $window) {

        // Recuperar sesión
        // --------------------------------------------------------------------------
       /** if (localStorage.getItem(lastRoute)) {
          routeBase.routes.unshift({
            name: '/recuperar',
            templateUrl: '../views/common/last_route.html',
            controller: function ($scope, $location) {
              $scope.$root.isNextEnabled = true;

              //
               // Nos dirige a la última ruta usada por el usuario.
               //
              $scope.goToLastVisited = function () {
                $location.path($scope.$root.routes[localStorage.getItem(lastRoute)].name);
              };

            },
            title: 'Recuperar sesión'
          });
        }
        **/


        // Constructor del ruteador en base a las rutas definidas por el desarrollador
        // --------------------------------------------------------------------------
        angular.forEach(routeBase.routes, function (route) {
          // Si el objeto simplemente tiene la propiedad addView, entonces se inserta la vista de grupos
          if (route.hasOwnProperty('addView')) {

            // Se debe actualizar la ruta como con la información misma
            route.name = '/rout add';
            route.title = 'rout title';

            // Se añade la ruta al proveedor
            self.routeProvider.when(route.name, {
              templateUrl: '../views/common/add-view.html',
              controller: function ($scope) {
                // guardar en localStorage
                $scope.setLocal = function (param) {
                  localStorage.setItem('param', param);
                  $rootScope.isNextEnabled = true;
                  $rootScope.goNext(); // Ir a la siguiente ruta
                }
              }
            });

          } else {
            // Añadimos normalmente la ruta definida por el desarrollador
            self.routeProvider.when(route.name, { templateUrl: route.templateUrl, controller: route.controller });
          }
        });


        // Ruta de evidencias
        // --------------------------------------------------------------------------
        if (routeBase.hasOwnProperty('lastRoute') === true) {
          self.routeProvider.when('/ultima ruta', {
            templateUrl: '../views/common/ultima_ruta.html',
            controller: function ($scope) {
              $scope.description = routeBase.evidences;
              $scope.evidencesSound = routeBase.evidencesSound;
              $scope.$root.isNextEnabled = true;
            }
          });

          routeBase.routes.push({ name: '/ultimaruta', title: 'este es el titulo de la ultima ruta' });
        }


        // Ruta de despedida
        // --------------------------------------------------------------------------
        self.routeProvider.when('/final', {
          templateUrl: '../views/common/final.html',
          controller: function ($scope,$sce) {

              // Para usar el html en angular
              $scope.sanitize = function (item) {
                return $sce.trustAsHtml(item);
              }
              
           }
        });

        routeBase.routes.push({ name: '/final' });

        // Ruta por defecto
        // --------------------------------------------------------------------------
        // Cuando se ponga una ruta diferente a las definidas inicialmente, ir a la primera.
        self.routeProvider.otherwise({ redirectTo: routeBase.routes[0].name  });
        $route.reload(); // Recargamos el ruteador, para que así lea las rutas definidas


        // ======================================================================================
        // Router - Funcionalidad global - Toda funcionalidad añadida debe ir AQUÍ
        // ======================================================================================
        $rootScope.routes = AppManager.routeBase.routes; // Referencia a las rutas de AppManager para usarlas dentro de angular
        $rootScope.resources = routeBase.resources; // Carpeta de recursos de la pagina
        $rootScope.lessonTitle = ''; // Título de cada ruta que se ve arriba


        // $routeChangeStart
        // --------------------------------------------------------------------------
        // Esta función corre cada vez que cambia la ruta.
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
          $rootScope.pathIndex = self.getPathArray().indexOf($location.path()); // Busca el índice de la ruta dentro de las rutas

          // Guardamos el índice de la actividad más avanzada hasta el momento.
          if(localStorage.getItem(lastRoute)) {
            if($rootScope.pathIndex > localStorage.getItem(lastRoute))
              localStorage.setItem(lastRoute, $rootScope.pathIndex);
          } else {
            localStorage.setItem(lastRoute, $rootScope.pathIndex);
          }

          // Por defecto, esta propiedad esta en falso y permite activar/desactivar el botón de la siguiente ruta
          $rootScope.isNextEnabled = false;

          // Actualizamos la ruta actual
          actualRoute = $rootScope.routes[$rootScope.pathIndex];

          // Analizamos la siguiente ruta, con el fin de analizar si el grupo es permitido
          nextRoute = $rootScope.routes[$rootScope.pathIndex + 1] ? $rootScope.routes[$rootScope.pathIndex + 1] : false;

          // Actualizamos el título de la lección en base a la ruta
          $rootScope.lessonTitle = actualRoute.hasOwnProperty('title') !== "undefined" ? actualRoute.title : "";

          // Reiniciamos el valor de farewell
          $rootScope.isFarewell = false;

          // Grupos de estudiantes
          // --------------------------------------------------------------------------
          // Identifica si la siguiente ruta no es permitida para el estudiante, definiendo la despedida.
          // IMPORTANTE: Esta funcionalidad solo se usó en el grado 1 de primaria incluyente.
          if (typeof nextRoute.excludedGroups !== "undefined") {
            var actualGroup = localStorage.getItem('group');

            if (nextRoute.excludedGroups.bears) { if (actualGroup == $rootScope.GROUPS.BEARS) $rootScope.isFarewell = true; }
            if (nextRoute.excludedGroups.tigers) { if (actualGroup == $rootScope.GROUPS.TIGERS) $rootScope.isFarewell = true; }
            if (nextRoute.excludedGroups.lions) { if (actualGroup == $rootScope.GROUPS.LIONS) $rootScope.isFarewell = true; }
          }
        });


        /**
         * Nos dirige a la ruta anterior.
         */
        $rootScope.goPrev = function () {
          // Función que se ejecuta antes de ir a la ultima actividad
            if (typeof $rootScope.beforeGoLast !== "undefined") {
              if ($rootScope.beforeGoLast()) {
                return false;
              }
            }

          // Solo si el índice es 0, de modo que no nos salgamos del array
          if ($rootScope.pathIndex !== 0 ) {
            if ($rootScope.pathIndex === $rootScope.routes.length - 2) {
              $window.history.back();
            } else {
              $location.path($rootScope.routes[$rootScope.pathIndex - 1].name);
            }
          }
        };


        /**
         * Nos dirige a la ruta siguiente.
         */
        $rootScope.goNext = function () {
          // Si la ruta actual es diferente al último elemento y isNextEnabled es verdadero
          if ($rootScope.pathIndex !== $rootScope.routes.length - 1 && $rootScope.isNextEnabled) {

            // Función que se ejecuta antes de ir a la siguiente actividad
            if (typeof $rootScope.beforeGoNext !== "undefined") {
              if ($rootScope.beforeGoNext()) {
                $rootScope.beforeGoNext = undefined; // Limpiamos la función
                return false;
              }
            }

            // Si $rootScope.isFarewell es verdadero, entonces redirigimos a la despedida (última ruta)
            if ($rootScope.isFarewell) {
              $location.path($rootScope.routes[$rootScope.routes.length - 2].name);
            } else {
              // Sino, rutear normalmente (sencuencia)
              $location.path($rootScope.routes[$rootScope.pathIndex + 1].name);
            }
          }
        };


        /**
         * Nos dirige a la última ruta usada por el usuario.
         */
        $rootScope.goToLastVisited = function () {
           
          $location.path($rootScope.routes[localStorage.getItem(lastRoute)].name);
        };


      });
    }
  };

  return AppManager;

};





var factories = angular.module('factories', []);

factories.factory('shuffleArrayFactory', function () {
	this.run = function(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	};

	return this;
});

var activities = angular.module('activities', [
  // Módulos de angular
  'ngRoute',
  'ui.sortable',

  // Otros
  'directives',
  'factories',
  'home',
  'transclusion',
  'popoverDirective',
  'dragDropDirective',//jeison caro :::formar una frase arrastrando las palabras:::

  

]);

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

var appManager = AppManager();
var index = angular.module('index', ['activities']);

appManager.configModule(index, {
	resources: '../resources/index/',
	farewell: 'arg1',
	evidencesSound:true,
	evidences: 'arg2',
	routes:[
		{ 
			name: '/inicio', 
			templateUrl: 'home', 
			controller: 'HomeCtrl',
			title: 'Proyecto Acme'
		},
		{ 
			name: '/Portafolio-de-servicios', 
			templateUrl: 'page2', 
			controller: 'Page2Ctrl',
			title: 'Portafolio de servicios'
		}
	]
	
});

index.controller('HomeCtrl', function($scope){
 $scope.data = {
    ext: '.png',
    customClass: 'width-700-400',
    images: [
      { 
        number:'1',
        src: "slide1",
        alt: "texto alternativo",
        title: 'slide1',
      },
      { 
        number:'2',
        alt: "texto alternativo",
        title: 'silde2',
        src: "slide2"
      },
      { 
        number:'3',
        src: "slide3",
        alt: "texto alternativo",
        title: 'slide3',
      },
      { 
        number:'4',
        alt: "texto alternativo",
        title: 'silde2',
        src: "slide4"
      }
    ],

    //genera los eventos 
    items: [
      { 
        property1:'8:00',
        property2: 'Property2',
        property3: 'property3',
        property4: 'property4',
        property5: 'property5'
      },
      { 
        property1:'8:00',
        property2: 'Property2',
        property3: 'property3',
        property4: 'property4',
        property5: 'property5'
      },
      { 
        property1:'8:00',
        property2: 'Property2',
        property3: 'property3',
        property4: 'property4',
        property5: 'property5'
      },
      { 
        property1:'8:00',
        property2: 'Property2',
        property3: 'property3',
        property4: 'property4',
        property5: 'property5'
      },
      { 
        property1:'8:00',
        property2: 'Property2',
        property3: 'property3',
        property4: 'property4',
        property5: 'property5'
      },
      { 
        property1:'8:00',
        property2: 'Property2',
        property3: 'property3',
        property4: 'property4',
        property5: 'property5'
      },
      { 
        property1:'8:00',
        property2: 'Property2',
        property3: 'property3',
        property4: 'property4',
        property5: 'property5'
      },
      { 
        property1:'8:00',
        property2: 'Property2',
        property3: 'property3',
        property4: 'property4',
        property5: 'property5'
      },
    ],

    //items acordion
     collapse: [
      { 
        title: 'This item is collapsable',
        text: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven t heard of them accusamus labore sustainable VHS.',
        property4: 'property4',
        property5: 'property5'
      },
      { 
        title: 'This item is collapsable',
        text: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven t heard of them accusamus labore sustainable VHS.',
        property4: 'property4',
        property5: 'property5'
      },
      { 
        title: 'This item is collapsable',
        text: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven t heard of them accusamus labore sustainable VHS.',
        property4: 'property4',
        property5: 'property5'
      },
    ]
  };
});

index.controller('Page2Ctrl', function($scope){
  console.log($route);
  //items acordion
  $scope.collapse= [
      { 
        title: 'This item is collapsable',
        text: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven t heard of them accusamus labore sustainable VHS.',
        property4: 'property4',
        property5: 'property5'
      },
      { 
        title: 'This item is collapsable',
        text: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven t heard of them accusamus labore sustainable VHS.',
        property4: 'property4',
        property5: 'property5'
      },
      { 
        title: 'This item is collapsable',
        text: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven t heard of them accusamus labore sustainable VHS.',
        property4: 'property4',
        property5: 'property5'
      },
    ];

   /**
   * Selecciona el vinvulo actual
   */
  $scope.$root.selectLink = function (item) {
  
  };
});


// Binding for flash messages
ko.bindingHandlers.flash = {
    init: function(element) {
        $(element).hide();
    },
    update: function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (value) {
            $(element).stop().hide().text(value).fadeIn(function() {
                clearTimeout($(element).data("timeout"));
                $(element).data("timeout", setTimeout(function() {
                    $(element).fadeOut();
                    valueAccessor()(null);
                }, 1000));
            });
        }
    },
    timeout: null
};
function setResponsive() {
	var a = $(window).width(),
		b = ((a*0.4878472913616398)+"px")
		
console.log(a);

	$('.oneByOne_item').css('width',a)

	

 }; 

 

 $(document).ready(function () {
	setResponsive();

	
	
 });

 $(window).resize(function () {
	setResponsive();

	
	
 });


var popoverDirective = angular.module('popoverDirective', []);

popoverDirective.directive('popoverDirective', function  ($sce) {
    return {
        restrict: 'E',
        templateUrl: '../views/popover_directive.html',
		scope: {
			options: '=',
			description: '@',
			titlehead: '@',
			instruction: '@',
			audio:'@'
			
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.canvas = scope.options.canvas; // La imagen principal
			scope.altcanvas = scope.options.altcanvas; // texto alternativo de La imagen principal
			scope.titlecanvas = scope.options.titlecanvas; // titulo de La imagen principal
			scope.imgStyle = scope.options.imgStyle; // estilos de La imagen principal
			scope.success = false;
			scope.event = scope.options.eventClick ? 'click' : 'mouseover';
			scope.eventNone = scope.options.eventNOne;
			scope.block = false;
			completedItems = 0;
			scope.hidetext = scope.options.hidetext//activar para ocultar el popover cuando termina el evento
			scope.mainText = scope.options.mainText//agrega texto html ala actividad
			scope.htmlText = scope.options.htmlText//agrega texto html que remplaza la imagen principal 

			if(scope.eventNone) {
			 scope.$root.isNextEnabled = true; // Activa la flecha de siguiente
			 scope.event = 'none'
			}

			/**
			 * Marca los elementos y verifica el final
			 */
			scope.verify = function (item) {
				if(item.completed) return;

				item.completed = true;

				var countCompleted = scope.items.filter(function(item){
					return item.completed;
				}).length;
				console.log(countCompleted);
				if(countCompleted === scope.items.length) {
					scope.$root.isNextEnabled = true; // Activa la flecha de siguiente
				}
			};

			// Para usar el html en angular
			scope.sanitize = function (item) {
				return $sce.trustAsHtml(item);
			}

			/**
			 * Para obtener los estilos de los elementos, específicamente el ancho
			 */
			scope.getTargetsStyles = function (item) {
				var styles = '';

				styles += 'width: ' + item.w + 'px;';
				styles += 'height: ' + item.h + 'px;';
				styles += 'top: ' + item.t + '%;';
				styles += 'left: ' + item.l + '%;';

				// estilos personalizados
					if(scope.options.hasOwnProperty('customStyles')) styles += scope.options.customStyles;

				return styles;
			};

		}
	}; 
});

popoverDirective.directive('popover', function($timeout){
	return {
	    restrict: 'A',
			scope: {
				item: '=',
				popoverText: '@',
				popoverPlacement: '@',
				popoverTitle: '@',
				popoverEvent:'@',
				popoverTemplate:'@',
				hidetext: '@',

			},
	    link : function (scope, element, attrs) {
				var disable = false;

				$timeout(function(){
					$(element).popover({
						animation: true,
						placement: scope.popoverPlacement,
						title: scope.popoverTitle,
						template: scope.popoverTemplate,
						trigger: 'manual',
						html: true,
						content: scope.popoverText//container: 'body'
					});
				});
				
				if(scope.hidetext){
					element.bind('mouseleave', function (e) {
						
						$(element).popover('hide');
					});

					element.bind(scope.popoverEvent, function (e) {
						
						$(element).popover('show');

					});
				};

					element.bind(scope.popoverEvent, function (e) {
						if(disable) return; // Solo se anima la primera vez
						
						$(element).popover('show');
						disable = true;
					});

    	}
	};
});




var transclusion = angular.module('transclusion', []);

transclusion.directive('transclusion', function ($sce) {
	return {
		restrict: 'E',
		templateUrl: '../views/transclusion.html',
		transclude: true,
		scope: {
			title: '@',
			description: '@',
			instruction: '@',
			audio: '@',
			arrow: '=',
			addicon: '@',
      		mouse: '='
		},

		link: function (scope) {

			// Para usar el html en angular
			scope.sanitize = function (item) {
				return $sce.trustAsHtml(item);
			}

		}
	};
});


//# sourceMappingURL=app.js.map