# Node.js Serverless OAuth on static pages

Proof-of-concept code to pull user profile from OAuth provider using passport.js without maintaining a session on 
server side.

OAuth token is encrypted and stored on client side (cookie or Local Storage)

## How to run

`node service/keygen`

`docker-compose up`

Login: [127.0.1.1](http://127.0.1.1/index.html)