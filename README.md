## Backend for Parrot Party

This is the server side for my makers final team project with [@louballantyne](https://github.com/louballantyne), [@cspoppuppy](https://github.com/cspoppuppy) and completed over a 2 week period. 

---- 

To **run the app** please go to the client side repo [here](https://github.com/fg24davies/party-parrots-client) and follow the README.

---- 

### API

- Built in Node.js with Express with MongoDB
- The API is hosted on Heroku at [https://parrot-party-api.herokuapp.com]
- To make an API request, append the endpoint from the routes below to the link above.

| Endpoint        | Functionality            | Deployed         |
| ----------------| -------------------------|------------------|
| User Controller |
| POST /api/users     | Create new user          |:heavy_check_mark:|
| GET /api/users      | Returns all users        |:heavy_check_mark:|
| Sessions Controller |
| POST /api/sessions    | Create new session       |:heavy_check_mark:|
| DELETE /api/sessions/:sessionId  | Destroys the session     |:heavy_check_mark:|
| Upload Controller |
| POST /api/uploads    | Uploads photo         |:heavy_check_mark:|
| GET /api/uploads     | Returns photo       |:heavy_check_mark:|
| Parrot Controller |
| POST /api/parrots    | Create a new parrot listing         |:heavy_check_mark:|
| GET /api/parrots      | Return parrots         |:heavy_check_mark:|
| GET /api/parrot/:parrotId  | Return the parrot of :id   |:heavy_check_mark:|
| PATCH /api/parrots/:parrotId| Update parrot geocode  |:heavy_check_mark:|
| Appplication Controller |
| POST /api/parrot/:parrotID/applications/    | Create a new adoption application         |:heavy_check_mark:|
| GET /api/parrot/:parrotID/applications/      | Return adoption applications       |:heavy_check_mark:|
| GET /api/parrot/:parrotID/applications/:applicationId  | Return the application with :id   |:heavy_check_mark:|
| PATCH /api/parrot/:parrotID/applications/:applicationId| Update application as approved  |:heavy_check_mark:|

Libraries used include:

-   aws-sdk
-   multer
-   multer-s3
-   uuid
-   mongoose for MongoDB

External APIs:

- [MapQuest](https://developer.mapquest.com/)


