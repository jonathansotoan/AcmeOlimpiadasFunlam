exports.config =
	# See http://brunch.readthedocs.org/en/latest/config.html for documentation.
	modules:
		wrapper: false
		definition: false

	files:
		javascripts:
			joinTo:
				'scripts/app.js': /^app/
				'scripts/vendor.js': /^(bower_components|vendor)/
			order:
				before: [
					# vendor
					'bower_components/jquery/jquery.js',
					'vendor/jquery-ui-1.10.3.custom.min.js',
					'bower_components/knockout.js/knockout.js',
					'bower_components/angular/angular.js',
					# app
					'app/js/AppManager.js',
					'app/js/factories.js',
					'app/js/responsive.js'
				] 

		stylesheets:
			joinTo:
				'css/app.css': /^(app|vendor)/
			order:
				before: [
					'vendor/bootstrap.min.css'
				]
				after: []

		templates:
			joinTo: 'scripts/app.js'

			

		  

	plugins:
		autoReload:
			enabled:
				css: on
				js: on
				assets: on
		uglify:
			mangle: false
			compress:
				global_defs: 
					DEBUG: false

