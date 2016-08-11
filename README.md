# nativescript-google-signin
plugin for nativescript apps using signin with google

## Prerequisites
You need to get the configuration file "google-services.json" copied to platforms/android/ directory and the prerequisites established by google [must be set](https://developers.google.com/identity/sign-in/android/start-integrating)


## Installation
- Add plugin ```tns plugin add nativescript-google-signin```

- Add to your string(platforms/android/src/main/res/values/strings.xml) yor auth or request code
  ```xml
  <string name="google_auth_code">your-auth-code</string>
  ```
  or
  ```xml
  <string name="google_request_code">your-request-code</string>
  ```

  Also you can pass this code using the config object.

- In your build.gradle (platforms/android/build.gradle):

  * add ```mavenCentral()``` and ```classpath 'com.google.gms:google-services:3.0.0'``` to buildscript block

  ```gradle
  buildscript {
      repositories {
          jcenter()
          mavenCentral()
      }

	 dependencies {
		classpath "com.android.tools.build:gradle:2.1.2"
           classpath 'com.google.gms:google-services:3.0.0'
	 }
  }
  ```

  * add ```apply plugin: 'com.google.gms.google-services'``` below ```apply plugin: "com.android.application"```

  * add the dependencie ```compile 'com.google.android.gms:play-services-auth:9.0.0'``` 

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

*authCode or requestToken must be set if you doesn't create the string variable in the xml file as explained before*

Also as second param, you need to pass callbacks function for success or failed events:

```javascript
var callbacks = {

        onSuccess: function(result){
        },

        onFailed: function(e){
        }

    };
```

- **onSuccess:** called when the signin process was successfully, the param *"result"* is a com.google.android.gms.auth.api.signin.GoogleSignInAccount object [see](https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInResult)
- **onFailed:** called when ocurr a problem during the signin process, the param *"e"* is an exeption or a message with the google error code.


invoke the singIn using the config created
```javascript
googleSignIn.singIn(config, callbacks);
```
## Notes

- At the moment the plugin only supports android version; ios will be supported in the future (maybe there´s somebody that help me with this :sweat_smile: