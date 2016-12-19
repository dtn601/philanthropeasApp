$(function(){

$('.content').load('home.html');

$('a').on('click',function(e){
	e.preventDefault();
	var pageRef = $(this).attr('href');

	callPage(pageRef)
});

function callPage(pageRefInput){

$.ajax({
	url: pageRefInput,
	type: 'GET',
	dataType: 'text',

	success: function(res){
		console.log('page loaded: ', res);
		$('.content').html(res);
	},

	error: function(err) {
		console.log('page not loaded: ', err)
	},

	complete: function( xhr, status) {
		console.log('completed request')
	}

});

}
});