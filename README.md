# MiniTwitter
MiniTwitter Application on Angular2
A MEAN stack RESTful web application enabling users to register and login. Inside the website user can create post, add comment and like a post.
Implemented the front-end client side using Angular2 and Bootstrap for styling, back-end using NodeJS, Express and Mongoose on MongoDB.
Implement the login authentication using JsonWebToken(JWT) module in NodeJS, and created Route Guard to protect certain URL before user logging in.
Added the Interceptor Service in Angular2 for adding JWT token to every request sending from client to server.
Implemented data-binding between sibling components using Subject observable from RXJS library.
******************************************************************************
Notice:
This repository only contains source files, and I've excluded the "node_modules" folder because it's too large. To build this application on your PC, clone this repo on your PC, and follow the instructions on https://github.com/angular/angular-cli to create a new project, then copy the "node_modules" folder into this repo.