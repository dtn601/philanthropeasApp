$(function(){
	//console.log('loaded')
$('.content').load('home.html');

	var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
		auth: {
			params: { scope: 'openid email' } //Details: https://auth0.com/docs/scopes
		}

	});

	$('body').on('click', '.btn-login', function(e) {
	  e.preventDefault();
	  lock.show();
	});

	 $('body').on('click', '.btn-logout', function(e) {
	   e.preventDefault();
	   logout();
	 });

	lock.on("authenticated", function(authResult) {
	    lock.getProfile(authResult.idToken, function(error, profile) {
	      if (error) {
	        // Handle error
	        return;
	      };  
	     // getUser(profile);     
	  console.log(authResult.idToken);
	  console.log(profile);
      localStorage.setItem('id_token', authResult.idToken);
      // Display user information
      show_profile_info(profile);
      validateUser();
	    });
	  });
//this is call back to backend - front
  var validateUser = function(){
      var idToken = localStorage.getItem('id_token');
      var request = $.ajax({
        url: 'http://localhost:3000/dbapi',
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + idToken
        }
    });


     // might need data{title: }

		request.done(function(res){
		console.log('page loaded: ', res);
		//$('.content').html(doner_homepage.html);
		
		if(res === 'donerhtml'){
			callPage('donor_homepage.html')
			} else if (res === 'charhtml'){
				callPage('charity_home_logged_in.html')
					} else { callPage('newaccount.html')
							}
		});

        // if(results === 'newaccount.html'){
        // 	// redirect to new account page
        // 	location.replace('/newaccount.html');
        // }
	};


  //retrieve the profile:
  var retrieve_profile = function() {
    var id_token = localStorage.getItem('id_token');
    if (id_token) {
      lock.getProfile(id_token, function (err, profile) {
        if (err) {
          return alert('There was an error getting the profile: ' + err.message);
        }
        // Display user information
        show_profile_info(profile);
      });
    }
  };

  var show_profile_info = function(profile) {
     $('.nickname').text(profile.nickname);
     $('.btn-login').hide();
     $('.avatar').attr('src', profile.picture).show();
     $('.btn-logout').show();
  };

  var logout = function() {
    localStorage.removeItem('id_token');
    window.location.href = "/";
  };

  retrieve_profile();



$('body').on('click','a',function(e){
	e.preventDefault();
	var pageRef = $(this).attr('href');
	console.log(pageRef)
	callPage(pageRef)
});

$('body').on('click','.donorLogin',function(e){
	e.preventDefault();
	console.log('clicked')
	var pageRef = 'donorlogin.html';
	console.log(pageRef)
	callPage(pageRef)
});

$('body').on('click','.charityLogin',function(e){
	e.preventDefault();
	var pageRef = 'charitylogin.html'
	console.log(pageRef)
	callPage(pageRef)
});

function getUser(profile){
	// make ajax call to express and get user info
}


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