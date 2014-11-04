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




