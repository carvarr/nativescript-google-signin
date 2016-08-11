var applicationModule = require("application");
var androidApplication = applicationModule.android;
var googleApiClient;
var activity;

function init(config){

	if(!(googleApiClient == null || googleApiClient == undefined)){
		return;
	}

	if(config.authCode == undefined && config.requestToken == undefined){
		throw "Siging Failed: authCode or requestToken is required";
	}

	activity = androidApplication.foregroundActivity || androidApplication.startActivity;

	var googleSignInOptions = new com.google.android.gms.auth.api.signin.GoogleSignInOptions.Builder(com.google.android.gms.auth.api.signin.GoogleSignInOptions.DEFAULT_SIGN_IN)
																								.requestEmail();

	if(config.authCode){
		googleSignInOptions.requestServerAuthCode(config.authCode)
	}else if(config.requestToken){
		googleSignInOptions.requestServerAuthCode(config.requestToken)
	}	

	if(config.requestProfile){
		googleSignInOptions.requestProfile();
	}													

	googleSignInOptions = googleSignInOptions.build();

    googleApiClient = new com.google.android.gms.common.api.GoogleApiClient.Builder(activity)
    																	   .addApi(com.google.android.gms.auth.api.Auth.GOOGLE_SIGN_IN_API, googleSignInOptions)
    																	   .build();

}

function singIn(config, callback){

	init(config);

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

