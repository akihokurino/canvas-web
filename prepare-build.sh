export $(cat .env)
envsubst < public/firebase-messaging-sw.template.js > public/firebase-messaging-sw.js