$(function(){
console.log('loaded')
$('.content').load('home.html');

$('body').on('click','a',function(e){
	e.preventDefault();
	var pageRef = $(this).attr('href');
	console.log(pageRef)
	callPage(pageRef)
});

$('body').on('click','.donerLogin',function(e){
	e.preventDefault();
	var pageRef = 'donerlogin.html';
	console.log(pageRef)
	callPage(pageRef)
});

$('body').on('click','.charityLogin',function(e){
	e.preventDefault();
	var pageRef = 'charitylogin.html'
	console.log(pageRef)
	callPage(pageRef)
});




function callPage(pageRefInput){

$.ajax({
	url: pageRefInput,
	type: 'GET',
	dataType: 'html',

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