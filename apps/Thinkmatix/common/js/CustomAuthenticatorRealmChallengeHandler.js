/*
*  Licensed Materials - Property of IBM
*  5725-I43 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
*  US Government Users Restricted Rights - Use, duplication or
*  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/// /////////////////////
// Challenge Handler
// /////////////////////
var result;
var customAuthenticatorRealmChallengeHandler = WL.Client.createChallengeHandler("CustomAuthenticatorRealm");

customAuthenticatorRealmChallengeHandler.isCustomResponse = function(response) {
    if (!response || !response.responseJSON) {
        return false;
    }
    
    if (response.responseJSON.authStatus) 
    	return true;
    else 
    	return false;
};

customAuthenticatorRealmChallengeHandler.handleChallenge = function(response){
	var authStatus = response.responseJSON.authStatus;
	
	if (authStatus == "required"){
		$('#AppBody').hide();
		$('#AuthBody').show();
		$('#passwordInputField').val('');
        if (response.responseJSON.errorMessage){
        	busyIndicator.hide();
        	$('#loginmesg').text('*'+response.responseJSON.errorMessage);
        	
        }
	} else if (authStatus == "complete"){
		if (result[0].TEAM == 'Pem'){
			localStorage.setItem("username" ,$('#usernameInputField').val() );
			localStorage.setItem("password" ,$('#passwordInputField').val());
			localStorage.setItem("userid" ,result[0].EMP_ID);
			localStorage.setItem("userteam" ,result[0].TEAM);
			localStorage.setItem("user" ,result[0].EMP_NAME);
			$('#AppBody').show();
			$('#AuthBody').hide();
			$('#smanager').hide();
			$('#leavewfh').hide();
			$('#start').hide();
			$('#wikiupdates').hide();
			$('#shiftactualuser').hide();
			$('#shiftactualpem').show();
			busyIndicator.hide();
		}
		else {	
		
		var team=result[0].TEAM;
		if((team == 'Manager') || (team == 'PL') )
			{
			localStorage.setItem("username" ,$('#usernameInputField').val() );
			localStorage.setItem("password" ,$('#passwordInputField').val());
			localStorage.setItem("userid" ,result[0].EMP_ID);
			localStorage.setItem("userteam" ,result[0].TEAM);
			localStorage.setItem("user" ,result[0].EMP_NAME);
			$('#AppBody').show();
			$('#AuthBody').hide();
			$('#start').hide();
			$('#onshift').show();
			$('#shiftactualuser').hide();
			$('#shiftactualmanager').show();
			busyIndicator.hide();
			}
		else{
			localStorage.setItem("username" ,$('#usernameInputField').val() );
			localStorage.setItem("password" ,$('#passwordInputField').val());
			localStorage.setItem("userid" ,result[0].EMP_ID);
			localStorage.setItem("userteam" ,result[0].TEAM);
			localStorage.setItem("user" ,result[0].EMP_NAME);
			$("#teamname").val(team);
			$('#AppBody').show();
			$('#AuthBody').hide();
			useremp_id=localStorage.getItem('userid');
			busyIndicator.hide();
		}
		}
		
	}
};

customAuthenticatorRealmChallengeHandler.submitLoginFormCallback = function(response) {
    var isLoginFormResponse = customAuthenticatorRealmChallengeHandler.isCustomResponse(response);
    if (isLoginFormResponse){
    	customAuthenticatorRealmChallengeHandler.handleChallenge(response);
    } 
};
$('#passwordInputField').bind('keypress',(function(e){
    if(e.which == 13){//Enter key pressed
        $('#loginButton').click();//Trigger search button click event
    }
}));
$('#loginButton').bind('click', function () {
	busyIndicator.show();
	username=$('#usernameInputField').val();
	password=$('#passwordInputField').val();
	if((username =='') ||(password =='') )
	{
	$('#loginmesg').text('* Please enter a valid username & password');
	busyIndicator.hide();
	}
else{
	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
	username=$('#usernameInputField').val();
	password=$('#passwordInputField').val();
	var base64uid = Base64.encode(username +":"+password); 
	var def = dojo.xhrGet({

        url: 'https://lmc2.watson.ibm.com:15039/ThinkMatix/apps/services/www/Thinkmatix/desktopbrowser/default/index.html',

        headers: { "Authorization": "Basic "+ base64uid},

        load: successIMCAuth,

        error:failedIMCAuth,

        timeout: 12000

      });
}
});
function successIMCAuth(data,ioArgs){

	$('#loginmesg').text('IMC Login successful');
	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
	username=$('#usernameInputField').val();
	password=$('#passwordInputField').val();
	

	var base64uid = Base64.encode(username +":"+password); 
	WL.Client.addGlobalHeader("Authorization", "Basic " + base64uid);
	WL.Client.connect();     
	WL.Client.login("CustomAuthenticatorRealm");
	var invocationData = {
			adapter: "Validate",
			procedure: "validate",
			parameters: [username]
	};
	var options ={
			onSuccess: getSecretData_Callback,
			onFailure: getSecretData_Callback1
		  };
	WL.Client.invokeProcedure(invocationData,options );
	
	
	//busyIndicator.hide();
	   // now perform application specific authentication here     

	}

	function failedIMCAuth(data,ioArgs){
      var data1 =data;
	   console.log('failed IMC '+data1);
	   $('#loginmesg').text(data1);
	   busyIndicator.hide();
	}
//	if(connectstatus =="disconnected")	{
//		$('#loginmesg').text("Could not connect to Server.");
//	}
//	else{
//	busyIndicator.show();
//	username=$('#usernameInputField').val();
//	password=$('#passwordInputField').val();
//	if((username =='') ||(password =='') )
//		{
//		$('#loginmesg').text('* Please enter a valid username & password');
//		busyIndicator.hide();
//		}
//	else{
//		
//		var invocationData = {
//				adapter: "Validate",
//				procedure: "validate",
//				parameters: [username]
//		};
//		var options ={
//				onSuccess: getSecretData_Callback,
//				onFailure: getSecretData_Callback1
//			  };
//		WL.Client.invokeProcedure(invocationData,options );
//		
//		
//		
//	}
//        	
//	}       
	

$('#cancelButton').bind('click', function () {
	
	$('#AppBody').show();
	$('#AuthBody').hide();
	customAuthenticatorRealmChallengeHandler.submitFailure();
});

function getSecretData_Callback(response){
	var invocationResult = response.invocationResult;
	result = invocationResult.resultSet;
	var length = result.length;
	
	if(length == 0)
		{
		$('#loginmesg').text("Sorry!You Don't have permission to view this application");
		busyIndicator.hide();
		}
	else{
		var reqURL = '/my_custom_auth_request_url';
        var options = {};
        options.parameters = {
            username : $('#usernameInputField').val(),
            password : $('#passwordInputField').val()
        };
        options.headers = {};
        customAuthenticatorRealmChallengeHandler.submitLoginForm(reqURL, options, customAuthenticatorRealmChallengeHandler.submitLoginFormCallback);

	}
	
}
function getSecretData_Callback1(response){
	$('#loginmesg').text("Database error.please contact your DBA");
	busyIndicator.hide();
}
function logoutSuccess(response){
	WL.Client.reloadApp;
}