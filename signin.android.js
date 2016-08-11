var applicationModule = require("application");
var androidApplication = applicationModule.android;
var googleApiClient;
var activity;

function init(config){

	if(!(googleApiClient == null || googleApiClient == undefined)){
		return;
	}

	activity = androidApplication.foregroundActivity || androidApplication.startActivity;

	var authCode = getCodeFromResource("google_auth_code");
	authCode = authCode == undefined ? config.authCode : authCode;

	var tokenCode = getCodeFromResource("google_request_code");
	tokenCode = tokenCode == undefined ? config.tokenCode : tokenCode;

	if(authCode == undefined && tokenCode == undefined){
		throw "Siging Failed: authCode or requestToken is required";
	}

	var googleSignInOptions = new com.google.android.gms.auth.api.signin.GoogleSignInOptions.Builder(com.google.android.gms.auth.api.signin.GoogleSignInOptions.DEFAULT_SIGN_IN)
																								.requestEmail();

	if(authCode){
		googleSignInOptions.requestServerAuthCode(authCode)
	}else if(tokenCode){
		googleSignInOptions.requestServerAuthCode(tokenCode)
	}	

	if(config.requestProfile){
		googleSignInOptions.requestProfile();
	}													

	googleSignInOptions = googleSignInOptions.build();

    googleApiClient = new com.google.android.gms.common.api.GoogleApiClient.Builder(activity)
    																	   .addApi(com.google.android.gms.auth.api.Auth.GOOGLE_SIGN_IN_API, googleSignInOptions)
    																	   .build();

}

function getCodeFromResource(name){

	var package = activity.getPackageName();
	var identifier = androidApplication.context.getResources().getIdentifier(name, "string", package);

	if(identifier == 0){
		return undefined;
	}

	return androidApplication.context.getString(identifier);
}

function singIn(config, callback){

	try{

		init(config);

	}catch(e){

		callback.onFailed(e);
		return;
		
	}
	

	var intent = com.google.android.gms.auth.api.Auth.GoogleSignInApi.getSignInIntent(googleApiClient);
	activity.startActivityForResult(intent, 1);

	activity.onActivityResult = function (requestCode, resultCode, data) {

        try{
			if(requestCode == 1){

				var result = com.google.android.gms.auth.api.Auth.GoogleSignInApi.getSignInResultFromIntent(data);

				if(result.isSuccess()){
					callback.onSuccess(result);
				}else{
					callback.onFailed(result.getStatus().getStatusCode());
				}

			}
		}catch(e){
			callback.onFailed(e);
		}

    };

}
exports.singIn = singIn;

