sudo keytool -genkey -v -keystore foodchemedu-app.keystore -alias arfoodchemedu -keyalg RSA -keysize 2048 -validity 10000

Password: arJuly72021!:~

What is your first and last name?
[Unknown]: Ariver  
What is the name of your organizational unit?
[Unknown]: FoodChemEdu
What is the name of your organization?
[Unknown]: Ariver
What is the name of your City or Locality?
[Unknown]: Manila
What is the name of your State or Province?
[Unknown]: Metro Manila
What is the two-letter country code for this unit?
[Unknown]: PH

sudo ionic cordova platform rm android &&
sudo ionic cordova platform add android@9.0.0

sudo ionic cordova build android --prod --release;

sudo -S jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore foodchemedu-app.keystore "platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk" arfoodchemedu

sudo zipalign -v 4 "platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk" foodchemedu@v1.0.0.apk
