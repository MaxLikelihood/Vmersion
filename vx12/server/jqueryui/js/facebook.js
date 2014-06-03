var facebook_login = false;

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response, stage) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    if (stage == 'onload')
    {
      console.log('onload');
    }
    testAPI();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    //document.getElementById('status').innerHTML = 'Please log ' +
      //'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    //document.getElementById('status').innerHTML = 'Please log ' +
      //'into Facebook.';
      console.log("You're not logged into facebook");
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    stage = 'onclick'
    statusChangeCallback(response, stage);
  });
}

function loginWithFacebook()
{
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected')
    {
      //app authorized and logged into facebook
      $('#system-default-login-btn').slideUp(1000);
      document.getElementById('system-fb-login-btn').value = 'Connected';
      setTimeout(function(){$('.login').fadeOut(2000);}, 2000);
      console.log('connected');
      facebook_login = true;
      loadInterface();
    } 
    else 
    {
      //app not authorized or not logged into facebook
      //login on popup window
      FB.login(function(response) {
        if (response.status === 'connected')
        {
          $('#system-default-login-btn').slideUp(1000);
          document.getElementById('system-fb-login-btn').value = 'Connected';
          setTimeout(function(){$('.login').fadeOut(2000);}, 2000);
          console.log('connected');
          facebook_login = true;
          loadInterface();
        }
        else if (response.status === 'not_authorized')
        {
          document.getElementById('system-fb-login-btn').value = 'Unsuccessful';
          setTimeout(function(){document.getElementById('system-fb-login-btn').value = 'Connect Again';}, 1500);
          console.log('not_authorized');
        }
        else
        {
          document.getElementById('system-fb-login-btn').value = 'Unsuccessful';
          setTimeout(function(){document.getElementById('system-fb-login-btn').value = 'Connect Again';}, 1500);
          console.log('not logged in to facebook');
        }
      });
    }
  });
}


// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    //document.getElementById('status').innerHTML =
      //'Thanks for logging in, ' + response.name + '!';
  });
}