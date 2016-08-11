var Observable = require("data/observable").Observable;
var googleSignIn = require("nativescript-google-signin");

function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    var viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);

    viewModel.onTap = function() {
        
	    var config = {
		      authCode: "Your-auth-key-here",
		      requestProfile: true
	    };

	    var callbacks = {
	    	onSuccess: function(result){
	            console.log('signIn ok');

	            var account = result.getSignInAccount();
	            viewModel.set("username", "user: " + account.getDisplayName());
	            viewModel.set("email", "email: " + account.getEmail());
	            viewModel.set("authcode", "authcode: " + account.getServerAuthCode());
	        },

	        onFailed: function(e){
	            console.log('signIn failed');
	            console.log(e);
	        }
	    }

	    googleSignIn.singIn(config, callbacks);

    }

    return viewModel;
}

exports.createViewModel = createViewModel;