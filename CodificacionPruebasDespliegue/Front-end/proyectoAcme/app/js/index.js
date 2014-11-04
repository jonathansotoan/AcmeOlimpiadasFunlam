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

