# nativescript-google-signin
plugin for nativescript apps using signin with google

## Prerequisites
You need to get the configuration file "google-services.json" copied to platforms/android/ directory. Also the prerequisites established by google must be set (https://developers.google.com/identity/sign-in/android/start-integrating)


## Installation
tns plugin add nativescript-google-signin

Add to your string(platforms/android/src/main/res/values/strings.xml) yor auth or request code
```xml
<string name="google_auth_code">your-auth-code</string>
```
or
```xml
<string name="google_request_code">your-request-code</string>
```

Also you can pass this code using the config object.

## Usage
```javascript
var googleSignIn = require("nativescript-google-signin");
```

create a config object
```javascript
var config = {
        authCode: "your-auth-code",
        requestProfile: true
};
```

- **authCode:** code for request server authorization
- **requestToken:** code for request the access token (is required if authCode is skiped)
- **requestProfile:** set as true if you want the profile information (if is skiped, only email info is requested)

Also as second param you need to pass callbacks function for success or failed events:

```javascript
var callbacks = {

        onSuccess: function(result){
        },

        onFailed: function(e){
        }

    };
```

- **onSuccess:** called when the signin process was successfully, the param result is an com.google.android.gms.auth.api.signin.GoogleSignInAccount object (https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInResult)
- **onFailed:** called when ocurr a problem during the signin process, the param e is an exeption or a message with the google error code.


invoke the singIn using the config created
```javascript
googleSignIn.singIn(config, callbacks);
```
