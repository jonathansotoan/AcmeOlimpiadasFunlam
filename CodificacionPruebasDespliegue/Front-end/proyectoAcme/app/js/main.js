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

